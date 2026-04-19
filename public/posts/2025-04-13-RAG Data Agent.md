---
layout: distill
title: Unlocking Economics, How AI democratize data access
description: Ever felt lost in a sea of economic data, desperately searching for that one crucial indicator? The world of finance can be overwhelming, with countless metrics and complex datasets often locked away or difficult to navigate. But what if accessing and understanding this information became as simple as having a conversation?
tags: Economy Data RAG AI LLMs
giscus_comments: true
date: 2025-04-13
featured: true

authors:
  - name: Diego Rodriguez
    url:
    affiliations:
      name: Duke University

bibliography: false

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Context
    subsections:
      - name: The Power of AI in reducing information gaps
      - name: Why data description are a good use case of embeddings and LLMs
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Walkthrough
    subsections:
      - name: From CSV to Vector Database
      - name: Then, is all about the workflow
  - name: Demo

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

## Context:

### The Power of AI in Reducing Information Gaps

Imagine trying to analyze economic trends. You might know what you're looking for, but navigating vast databases can be time-consuming and frustrating. Sources like the Central Bank of Chile contain over 20,000 economic records. This wealth of information, while incredibly valuable, is often inaccessible to the average user who lacks the specific knowledge required to query and retrieve the data. EcoDataBot steps in as a powerful helper, bridging this gap and making extensive data readily available.

### Why Are Data Descriptions a Good Use Case for Embeddings and LLMs?

The unique structure of the data available from the Central Bank of Chile portal makes it an ideal candidate for embedding techniques. The code descriptions can be very similar to one another, with only small changes in wording that differentiate one indicator from the next. The contextual richness of each description enables Gemini to distinguish between variable transformations and variable names, allowing the model to guide the user toward the correct answer through an iterative process. In this case, the descriptions are available in both English and Spanish.

Here’s how the data looks for the total monthly indicator of economic activity (and this is without counting the 8 other subcategories for each indicator that would appear if we ran an SQL query for "monthly indicator of economic activity"):

| Name                                                                                                                                                       | Nombre                                                                                                                                                                  | CODE                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| National Accounts, Monthly indicator of economic activity, Imacec, chained volume at previous prices, spliced time series (2018 index=100)#G, Imacec       | Cuentas Nacionales, Indicador mensual de actividad económica, Imacec, volumen a precios del año anterior encadenado, series empalmadas (promedio 2018=100), Imacec      | F032.IMC.IND.Z.Z.EP18.Z.Z.0.M |
| National Accounts, Monthly indicator of economic activity, Imacec, contribution compared with the same period of the previous year, reference 2018, Imacec | Cuentas Nacionales, Indicador mensual de actividad económica, Imacec, contribución porcentual respecto de igual periodo del año anterior, referencia 2018, Imacec       | F032.IMC.V12.Z.Z.2018.Z.Z.0.M |
| National Accounts, Monthly indicator of economic activity, Imacec, contribution to monthly growth, seasonally adjusted, reference 2018, Imacec             | Cuentas Nacionales, Indicador mensual de actividad económica, Imacec, contribución porcentual respecto al periodo anterior, desestacionalizado, referencia 2018, Imacec | F032.IMC.VAR.Z.Z.2018.Z.Z.3.M |

As you can see by closely examining the data, dividing it into standardized metadata is not a viable option. The information is not structured consistently—some series may or may not include details like unit, frequency, or category. This is where the magic of semantic search comes in! Instead of just matching keywords, semantic search understands the meaning behind your query. It does this by converting both your query and the data (like the 20,000+ economic records in EcoDataBot’s dataset) into numerical representations called embeddings. These embeddings capture the underlying semantic relationships, so that concepts with similar meanings are positioned close to one another in a vector space.

LLMs are particularly effective when using vector datasets to enhance their answer capabilities. To do this meaningfully, they require an ecosystem that provides the right tools in the right context. This is where LangGraph and LangChain shine—guiding Gemini 2.0 in the right direction. The process ensures that the model asks the user for their requirements, retrieves information from the vector dataset, and only consults the API once it has sufficient confirmation. The diagram below summarizes the functionalities:

<div style="width: 90%; margin: 0 auto; text-align: center;">
  {% include figure.liquid loading="eager" path="assets/img/rag_diagram.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

---

## Walkthrough

### From CSV to Vector Database

To pass the CSV data into a vector database, first I load the `catalogo.csv` file using the pandas library and removes any duplicate entries based on the `CODE` column. It then creates a combined text field called search_text using the 'Name' and 'Nombre' columns from the CSV, which contains descriptions of the economic series in both English and Spanish.

```python
# Load your CSV
df = pd.read_csv("/kaggle/input/bcch-catalogue/catalogo.csv")
df = df.drop_duplicates(subset=["CODE"], keep="first")

# Handle missing values before creating search_text
df["Name"] = df["Name"].fillna("")
df["Nombre"] = df["Nombre"].fillna("")
df["CODE"] = df["CODE"].fillna("")

# Create combined text with fallback
df["search_text"] = df["Name"] + " " + df["Nombre"]

# Remove any remaining empty strings/NULLs
df["search_text"] = df["search_text"].fillna("").replace("^\\s+$", "", regex=True)

# Create combined text for semantic search
df["search_text"] = df["Name"] + " " + df["Nombre"]

# Create metadata storage
metadata = df[["CODE", "Name", "Nombre"]].to_dict("records")
```

Next, it initializes a Chroma vector database client. The agent uses the `text-embedding-004` model from the Google GenAI class as its embedding function to convert the search_text into numerical vector embeddings.

```python
# Define a helper to retry when per-minute quota is reached.
is_retriable = lambda e: (isinstance(e, genai.errors.APIError) and e.code in {429, 503})

#GeminiEmbedding Used during the Kaggle Google GenAI Course
class GeminiEmbeddingFunction(EmbeddingFunction):
    # Specify whether to generate embeddings for documents, or queries
    document_mode = True

    @retry.Retry(predicate=is_retriable)
    def __call__(self, input: Documents) -> Embeddings:
        if self.document_mode:
            embedding_task = "retrieval_document"
        else:
            embedding_task = "retrieval_query"

        response = client.models.embed_content(
            model="models/text-embedding-004",
            contents=input,
            config=types.EmbedContentConfig(
                task_type=embedding_task,
            ),
        )
        return [e.values for e in response.embeddings]

#Initialize ChromaDB
chroma_client = Client()
embed_fn = GeminiEmbeddingFunction()
embed_fn.document_mode = True

db = chroma_client.get_or_create_collection(
    name="bcch_indicators",
    embedding_function=embed_fn
)
```

Finally, it adds these embeddings, along with the corresponding `CODE` as unique identifiers and the 'CODE', 'Name', and 'Nombre' columns as metadata, into the Chroma vector database in batches for efficient processing.

The final output of this process is a populated Chroma vector database containing vector embeddings of the economic series descriptions and their associated metadata, enabling semantic search capabilities.

### Then, is all about the workflow

Now that we have the main search capability to enrich the filtering capacity of the LLM is moment to add the workflow using Langraphs and Langchain.

First, defining the tools that are then integrated into a langgraph framework using distinct nodes that define the agent's workflow:

- `chroma_search_series` tool leverages Gemini's semantic capabilities to query a Chroma vector database containing embeddings of economic series descriptions, taking a text query as input and returning the most relevant series codes and descriptions

```python
def chroma_search_series(
    query: str,
    n_results: Annotated[int, "Number of results to return"] = 15
) -> List[Dict]:
    """Search economic series using semantic similarity."""
    embed_fn.document_mode = False  # Query mode

    results = db.query(
        query_texts=[query],
        n_results=n_results,
    )

    # Extract and format metadata
    return [
        {
            "code": metadata["CODE"],
            "name": metadata["Name"],
            "nombre": metadata["Nombre"]
        }
        for metadata in results["metadatas"][0]
    ]
```

- `get_series` tool is responsible for retrieving actual time series data from the Central Bank of Chile's Economic Portal API based on parameters extracted from tool calls

```python
def get_series(json_input: Union[str, Dict]) -> str:
    """
    Processes input JSON/dict from the LLM and retrieves data from the BCCh.

    Args:
        json_input (str/dict): Input JSON/dict. Example:
            {
                "series": ["F032.IMC.IND.Z.Z.2008.03.Z.0.M", "F032.IMC.IND.Z.Z.EP18.N03.Z.0.M"],
                "nombres": ["imacec minero", "imacec no-minero"],
                "desde": "2014-01-01",
                "hasta": "2024-01-01"
            }

    Returns:
        str: Data returned as a formatted JSON string, including intuitive names for each series.
    """

    # Sanitize input (replace curly quotes, etc.)
    if isinstance(json_input, str):
        try:
            sanitized = json_input.replace("“", '"').replace("”", '"').encode('ascii', 'ignore').decode()
            params = json.loads(sanitized)
        except json.JSONDecodeError as e:
            raise ValueError("Input should be a JSON string or a dictionary, not a list. Please remove extra commentary.")
    else:
        params = json_input

    # If 'json_input' key exists, use its value
    if "json_input" in params:
        params = params["json_input"]

    # Normalize keys to lower-case
    params_lower = {k.lower(): v for k, v in params.items()}

    # Validate required keys
    required_keys = ["series", "desde"]
    missing = [k for k in required_keys if k not in params_lower]
    if missing:
        raise ValueError(f"Parámetros faltantes: {missing}")

    # Ensure 'series' is a list
    if not isinstance(params_lower["series"], list):
        raise ValueError("'series' debe ser una lista.")

    # Format dates (forcing YYYY-MM-DD)
    date_format = "%Y-%m-%d"
    try:
        desde = pd.to_datetime(params_lower["desde"]).strftime(date_format)
        hasta = pd.to_datetime(params_lower.get("hasta", "today")).strftime(date_format)
    except Exception as e:
        raise ValueError("Formato de fecha inválido. Use YYYY-MM-DD.") from e

    # Retrieve data in chunks (max 2 series per API call)
    chunk_size = 2
    all_data = pd.DataFrame()

    for i in range(0, len(params_lower["series"]), chunk_size):
        chunk = params_lower["series"][i:i+chunk_size]
        try:
            data = siete.cuadro(
                series=chunk,
                desde=desde,
                hasta=hasta
            )
            all_data = pd.concat([all_data, data], axis=1)
        except Exception as e:
            raise ValueError(f"Error BCCH en series {chunk}: {str(e)}")

    # Convert all data to numeric values
    all_data = all_data.apply(pd.to_numeric, errors="coerce")
    result = all_data.to_dict(orient="list")

    # Retrieve the intuitive names; if none are provided, default to empty strings
    nombres = params_lower.get("nombres", [""] * len(params_lower["series"]))

    # Build a list of objects where each object contains the code, the intuitive name, and the values
    series_codes = list(result.keys())
    data_list = []
    for i, code in enumerate(series_codes):
        # Use the corresponding intuitive name if available; otherwise, fall back to the code itself
        name = nombres[i] if i < len(nombres) and nombres[i] else code
        data_list.append({
            "code": code,
            "name": name,
            "values": result[code]
        })

    # Convert the final result to a JSON string with indentation
    json_result = json.dumps({"data": data_list}, indent=2, ensure_ascii=False)
    return json_result
```

Second, defining the nodes of interactions within the model

- The `human_node` manages user interaction by displaying the last bot message and prompting for new input, or showing a welcome message initially.
- The `chatbot_node` takes the conversation history and system instructions to invoke the Gemini 2.0 model to generate the assistant's response.
- The `search_tool_node` is activated when a search tool call is made, using `chroma_search_series` to find relevant economic series and format the results.
- The `data_tool_node` is triggered for data retrieval tool calls, using `get_series` to fetch data and optionally plot it.
- The `route_decision` node acts as the workflow's control, determining the next node to activate based on the current conversation state, including checking for the end of the conversation or the type of the last message and its tool calls.

The entire workflow is orchestrated by creating a `StateGraph` in LangGraph and defining conditional edges based on the `route_decision` function, with the Gemini 2.0 model integrated using ChatGoogleGenerativeAI and the defined tools bound to it. The following code resume the zero-prompting technique used on this bot:

```python
# Define state management using of the Economic Bot
class AnalysisState(TypedDict):
    """State representing financial data analysis conversation."""
    messages: Annotated[List[Dict], add_messages]
    current_series: List[str]
    raw_data: Dict
    finished: bool

FINANCIAL_SYSINT = SystemMessage(
    content=(
        "You are EconomicDataBot, an interactive system for accessing and analyzing data from the Central Bank of Chile. "
        "Your capabilities include:\n"
        "1. Searching for relevant economic series using 'search_series'.\n"
        "2. Retrieving time series data with 'get_series'.\n"
        "3. Clarifying and confirming user requests with follow-up questions.\n"
        "4. Validating series IDs and date parameters to ensure they match the official nomenclature.\n"
        "5. Presenting results in clear, structured formats (tables, lists, or JSON as needed).\n\n"
        "6. Once you have the data return a summary of the information of the data retrieved"
        "Always confirm that the series IDs match the official nomenclature and verify the date ranges before fetching data. "
        "Maintain a professional, clear, and approachable tone in your responses. "
        "If the input is ambiguous or incomplete, ask the user for clarification. "
        "Your goal is to help users access the most relevant economic data accurately and efficiently."
    )
)

# Updated welcome message for initiating conversation
WELCOME_MSG = (
    "I am EconomicDataBot, here to help you search, validate, and retrieve economic data. "
    "How can I assist you today? "
    "For example, you can ask for a specific time series or provide criteria to search for the data you need."
)
```

---

## Application at work

Now the EcoDataBot application is ready for action! Give it a try at this [Kaggle Notebook](https://www.kaggle.com/code/dirodrigue/rag-ecodatabot) or if you prefer to watch a live demo check out this Youtube [video](https://youtu.be/SGp0rEnYl2M). From the minute [10:34](https://youtu.be/SGp0rEnYl2M?si=7OqINGhIfVSAb-D9&t=634) when I start using the app.
