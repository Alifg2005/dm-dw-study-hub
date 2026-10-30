import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta: {
    number: 3,
    slug: 'chapter-03',
    title: 'Data Warehousing and Analytical Processing',
    description:
      'Warehouse properties and architecture, data lakes and lakehouses, cubes and schemas, cube measures, OLAP operations, bitmap indexes, and column storage.',
    examScope: 'midterm',
  },

  overview: [
    'Operational databases run the daily business. Decision makers need something else: consolidated, historical data organized around business subjects. A **data warehouse** provides this, separately from operational systems.',
    'This chapter explains what a warehouse is, how it is built and how it relates to data lakes and newer architectures. It then covers how warehouses are modeled with cubes and schemas, how OLAP explores them, and how bitmap indexes and column storage make those queries fast.',
  ],

  objectives: [
    'Define a data warehouse and explain its four properties in Inmon\'s definition.',
    'Compare OLTP and OLAP, and justify a separate warehouse.',
    'Describe the multi-tier architecture, metadata repository, and ETL.',
    'Distinguish enterprise warehouses, data marts, and virtual warehouses.',
    'Explain data lakes and their challenges, and compare warehouses, lakes, and lakehouses.',
    'Describe data fabric, data virtualization, and data mesh.',
    'Explain data cubes, cuboids, and star, snowflake, and fact constellation schemas.',
    'Classify measures as distributive, algebraic, or holistic.',
    'Apply roll-up, drill-down, slice, dice, and pivot.',
    'Use bitmap indexes and explain the benefit of vertical storage for OLAP.',
  ],

  keyConcepts: [
    { term: 'Decision support', summary: 'A warehouse serves analysis by knowledge workers rather than daily transactions.' },
    { term: 'Subject, integrated, time-variant, nonvolatile', summary: 'The four properties in Inmon\'s definition, and a common exam question.' },
    { term: 'Multidimensional model', summary: 'Data is viewed as a cube of dimensions and measures.' },
    { term: 'Lattice of cuboids', summary: 'A cube is a set of cuboids at every level of summarization, from the base to the apex.' },
    { term: 'Raw versus governed', summary: 'Lakes keep raw data at scale, warehouses keep governed data, and lakehouses combine the two.' },
    { term: 'Read-optimized storage', summary: 'Bitmap indexes and vertical storage reduce the data scanned by analytical queries.' },
  ],

  definitions: [
    { term: 'Data warehouse (Inmon)', definition: 'A subject-oriented, integrated, time-variant, and nonvolatile collection of data in support of management\'s decision-making process.' },
    { term: 'Data warehousing', definition: 'The process of constructing and using data warehouses.' },
    { term: 'Metadata', definition: 'Data that defines warehouse objects, including structure, operational information, summarization algorithms, mappings, performance data, and business data.' },
    { term: 'Data mart', definition: 'A subset of corporate-wide data valuable to a specific group of users, such as a marketing data mart.' },
    { term: 'Virtual warehouse', definition: 'A set of views over operational databases, where only some summary views may be materialized.' },
    { term: 'Data lake', definition: 'A centralized repository storing all structured and unstructured data at any scale, as is, without first structuring it.' },
    { term: 'Data lakehouse', definition: 'An open architecture combining the flexibility, cost-efficiency, and scale of lakes with the data management and ACID transactions of warehouses.' },
    { term: 'Data fabric', definition: 'An architecture for end-to-end integration of data pipelines and cloud environments through intelligent, automated systems, with a single point of access to all data.' },
    { term: 'Data virtualization', definition: 'Connecting to data sources and integrating only the required metadata into a virtual layer, instead of physically moving the data with ETL.' },
    { term: 'Data mesh', definition: 'An architecture pattern with multiple domain-specific systems, bringing data closer to its consumers.' },
    { term: 'Data cube', definition: 'A multidimensional model allowing data to be viewed in multiple dimensions. Formally, a lattice of cuboids.' },
    { term: 'Base cuboid', definition: 'The n-D cuboid at the lowest level of summarization.' },
    { term: 'Apex cuboid', definition: 'The topmost 0-D cuboid, holding the highest level of summarization.' },
    { term: 'Fact table', definition: 'Contains measures, such as dollars_sold, and keys to each related dimension table.' },
    { term: 'Concept hierarchy', definition: 'An organization of attribute values from detailed, low-level concepts to general, high-level concepts.' },
    { term: 'OLAP', definition: 'Techniques that answer multi-dimensional analytical queries efficiently.' },
  ],

  sections: [
    {
      id: 'warehouse-properties',
      title: 'What makes a data warehouse',
      blocks: [
        {
          type: 'paragraph',
          text: 'Definitions vary, but a warehouse is generally a decision support database maintained **separately** from the operational database, providing a solid platform of consolidated, historical data. Barry Devlin describes it as a single, complete, and consistent store, made available in a way users can understand and use in a business context.',
        },
        {
          type: 'table',
          table: {
            caption: 'The four properties',
            headers: ['Property', 'What it means', 'Detail'],
            rows: [
              ['**Subject-oriented**', 'Organized around major subjects, such as customer, product, or sales', 'Excludes data not useful for decision support, giving a simple, concise view'],
              ['**Integrated**', 'Built from multiple heterogeneous sources', 'Cleaning and integration ensure consistent naming, encoding, and measures. Hotel prices can differ on currency, tax, breakfast, and parking.'],
              ['**Time-variant**', 'A much longer time horizon than operational systems, such as the past 5 to 10 years', 'Every key structure contains an element of time, explicitly or implicitly'],
              ['**Nonvolatile**', 'A physically separate store. Operational updates do not occur.', 'No transaction processing, recovery, or concurrency control needed. Only initial loading and access.'],
            ],
          },
        },
        {
          type: 'list',
          title: 'Why keep a warehouse separate?',
          items: [
            '**High performance for both systems:** the DBMS is tuned for OLTP (access methods, indexing, concurrency, recovery). The warehouse is tuned for OLAP (complex queries, multidimensional views, consolidation).',
            '**Missing data:** decision support needs historical data that operational databases do not typically keep.',
            '**Data consolidation:** decision support needs aggregation and summarization across heterogeneous sources.',
            '**Data quality:** sources use inconsistent representations, codes, and formats that have to be reconciled.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The source also notes that more and more systems now perform OLAP analysis directly on relational databases.',
        },
      ],
    },
    {
      id: 'architecture',
      title: 'Architecture, metadata, and ETL',
      blocks: [
        {
          type: 'flow',
          steps: [
            { label: 'Data', detail: 'Operational databases and external sources' },
            { label: 'Bottom tier', detail: 'Data warehouse server, data marts, metadata repository, monitoring, administration' },
            { label: 'Middle tier', detail: 'OLAP server' },
            { label: 'Top tier', detail: 'Front-end tools for query and reports, analysis, and data mining' },
          ],
        },
        {
          type: 'list',
          title: 'ETL functions',
          items: [
            '**Data extraction:** get data from multiple, heterogeneous, external sources.',
            '**Data cleaning:** detect errors and rectify them when possible.',
            '**Data transformation:** convert from legacy or host format to warehouse format.',
            '**Load:** sort, summarize, consolidate, compute views, check integrity, and build indices and partitions.',
            '**Refresh:** propagate updates from the sources to the warehouse.',
          ],
        },
        {
          type: 'list',
          title: 'What the metadata repository stores',
          items: [
            '**Warehouse structure:** schema, views, dimensions, hierarchies, derived data, and data mart locations and contents.',
            '**Operational metadata:** data lineage, currency of data (active, archived, or purged), and monitoring information.',
            'The **algorithms** used for summarization.',
            'The **mapping** from the operational environment to the warehouse.',
            'Data related to **system performance**.',
            '**Business data:** business terms, ownership, and charging policies.',
          ],
        },
        {
          type: 'table',
          table: {
            caption: 'Three warehouse models',
            headers: ['Model', 'Scope', 'Note'],
            rows: [
              ['**Enterprise warehouse**', 'All subjects across the entire organization', 'Organization-wide collection'],
              ['**Data mart**', 'A specific group of users, such as marketing', 'Independent, or dependent (fed directly from the warehouse)'],
              ['**Virtual warehouse**', 'Views over operational databases', 'Only some summary views may be materialized'],
            ],
          },
        },
      ],
    },
    {
      id: 'data-lakes',
      title: 'Data lakes',
      blocks: [
        {
          type: 'paragraph',
          text: 'A data lake stores data **as is** and runs different analytics on it, from dashboards to big data processing, real-time analytics, and machine learning. A conceptual architecture connects sources such as databases, documents, Web crawling, social media, images, and external data through connectors, with a search engine, data models, business rules, APIs, and reporting on top.',
        },
        {
          type: 'flow',
          steps: [
            { label: 'Raw data layer', detail: 'Loading raw data' },
            { label: 'Standardized layer', detail: 'Efficient transfer and cleansing' },
            { label: 'Cleansed layer', detail: 'Cleansing and transforming' },
            { label: 'Application layer', detail: 'Implementing business logic' },
            { label: 'Sandbox layer', detail: 'Enrichment by data scientists and analysts' },
          ],
        },
        {
          type: 'list',
          title: 'Challenges',
          items: [
            '**Scale and queries:** hundreds of thousands of data sets, with queries such as keyword search, finding joinable data sets, and finding features. The core task of building lakes is metadata management.',
            '**Cleaning:** the most cited task. Over 85% consider dirty data a major or critical business issue.',
            '**Evolution:** many duplicates, with data sets updated, altered, derived, and disappearing or reappearing. Versioning helps with storage cost, collaboration, auditing, and reproducibility.',
            '**Diversity:** highly heterogeneous formats, handled through ingestion, extraction, and integration (joining or union-ing tables).',
          ],
        },
        {
          type: 'list',
          title: 'Common tasks in building data lakes',
          items: ['Ingestion', 'Extraction (type inference)', 'Metadata management', 'Cleaning', 'Integration', 'Discovery', 'Versioning'],
        },
        {
          type: 'list',
          title: 'Ideas for metadata management',
          items: [
            'Enrich data and metadata with semantic information, and support template-based queries.',
            'Extract deeply embedded and contextual metadata for topic-based discovery.',
            'Integrate metadata about data, users, and queries, and support visual analytics.',
          ],
        },
      ],
    },
    {
      id: 'lakehouse-architectures',
      title: 'Lakehouses and modern data architectures',
      blocks: [
        {
          type: 'paragraph',
          text: 'The source separates two ecosystems. **Analytic use cases** use warehouses, structured data, and SQL or Python. **Operational use cases** use lakes, raw data, and Java, Scala, Python, R, and SQL. These may converge, and the lakehouse is the result.',
        },
        {
          type: 'list',
          title: 'Lakehouse features',
          items: [
            'Transaction support',
            'Schema enforcement and governance',
            'BI support',
            'Decoupling between storage and compute',
            'Open storage formats',
            'Support for diverse data types, from unstructured to structured',
            'Support for diverse workloads: data science, machine learning, SQL, and analytics',
            'End-to-end streaming for real-time reports',
          ],
        },
        {
          type: 'table',
          table: {
            caption: 'Related architectures',
            headers: ['Architecture', 'Main idea'],
            rows: [
              ['**Data fabric**', 'A unified architecture with a single point of access, hiding underlying complexity across sources, formats, and locations'],
              ['**Data virtualization**', 'One technology enabling a fabric: a virtual layer using metadata rather than moving data with ETL'],
              ['**Data mesh**', 'Multiple domain-specific systems that bring data closer to consumers'],
            ],
          },
        },
      ],
    },
    {
      id: 'cubes-schemas',
      title: 'Data cubes and schemas',
      blocks: [
        {
          type: 'paragraph',
          text: 'A warehouse uses a multidimensional model. **Dimension tables** describe perspectives, such as item (item_name, brand, type) or time (day, week, month, quarter, year). A **fact table** contains measures and foreign keys to the dimensions.',
        },
        {
          type: 'table',
          table: {
            caption: 'Lattice for time, item, location, and supplier',
            headers: ['Level', 'Cuboids'],
            rows: [
              ['0-D (apex)', 'all'],
              ['1-D', 'time; item; location; supplier'],
              ['2-D', 'time,item; time,location; time,supplier; item,location; item,supplier; location,supplier'],
              ['3-D', 'time,item,location; time,item,supplier; time,location,supplier; item,location,supplier'],
              ['4-D (base)', 'time,item,location,supplier'],
            ],
          },
        },
        {
          type: 'list',
          title: 'Three conceptual schemas',
          items: [
            '**Star:** a fact table in the middle connected to a set of dimension tables.',
            '**Snowflake:** a refinement of star in which some dimensional hierarchies are normalized into smaller tables.',
            '**Fact constellation (galaxy):** multiple fact tables share dimension tables, viewed as a collection of stars.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Example schemas from the source',
          text: 'The star example has a Sales fact table (`time_key`, `item_key`, `branch_key`, `location_key`, `units_sold`, `dollars_sold`, `avg_sales`). The snowflake normalizes supplier out of item and city out of location. The constellation adds a Shipping fact table sharing time, item, and location.',
        },
        {
          type: 'paragraph',
          text: '**Concept hierarchies** replace low-level values with higher-level concepts, for example age values with youth, adult, and senior. They are defined manually by experts or generated automatically from data, and they enable roll-up and drill-down. A location hierarchy runs: office → city → country → region → all.',
        },
      ],
    },
    {
      id: 'measures',
      title: 'Cube measures',
      blocks: [
        {
          type: 'table',
          table: {
            headers: ['Category', 'Rule', 'Examples'],
            rows: [
              ['**Distributive**', 'Applying the function to n aggregate values gives the same result as applying it to all the data', 'count(), sum(), min(), max()'],
              ['**Algebraic**', 'Computed by an algebraic function with M (bounded) arguments, each from a distributive aggregate', 'avg(x) = sum(x) / count(x)'],
              ['**Holistic**', 'No constant bound on the storage needed to describe a sub-aggregate', 'median(), mode(), rank()'],
            ],
          },
        },
        {
          type: 'callout',
          tone: 'supplement',
          title: 'The questions the slide leaves open',
          text: 'The slide asks whether min_N() and standard_deviation() are algebraic. Both are generally treated as algebraic: min_N needs only a bounded N values per partition, and standard deviation can be computed from count, sum, and the sum of squares. Confirm with your instructor, as the slide gives no answer.',
        },
      ],
    },
    {
      id: 'olap-operations',
      title: 'OLAP operations',
      blocks: [
        {
          type: 'paragraph',
          text: 'Aggregates and group-bys are central to analysis. In the TPC benchmarks cited by the source, 6 standard benchmarks have 83 queries, with aggregates used 59 times and group-bys used 20 times.',
        },
        {
          type: 'table',
          table: {
            headers: ['Operation', 'What it does', 'Example'],
            rows: [
              ['**Roll-up** (drill-up)', 'Summarizes by climbing a hierarchy or reducing dimensions', 'Cities to countries'],
              ['**Drill-down** (roll-down)', 'Reverse of roll-up: moves to more detail or adds dimensions', 'Quarters to months'],
              ['**Slice**', 'Selects on one dimension', 'time = "Q1"'],
              ['**Dice**', 'Picks specific values or ranges on several dimensions', 'location in (Toronto, Vancouver), time in (Q1, Q2), and two item types'],
              ['**Pivot** (rotate)', 'Changes the order of dimensions in visual analysis', 'Swap item and location axes'],
            ],
          },
        },
      ],
    },
    {
      id: 'indexing-storage',
      title: 'Bitmap indexes and column storage',
      blocks: [
        {
          type: 'paragraph',
          text: 'To count successful trials in a table, you could scan the table, or build a B+ tree on `succeed`, but both may still access many records. A **bitmap index** can answer such aggregate queries much more efficiently.',
        },
        {
          type: 'list',
          items: [
            'Each record is represented by one bit, typically 1 or 0, showing whether a condition holds.',
            'n records take n bits, packed into n/8 bytes or n/32 words.',
            'Each bit corresponds to a row-id. If the j-th bit is in the p-th byte, then **row-id = p × 8 + j**.',
            'Counting: a lookup table such as `shcount[]` stores the number of 1-bits for each byte value. For example, `shcount[01100101] = 4`. The count is the sum of `shcount[B[i]]` over all bytes.',
          ],
        },
        {
          type: 'callout',
          tone: 'source-note',
          text: 'One slide describes the lookup table as counting 1-bits, while the following figure counts 0s in each byte. The idea is the same: precompute the answer per byte and add up.',
        },
        {
          type: 'list',
          title: 'Advantages and limits',
          items: [
            'Efficient in space.',
            'Ready for logic composition: C = C1 AND C2 can use bitmap operations.',
            '**Limit:** works only for categorical data with low cardinality. Naively, representing a customer\'s US state takes 50 bits per entry, and sales in dollars are unsuitable.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A warehouse fact table is often fat, with tens or hundreds of attributes, while a query usually touches only a few. **Horizontal storage** stores tuples one by one. **Vertical storage** stores tuples by attribute, and is also called a **projection index**.',
        },
      ],
    },
  ],

  comparisons: [
    {
      id: 'oltp-vs-olap',
      title: 'OLTP versus OLAP',
      table: {
        headers: ['Feature', 'OLTP', 'OLAP'],
        rows: [
          ['Users', 'Clerk, IT professional', 'Knowledge worker'],
          ['Function', 'Day-to-day operations', 'Decision support'],
          ['DB design', 'Application-oriented', 'Subject-oriented'],
          ['Data', 'Current, up-to-date, detailed, flat relational, isolated', 'Historical, summarized, multidimensional, integrated, consolidated'],
          ['Usage', 'Repetitive', 'Ad hoc'],
          ['Access', 'Read/write, index or hash on primary key', 'Lots of scans'],
          ['Unit of work', 'Short, simple transaction', 'Complex query'],
          ['Records accessed', 'Tens', 'Millions'],
          ['Number of users', 'Thousands', 'Hundreds'],
          ['DB size', '100 MB to GB', '100 GB to TB'],
          ['Metric', 'Transaction throughput', 'Query throughput, response time'],
        ],
      },
    },
    {
      id: 'dw-lake-lakehouse',
      title: 'Data warehouse, data lake, and lakehouse',
      table: {
        headers: ['Aspect', 'Data warehouse', 'Data lake', 'Lakehouse'],
        rows: [
          ['Strength', 'Governed, structured, historical data', 'Raw data at scale in many formats', 'Lake flexibility with warehouse-like management'],
          ['Typical use', 'BI dashboards, OLAP, trusted reporting', 'Data science, exploration, logs, images, semi-structured data', 'BI and ML on open data with transactions and governance'],
        ],
      },
    },
    {
      id: 'schemas',
      title: 'Star, snowflake, and fact constellation',
      table: {
        headers: ['Aspect', 'Star', 'Snowflake', 'Fact constellation'],
        rows: [
          ['Fact tables', 'One', 'One', 'Several, sharing dimensions'],
          ['Dimensions', 'One table per dimension', 'Some hierarchies normalized into smaller tables', 'Shared between facts'],
          ['Also called', 'Star schema', 'Refinement of star', 'Galaxy schema'],
        ],
      },
    },
    {
      id: 'horizontal-vs-vertical',
      title: 'Horizontal versus vertical storage with 100 attributes',
      table: {
        headers: ['Query', 'Horizontal', 'Vertical', 'Better for'],
        rows: [
          ['Get all of tuple t', 'Whole tuple in one search', 'Search 100 lists', 'Horizontal (typical of OLTP)'],
          ['SUM(a100) GROUP BY {a22, a83}', 'Search all tuples, O(100n)', 'Search 3 lists, O(3n)', 'Vertical (typical of OLAP)'],
        ],
      },
    },
  ],

  examples: [
    {
      id: 'c3-ex-bitmap',
      title: 'Bitmap index on gender',
      scenario: 'Eight customers. In the bitmap, Female is 0 and Male is 1.',
      table: {
        headers: ['Name', 'Gender', 'Bit'],
        rows: [
          ['Ada', 'Female', '0'],
          ['Bob', 'Male', '1'],
          ['Cathy', 'Female', '0'],
          ['Dan', 'Male', '1'],
          ['Elsa', 'Female', '0'],
          ['Flora', 'Female', '0'],
          ['George', 'Male', '1'],
          ['Hogan', 'Male', '1'],
        ],
      },
      steps: [
        'The bitmap for the eight rows is the single byte 01010011.',
        'The lookup table says byte 01010011 contains four 0s (and so four 1s).',
        'There is no need to read any customer record.',
      ],
      result: 'There are 4 female and 4 male customers, read from one lookup in the byte table.',
    },
    {
      id: 'c3-ex-storage',
      title: 'Why vertical storage suits OLAP',
      scenario: 'A fact table has 100 attributes and n tuples. The query is SUM(a100) GROUP BY {a22, a83}.',
      steps: [
        'Horizontal storage with no index reads all tuples, so all attributes: O(100n).',
        'Vertical storage reads only the lists a22, a83, and a100: O(3n).',
      ],
      result: 'Vertical storage does 3% of the work of the horizontal method.',
    },
    {
      id: 'c3-ex-olap',
      title: 'Choosing an OLAP operation',
      scenario: 'A sales cube has location (cities), time (quarters), and item (types). Name the operation for each request.',
      steps: [
        'Total sales per country rather than per city: **roll-up** on location.',
        'Sales per month rather than per quarter: **drill-down** on time.',
        'Only Q1: **slice** on time.',
        'Toronto or Vancouver, Q1 or Q2, for home entertainment or computers: **dice**.',
        'Swap the item and location axes: **pivot**.',
      ],
      result: 'Roll-up and drill-down change the level of detail, slice and dice choose a subcube, and pivot changes only the view.',
    },
  ],

  takeaways: [
    'A warehouse is subject-oriented, integrated, time-variant, and nonvolatile, and it supports decisions.',
    'OLTP runs daily operations, while OLAP supports analysis. Separating them protects performance for both.',
    'The architecture has three tiers: warehouse server, OLAP server, and front-end tools.',
    'ETL covers extraction, cleaning, transformation, loading, and refresh.',
    'Lakes store raw data as is, lakehouses add warehouse-like management, and metadata management is central.',
    'A cube is a lattice of cuboids, from the n-D base to the 0-D apex.',
    'Star, snowflake, and fact constellation are the three schemas.',
    'Measures are distributive, algebraic, or holistic.',
    'Bitmap indexes suit low-cardinality categorical data, and vertical storage suits queries on few attributes.',
  ],

  examNotes: [
    'Inmon\'s definition is highly examinable. Learn all four properties with one supporting detail each.',
    'Keep the OLTP versus OLAP table in memory. Exams often ask for about five differences.',
    'Nonvolatile does not mean the warehouse never changes. It means no operational updates: only initial loading and access, plus refresh from the sources.',
    'Be able to place a function in a category: avg is algebraic, and median is holistic.',
    'Be ready to name the operation from a short description, and to calculate row-ids with p × 8 + j.',
    'Base is the most detailed cuboid. Apex is the most summarized. Students often reverse these.',
    'Know why bitmap indexes fail on high-cardinality attributes such as sales in dollars.',
  ],

  mcqs: [
    {
      id: 'c3-q1', topic: 'Warehouse properties', difficulty: 'easy', skill: 'definition',
      question: 'Which set contains the four properties in Inmon\'s definition of a data warehouse?',
      options: ['Subject-oriented, integrated, time-variant, nonvolatile', 'Application-oriented, isolated, current, updatable', 'Distributed, encrypted, real-time, volatile', 'Normalized, transactional, relational, indexed'],
      correctIndex: 0,
      explanation: 'W. H. Inmon defines a warehouse as a subject-oriented, integrated, time-variant, and nonvolatile collection supporting management decisions.',
    },
    {
      id: 'c3-q2', topic: 'Warehouse properties', difficulty: 'medium', skill: 'scenario',
      question: 'Hotel prices from several sources differ on currency, tax, and included breakfast, and are converted to a common form when loaded. Which property is this?',
      options: ['Integrated', 'Nonvolatile', 'Time-variant', 'Subject-oriented'],
      correctIndex: 0,
      explanation: 'Integration ensures consistency among heterogeneous sources. The source uses this hotel price example to illustrate it.',
    },
    {
      id: 'c3-q3', topic: 'Warehouse properties', difficulty: 'medium', skill: 'concept',
      question: 'Why does a warehouse not need transaction processing, recovery, and concurrency control mechanisms?',
      options: ['Operational updates do not occur there, only initial loading and data access', 'It stores only unstructured data', 'It runs on the same server as the OLTP system', 'It keeps only current data values'],
      correctIndex: 0,
      explanation: 'Being nonvolatile, the warehouse needs only two data access operations: initial loading and access.',
    },
    {
      id: 'c3-q4', topic: 'OLTP vs OLAP', difficulty: 'easy', skill: 'comparison',
      question: 'Which pairing correctly describes OLAP compared with OLTP?',
      options: ['Knowledge workers, complex queries, and historical data', 'Clerks, short transactions, and current data', 'Thousands of users and tens of records per access', 'Read/write access by primary key'],
      correctIndex: 0,
      explanation: 'OLAP serves knowledge workers with ad hoc complex queries on historical, consolidated data. The other options describe OLTP.',
    },
    {
      id: 'c3-q5', topic: 'Why a separate warehouse', difficulty: 'medium', skill: 'analysis',
      question: 'Which is a data-related reason for separating the warehouse from operational databases?',
      options: ['Decision support needs historical data that operational databases do not typically maintain', 'Operational databases cannot store numbers', 'Warehouses require more concurrency control', 'Operational data is already consolidated across all sources'],
      correctIndex: 0,
      explanation: 'The source lists missing historical data, the need for consolidation, and data quality reconciliation as different data needs.',
    },
    {
      id: 'c3-q6', topic: 'Architecture', difficulty: 'easy', skill: 'technical',
      question: 'In the multi-tier architecture, where does the OLAP server sit?',
      options: ['The middle tier', 'The top tier', 'The bottom tier', 'Inside the data sources'],
      correctIndex: 0,
      explanation: 'Top: front-end tools. Middle: OLAP server. Bottom: data warehouse server, above the data sources.',
    },
    {
      id: 'c3-q7', topic: 'ETL', difficulty: 'medium', skill: 'application',
      question: 'Which ETL function propagates updates from the data sources to the warehouse?',
      options: ['Refresh', 'Load', 'Data extraction', 'Data cleaning'],
      correctIndex: 0,
      explanation: 'Refresh propagates source updates. Load sorts, summarizes, consolidates, computes views, checks integrity, and builds indices and partitions.',
    },
    {
      id: 'c3-q8', topic: 'Metadata', difficulty: 'medium', skill: 'technical',
      question: 'Data lineage, the history of migrated data and its transformation path, is part of which kind of metadata?',
      options: ['Operational metadata', 'Business data', 'Summarization algorithms', 'System performance data'],
      correctIndex: 0,
      explanation: 'Operational metadata covers lineage, the currency of data, and monitoring information.',
    },
    {
      id: 'c3-q9', topic: 'Warehouse models', difficulty: 'medium', skill: 'scenario',
      question: 'A marketing team gets a small warehouse fed directly from the corporate warehouse. What is it?',
      options: ['A dependent data mart', 'An independent data mart', 'A virtual warehouse', 'An enterprise warehouse'],
      correctIndex: 0,
      explanation: 'A data mart serves a specific group. It is dependent when it is fed directly from the warehouse.',
    },
    {
      id: 'c3-q10', topic: 'Data lakes', difficulty: 'easy', skill: 'definition',
      question: 'What most distinguishes how a data lake stores data?',
      options: ['Data is stored as is, without first having to structure it', 'Only cleaned relational tables are accepted', 'Data is deleted after each query', 'Only structured historical summaries are stored'],
      correctIndex: 0,
      explanation: 'A lake is a centralized repository of structured and unstructured data, at any scale, stored as is.',
    },
    {
      id: 'c3-q11', topic: 'Data lakes', difficulty: 'hard', skill: 'analysis',
      question: 'A data lake has hundreds of thousands of data sets, and users cannot understand columns named "VECTOR" and "COORDINATE". Which task addresses this most directly?',
      options: ['Metadata management', 'Decimal scaling', 'Drill-down', 'Horizontal storage'],
      correctIndex: 0,
      explanation: 'The source identifies metadata management as the core task of building lakes, using these unhelpful column names as its illustration.',
    },
    {
      id: 'c3-q12', topic: 'Lakehouses', difficulty: 'medium', skill: 'comparison',
      question: 'What does a lakehouse add to a data lake\'s flexibility and scale?',
      options: ['Warehouse-style data management and ACID transactions', 'Removal of all open storage formats', 'A restriction to structured data', 'A single fixed workload of SQL reporting'],
      correctIndex: 0,
      explanation: 'A lakehouse combines lake flexibility, cost-efficiency, and scale with warehouse data management and ACID transactions.',
    },
    {
      id: 'c3-q13', topic: 'Modern architectures', difficulty: 'hard', skill: 'comparison',
      question: 'How does data virtualization differ from standard ETL?',
      options: ['It integrates only the required metadata into a virtual layer rather than physically moving data', 'It copies all data twice for safety', 'It works only on a single on-premises source', 'It converts all data into a star schema'],
      correctIndex: 0,
      explanation: 'A virtualization tool connects to the sources and creates a virtual data layer using metadata, with no physical movement through ETL.',
    },
    {
      id: 'c3-q14', topic: 'Data cubes', difficulty: 'easy', skill: 'definition',
      question: 'In a lattice of cuboids, what is the apex cuboid?',
      options: ['The topmost 0-D cuboid with the highest level of summarization', 'The n-D cuboid with the most detail', 'A table of raw transactions', 'A dimension table in a star schema'],
      correctIndex: 0,
      explanation: 'The apex is the 0-D cuboid holding the highest summarization. The base cuboid is the n-D cuboid.',
    },
    {
      id: 'c3-q15', topic: 'Data cubes', difficulty: 'medium', skill: 'technical',
      question: 'A cube has the dimensions product, date, and country, with no hierarchies. How many cuboids are in its lattice?',
      options: ['8', '3', '6', '9'],
      correctIndex: 0,
      explanation: 'One 0-D apex, three 1-D, three 2-D, and one 3-D base cuboid make 8 in total, as in the source\'s sample cube.',
    },
    {
      id: 'c3-q16', topic: 'Schemas', difficulty: 'medium', skill: 'scenario',
      question: 'A warehouse has Sales and Shipping fact tables that share the time, item, and location dimensions. Which schema is it?',
      options: ['Fact constellation', 'Star', 'Snowflake', 'Virtual warehouse'],
      correctIndex: 0,
      explanation: 'Multiple fact tables sharing dimension tables form a fact constellation, also called a galaxy schema.',
    },
    {
      id: 'c3-q17', topic: 'Measures', difficulty: 'hard', skill: 'analysis',
      question: 'Sales data is partitioned across servers. Why can avg() be computed from partition results, but median() cannot be computed this way with a fixed amount of data per partition?',
      options: ['avg is algebraic (from sum and count), while median is holistic with no constant bound on sub-aggregate storage', 'avg is holistic, while median is distributive', 'Both are distributive, but median is slower', 'median is algebraic and needs only count'],
      correctIndex: 0,
      explanation: 'avg(x) = sum(x) / count(x), so a bounded number of distributive results suffices. A holistic measure has no constant storage bound.',
    },
    {
      id: 'c3-q18', topic: 'OLAP operations', difficulty: 'easy', skill: 'application',
      question: 'A manager moves from viewing sales by city to viewing them by country. Which operation is this?',
      options: ['Roll-up', 'Drill-down', 'Pivot', 'Slice'],
      correctIndex: 0,
      explanation: 'Climbing the location hierarchy from city to country summarizes the data, which is a roll-up.',
    },
    {
      id: 'c3-q19', topic: 'Bitmap index', difficulty: 'hard', skill: 'technical',
      question: 'Using row-id = p × 8 + j, what is the row-id for the bit with j = 3 in byte p = 2?',
      options: ['19', '16', '24', '11'],
      correctIndex: 0,
      explanation: 'row-id = 2 × 8 + 3 = 19.',
    },
    {
      id: 'c3-q20', topic: 'Column storage', difficulty: 'hard', skill: 'analysis',
      question: 'Why is vertical storage a poor fit for retrieving one complete tuple in a 100-attribute table?',
      options: ['It must search 100 separate attribute lists, whereas horizontal storage gets the tuple in one search', 'It cannot store numeric attributes', 'It always scans every row of every attribute twice', 'It must first build a star schema'],
      correctIndex: 0,
      explanation: 'Whole-tuple access is typical of OLTP and favors horizontal storage. Vertical storage excels when only a few attributes are needed.',
    },
  ],

  written: [
    {
      id: 'c3-w1', format: 'short', topic: 'Warehouse properties',
      prompt: 'What does "time-variant" mean for a data warehouse?',
      shortAnswer: 'It holds a long historical horizon, such as 5 to 10 years, and every key structure contains an element of time.',
      detailedAnswer: ['Operational databases hold current values, while the warehouse provides a historical perspective. The time element in warehouse keys can be explicit or implicit, whereas operational keys may or may not have one.'],
    },
    {
      id: 'c3-w2', format: 'short', topic: 'Bitmap index',
      prompt: 'Why does a bitmap index only suit low-cardinality categorical data?',
      shortAnswer: 'Each distinct value needs its own bit per entry, so high-cardinality attributes become costly. Values like sale amounts are unsuitable.',
      detailedAnswer: ['Each row needs a bit for each distinct value. The source notes that, naively, a customer\'s US state requires 50 bits per entry and asks how a sale in dollars could be represented. Gender, by contrast, is a natural fit.'],
    },
    {
      id: 'c3-w3', format: 'short', topic: 'Modern architectures',
      prompt: 'What is the relationship between data fabric and data virtualization?',
      shortAnswer: 'Data virtualization is one technology that enables a data fabric, and it can be a component or layer in a fabric architecture.',
      detailedAnswer: ['A fabric is a unified architecture offering a single point of access to data across the ecosystem. Virtualization supports this by connecting to sources and creating a virtual layer from metadata, without moving data through ETL.'],
    },
    {
      id: 'c3-w4', format: 'definition', topic: 'Warehouse definition',
      prompt: 'State Inmon\'s definition of a data warehouse.',
      shortAnswer: 'A subject-oriented, integrated, time-variant, and nonvolatile collection of data in support of management\'s decision-making process.',
      detailedAnswer: ['Each adjective describes one property: organized by subject, built from integrated sources, holding history, and not updated operationally. The purpose is decision support.'],
    },
    {
      id: 'c3-w5', format: 'definition', topic: 'Metadata',
      prompt: 'Define **metadata** in a data warehouse.',
      shortAnswer: 'Data that defines warehouse objects.',
      detailedAnswer: ['It stores the warehouse structure, operational metadata, summarization algorithms, the mapping from operational systems, system performance data, and business data.'],
    },
    {
      id: 'c3-w6', format: 'matching', topic: 'Warehouse properties',
      prompt: 'Match each statement with the warehouse property.',
      pairs: [
        { term: 'Subject-oriented', definition: 'Organized around customer, product, and sales.' },
        { term: 'Integrated', definition: 'Consistent naming and encoding across heterogeneous sources.' },
        { term: 'Time-variant', definition: 'Provides a historical perspective over the past 5 to 10 years.' },
        { term: 'Nonvolatile', definition: 'Requires only initial loading and access of data.' },
      ],
      shortAnswer: 'Customer, product, sales: subject-oriented. Consistent encoding: integrated. Historical: time-variant. Only loading and access: nonvolatile.',
      detailedAnswer: ['These four properties form Inmon\'s definition and each one contrasts with how operational databases work.'],
    },
    {
      id: 'c3-w7', format: 'matching', topic: 'OLAP operations',
      prompt: 'Match each operation with its description.',
      pairs: [
        { term: 'Roll-up', definition: 'Summarize by climbing a hierarchy or reducing dimensions.' },
        { term: 'Drill-down', definition: 'Move from a higher-level summary to lower-level detail.' },
        { term: 'Slice', definition: 'Select one value on a single dimension.' },
        { term: 'Dice', definition: 'Pick specific values or ranges on several dimensions.' },
        { term: 'Pivot', definition: 'Rotate by changing the order of dimensions in the view.' },
      ],
      shortAnswer: 'Roll-up summarizes, drill-down adds detail, slice picks one dimension value, dice picks a subcube, and pivot rotates.',
      detailedAnswer: ['Roll-up and drill-down change the level of detail. Slice and dice select part of the cube. Pivot changes only how it is displayed.'],
    },
    {
      id: 'c3-w8', format: 'compare', topic: 'OLTP vs OLAP',
      prompt: 'Compare **OLTP** and **OLAP** on at least five features.',
      shortAnswer: 'OLTP handles daily operations with short transactions on current data for many clerks. OLAP supports decisions with complex queries on historical data for fewer knowledge workers.',
      detailedAnswer: ['The two differ in purpose, data, and workload, which is why they are tuned differently and usually kept in separate systems.'],
      answerTable: {
        headers: ['Feature', 'OLTP', 'OLAP'],
        rows: [
          ['Users', 'Clerk, IT professional', 'Knowledge worker'],
          ['Function', 'Day-to-day operations', 'Decision support'],
          ['Data', 'Current, detailed', 'Historical, summarized'],
          ['Unit of work', 'Short, simple transaction', 'Complex query'],
          ['Records accessed', 'Tens', 'Millions'],
          ['Metric', 'Transaction throughput', 'Query throughput, response time'],
        ],
      },
    },
    {
      id: 'c3-w9', format: 'compare', topic: 'Schemas',
      prompt: 'Compare **star**, **snowflake**, and **fact constellation** schemas.',
      shortAnswer: 'Star has one fact table and flat dimensions. Snowflake normalizes some hierarchies. Constellation has several fact tables sharing dimensions.',
      detailedAnswer: ['Snowflake is a refinement of star. A constellation is viewed as a collection of stars, and so it is also called a galaxy schema.'],
      answerTable: {
        headers: ['Aspect', 'Star', 'Snowflake', 'Constellation'],
        rows: [
          ['Fact tables', 'One', 'One', 'Multiple'],
          ['Dimension hierarchies', 'Not normalized', 'Partly normalized', 'Shared between facts'],
          ['Source example', 'Sales', 'Sales with supplier and city tables', 'Sales and Shipping'],
        ],
      },
    },
    {
      id: 'c3-w10', format: 'compare', topic: 'Warehouse, lake, lakehouse',
      prompt: 'Compare a **data warehouse**, a **data lake**, and a **lakehouse**.',
      shortAnswer: 'A warehouse holds governed, structured history for BI. A lake holds raw data at scale for data science. A lakehouse combines lake flexibility with warehouse-like management.',
      detailedAnswer: ['A lakehouse supports BI and machine learning on open data, with transactions and governance. It offers storage and compute decoupling and diverse data types and workloads.'],
      answerTable: {
        headers: ['Aspect', 'Warehouse', 'Lake', 'Lakehouse'],
        rows: [
          ['Strength', 'Governed, structured, historical', 'Raw, at scale, many formats', 'Flexibility with management'],
          ['Typical use', 'BI, OLAP, trusted reports', 'Data science, logs, images', 'BI and ML on open data'],
        ],
      },
    },
    {
      id: 'c3-w11', format: 'fill-blank', topic: 'Cuboids',
      prompt: 'Complete the statement about cuboids.',
      sentence: 'The n-D cube is called the ___ cuboid, and the topmost 0-D cuboid is called the ___ cuboid.',
      blanks: [['base'], ['apex']],
      shortAnswer: 'Base; apex.',
      detailedAnswer: ['The base cuboid has the lowest level of summarization and the apex has the highest. All cuboids together form the lattice, which is the data cube.'],
    },
    {
      id: 'c3-w12', format: 'fill-blank', topic: 'Measures',
      prompt: 'Name the category of each measure.',
      sentence: 'sum() is ___, avg() is ___, and median() is ___.',
      blanks: [['distributive'], ['algebraic'], ['holistic']],
      shortAnswer: 'Distributive; algebraic; holistic.',
      detailedAnswer: ['sum can be combined from partition sums. avg is sum divided by count, two distributive measures. median has no constant bound on the storage needed for a sub-aggregate.'],
    },
    {
      id: 'c3-w13', format: 'list', topic: 'ETL',
      prompt: 'List the back-end functions of a data warehouse, with one phrase each.',
      shortAnswer: 'Extraction (get data), cleaning (fix errors), transformation (convert format), load (sort, summarize, build indices), refresh (propagate updates).',
      detailedAnswer: ['Extraction gets data from heterogeneous sources. Cleaning detects and rectifies errors. Transformation converts legacy formats to warehouse format. Load sorts, summarizes, consolidates, computes views, checks integrity, and builds indices and partitions. Refresh propagates updates.'],
    },
    {
      id: 'c3-w14', format: 'list', topic: 'Data lakes',
      prompt: 'List the seven common tasks in building data lakes.',
      shortAnswer: 'Ingestion, extraction (type inference), metadata management, cleaning, integration, discovery, and versioning.',
      detailedAnswer: ['Ingestion brings data sets in and extraction draws structure out of unstructured sources. Metadata management makes data understandable, cleaning addresses dirty data, integration finds joinable or union-able tables, discovery helps users find data, and versioning tracks evolving data sets.'],
    },
    {
      id: 'c3-w15', format: 'list', topic: 'Data lakes',
      prompt: 'List the five storage layers of a data lake from the bottom up.',
      shortAnswer: 'Raw, standardized, cleansed, application, and sandbox.',
      detailedAnswer: ['Raw loads source data. Standardized facilitates efficient transfer and cleansing. Cleansed cleanses and transforms. Application implements business logic. Sandbox lets data scientists and analysts enrich data.'],
    },
    {
      id: 'c3-w16', format: 'explain', topic: 'Why a separate warehouse',
      prompt: 'Discuss why organizations maintain a warehouse separate from operational databases.',
      shortAnswer: 'To keep high performance for both workloads, and because decision support needs historical, consolidated, reconciled data that operational systems lack.',
      detailedAnswer: [
        'Performance: the DBMS is tuned for OLTP with indexing, concurrency control, and recovery, while the warehouse is tuned for complex OLAP queries and multidimensional views. Running both on one system would harm each.',
        'Data: decision support needs history, consolidation across sources, and reconciliation of inconsistent formats.',
        'The source adds that more systems now run OLAP directly on relational databases, so this separation is not universal.',
      ],
    },
    {
      id: 'c3-w17', format: 'explain', topic: 'Column storage',
      prompt: 'Explain why column-based storage suits data warehouses.',
      shortAnswer: 'Fact tables are wide but queries use few attributes, so reading only those columns greatly reduces work.',
      detailedAnswer: [
        'A fact table can have tens or hundreds of attributes. Horizontal storage must read every attribute of every tuple it scans. Vertical storage reads only the needed lists.',
        'In the source\'s example, a query on 3 of 100 attributes costs O(3n) rather than O(100n). The trade-off is that fetching one whole tuple requires searching all 100 lists, which is why horizontal storage suits OLTP.',
      ],
    },
    {
      id: 'c3-w18', format: 'scenario', topic: 'Schemas and hierarchies',
      prompt: 'A retailer analyzes sales by day, product, and store, and also tracks shipments by day, product, and shipper. Which schema fits, and why?',
      shortAnswer: 'A fact constellation, because the Sales and Shipping fact tables share the day and product dimensions.',
      detailedAnswer: ['There are two business processes, so two fact tables are needed. Sharing dimensions keeps the analysis consistent. This mirrors the source\'s Sales and Shipping example, viewed as a collection of stars.'],
    },
    {
      id: 'c3-w19', format: 'scenario', topic: 'Bitmap index',
      prompt: 'A table of 1,600 customers has a bitmap on gender. How many bytes does the bitmap occupy, and how is the number of male customers found quickly?',
      shortAnswer: '200 bytes. Add up the number of 1-bits in each byte using a lookup table such as shcount[].',
      detailedAnswer: [
        '1,600 records need 1,600 bits, and 1,600 / 8 = 200 bytes.',
        'If 1 means male, then count = 0, and for each of the 200 bytes add shcount[B[i]]. Customer records never need to be read.',
      ],
    },
  ],
}

export default chapter
