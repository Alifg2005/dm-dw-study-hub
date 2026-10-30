import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta: {
    number: 1,
    slug: 'chapter-01',
    title: 'Introduction to Data Mining',
    description:
      'What data mining is, where it sits in knowledge discovery, the data it works on, the knowledge it produces, and its effect on society.',
    examScope: 'midterm',
  },

  overview: [
    'Data is generated constantly and at a rapid rate, but raw data is not knowledge. **Data mining** is the process of discovering interesting patterns, models, and other kinds of knowledge in large data sets.',
    'This chapter builds the map for the rest of the course: the steps of knowledge discovery, the variety of data that can be mined, the kinds of knowledge that can be extracted, how to judge whether a result is interesting, why the field draws on several disciplines, and where it is applied.',
  ],

  objectives: [
    'Define data mining and explain why the name is considered a misnomer.',
    'List and order the steps of the Knowledge Discovery from Data (KDD) process.',
    'Classify data as structured, semi-structured, or unstructured, and as stored or streaming.',
    'Describe the main kinds of knowledge that can be mined and match them to suitable problems.',
    'Distinguish supervised classification from unsupervised cluster analysis.',
    'State the criteria used to evaluate mined knowledge.',
    'Explain why data mining is a confluence of multiple disciplines.',
    'Discuss the societal benefits and privacy risks of data mining.',
  ],

  keyConcepts: [
    {
      term: 'Knowledge discovery',
      summary: 'A multi-step process in which data mining is one essential step, surrounded by preparation, evaluation, and presentation.',
    },
    {
      term: 'Diversity of data',
      summary: 'Real data mixes structured, semi-structured, and unstructured forms. Different data and goals need different methods.',
    },
    {
      term: 'Prediction versus description',
      summary: 'Classification and regression predict unknown values. Clustering and pattern mining describe structure in data.',
    },
    {
      term: 'Interestingness',
      summary: 'Mining can produce a huge number of patterns, and not all are useful. Results must be evaluated.',
    },
    {
      term: 'Scalability',
      summary: 'Algorithms must cope with very large, high-dimensional, and highly complex data.',
    },
    {
      term: 'Responsible mining',
      summary: 'Useful results must be balanced against data sensitivity, security, and personal privacy.',
    },
  ],

  definitions: [
    { term: 'Data mining', definition: 'The process of discovering interesting patterns, models, and other kinds of knowledge in large data sets.' },
    { term: 'KDD', definition: 'Knowledge Discovery from Data: the overall process that includes preparing data, mining it, evaluating results, and presenting knowledge.' },
    { term: 'Structured data', definition: 'Uniform, record-like or table-like data defined by data dictionaries, with a fixed set of attributes, each with a fixed value range and meaning.' },
    { term: 'Semi-structured data', definition: 'Data whose objects may hold set values, small sets of mixed-type values, or nested structures, and whose structure can be defined flexibly and dynamically.' },
    { term: 'Unstructured data', definition: 'Text and multimedia data, such as audio, images, and video.' },
    { term: 'Time-series', definition: 'An ordered set of numerical values with an equal time interval between them.' },
    { term: 'Streaming data', definition: 'Dynamic, constantly arriving, potentially infinite data that demands real-time response.' },
    { term: 'Frequent pattern', definition: 'An itemset or pattern that occurs frequently in the data, such as items often bought together.' },
    { term: 'Classification', definition: 'Building a model from training examples to describe and distinguish classes, then predicting unknown class labels.' },
    { term: 'Cluster analysis', definition: 'Unsupervised grouping of data into new categories when class labels are unknown.' },
    { term: 'Outlier', definition: 'A data object that does not comply with the general behavior of the data.' },
    { term: 'OLAP', definition: 'Online Analytical Processing: techniques for exploring multidimensional summaries of data.' },
  ],

  sections: [
    {
      id: 'what-is-data-mining',
      title: 'What is data mining?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Data mining turns a large collection of data into knowledge. The name is a **misnomer**, since the accurate description would be "knowledge mining from data".',
        },
        {
          type: 'list',
          title: 'Other names for the field or closely related activity',
          items: ['Knowledge mining from data', 'KDD (Knowledge Discovery from Data)', 'Pattern discovery', 'Knowledge extraction', 'Data analytics', 'Information harvesting'],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Example: Google Flu Trends',
          text: 'Google found a close relationship between the number of people searching for flu-related information and the number with flu symptoms. This allowed flu activity to be estimated up to two weeks faster than traditional systems.',
        },
        {
          type: 'callout',
          tone: 'supplement',
          text: 'A common way to remember this: we say "gold mining", not "rock mining", because we name the thing we want. By that logic, the goal here is knowledge, not data.',
        },
      ],
    },
    {
      id: 'kdd-process',
      title: 'The knowledge discovery process',
      blocks: [
        {
          type: 'paragraph',
          text: 'Data mining is one essential step inside a longer process. Preparation comes first, because the quality of the results depends on the quality of the input.',
        },
        {
          type: 'flow',
          steps: [
            { label: 'Data cleaning', detail: 'Remove noise and inconsistencies' },
            { label: 'Data integration', detail: 'Combine multiple sources' },
            { label: 'Data transformation', detail: 'Convert to forms suited to mining' },
            { label: 'Data selection', detail: 'Retrieve the relevant data' },
            { label: 'Data mining', detail: 'Extract patterns and models' },
            { label: 'Pattern evaluation', detail: 'Identify what is truly interesting' },
            { label: 'Knowledge presentation', detail: 'Show results to users' },
          ],
        },
        {
          type: 'paragraph',
          text: 'The first four steps are grouped as **data preparation**. Selection may come before or after transformation depending on the source. All four come before mining.',
        },
      ],
    },
    {
      id: 'data-types',
      title: 'Diversity of data types',
      blocks: [
        {
          type: 'table',
          table: {
            caption: 'By degree of structure',
            headers: ['Type', 'Character', 'Examples'],
            rows: [
              ['**Structured**', 'Uniform records or tables, with fixed attributes and value ranges', 'Relational databases, data cubes, data matrices, many data warehouses'],
              ['**Semi-structured**', 'Flexible, possibly nested structure with clearly defined meaning', 'Transactional data, sequence data (time-series, gene or protein data, Weblogs), graph or network data'],
              ['**Unstructured**', 'No predefined record structure', 'Text, audio, image, and video data'],
            ],
          },
        },
        {
          type: 'paragraph',
          text: 'Real-world data is often a **mixture** of all three. Graph or network data is described as a more sophisticated type of semi-structured data.',
        },
        {
          type: 'list',
          title: 'Data associated with different applications',
          items: [
            '**Sequence data:** biological sequences differ from shopping transaction sequences.',
            '**Time-series:** ordered numerical values with equal time intervals.',
            '**Spatial, temporal, and spatiotemporal data.**',
            '**Graph and network data:** social, computer communication, biological, and information networks can carry very different semantics.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Even the **same data set** can need different methods for different goals. For software programs, finding plagiarized modules and finding copy-and-paste bugs are different mining tasks.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Stored versus streaming',
          text: 'Stored data is finite and kept in large repositories. Streaming data, such as video surveillance or remote sensing, is dynamic, constantly arriving, infinite, and requires real-time response, which makes effective mining harder.',
        },
      ],
    },
    {
      id: 'knowledge-kinds',
      title: 'Kinds of knowledge that can be mined',
      blocks: [
        {
          type: 'table',
          table: {
            headers: ['Function', 'What it does', 'Example'],
            rows: [
              ['**Multidimensional summarization**', 'Integrates and summarizes data with data warehouses, data cubes, and OLAP. Includes characterization and discrimination.', 'Contrasting dry and wet regions'],
              ['**Frequent patterns and associations**', 'Finds items that occur together and evaluates association and correlation.', '`Diaper → Beer [0.5%, 75%]`'],
              ['**Classification and regression**', 'Builds a model from training examples and predicts for new data.', 'Classifying countries by climate or cars by gas mileage'],
              ['**Cluster analysis**', 'Groups unlabeled data into new categories.', 'Clustering houses to find distribution patterns'],
              ['**Deep learning**', 'Uses neural network architectures, and is reshaping many mining tasks.', 'Computer vision, natural language processing'],
              ['**Outlier analysis**', 'Finds objects that do not follow general behavior.', 'Fraud detection, rare event analysis'],
            ],
          },
        },
        {
          type: 'paragraph',
          text: 'In the association rule `Diaper → Beer [0.5%, 75%]`, the two numbers are **support** and **confidence** respectively. An important question follows: are strongly associated items also strongly correlated? Chapter 4 answers it.',
        },
        {
          type: 'list',
          title: 'Typical classification methods',
          items: ['Decision trees', 'Naive Bayesian classification', 'Support vector machines', 'Neural networks', 'Rule-based and pattern-based classification', 'Logistic regression'],
        },
        {
          type: 'paragraph',
          text: 'Cluster analysis works on the principle of **maximizing intra-class similarity and minimizing inter-class similarity**: objects in a cluster should be alike, and different clusters should be unlike.',
        },
        {
          type: 'list',
          title: 'Deep learning architectures listed',
          items: ['Feed-forward neural networks', 'Convolutional neural networks', 'Recurrent neural networks', 'Graph neural networks', 'Transformer'],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Noise or exception?',
          text: 'One person\'s garbage could be another person\'s treasure. Outliers may be errors, or they may be exactly what you want to find, as in fraud detection. Outliers can be found as a by-product of clustering or regression analysis.',
        },
      ],
    },
    {
      id: 'other-functions',
      title: 'Time, ordering, structure, and networks',
      blocks: [
        {
          type: 'list',
          title: 'Sequence, trend, and evolution analysis',
          items: [
            'Trend, time-series, and deviation analysis, such as regression and value prediction.',
            'Sequential pattern mining, such as buying a digital camera and then large memory cards.',
            'Periodicity analysis.',
            'Motifs and biological sequence analysis, including approximate and consecutive motifs.',
            'Similarity-based analysis.',
            'Mining data streams, which are ordered, time-varying, and potentially infinite.',
          ],
        },
        {
          type: 'list',
          title: 'Structure and network analysis',
          items: [
            '**Graph mining:** frequent subgraphs (chemical compounds), trees (XML), and substructures (Web fragments).',
            '**Information network analysis:** social networks of actors (objects, nodes) and relationships (edges). A person can belong to several heterogeneous networks at once, such as friends, family, and classmates.',
            '**Link mining:** links carry a lot of semantic information.',
            '**Web mining:** the Web is a large information network. Tasks include PageRank, community discovery, opinion mining, and usage mining.',
          ],
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Evaluating mined knowledge',
      blocks: [
        {
          type: 'paragraph',
          text: 'A tremendous number of patterns can be mined, but not all are interesting. Some fit only a certain part of the dimension space, such as a specific time or location. Others are not representative or are only transient.',
        },
        {
          type: 'list',
          title: 'Evaluation criteria',
          items: ['Descriptive versus predictive', 'Coverage', 'Typicality versus novelty', 'Accuracy', 'Timeliness'],
        },
        {
          type: 'paragraph',
          text: 'A further goal: instead of evaluating everything afterward, can we directly mine only the interesting knowledge?',
        },
      ],
    },
    {
      id: 'disciplines-applications',
      title: 'Confluence of disciplines and applications',
      blocks: [
        {
          type: 'list',
          title: 'Why data mining needs multiple disciplines',
          items: [
            '**Tremendous amount of data:** algorithms must scale to big data.',
            '**High dimensionality:** a micro-array may have tens of thousands of dimensions.',
            '**High complexity:** data streams and sensor data, time-series and sequences, graphs and networks, spatial, multimedia, text, and Web data, software programs, and scientific simulations.',
            '**New and sophisticated applications.**',
          ],
        },
        {
          type: 'list',
          title: 'Application areas',
          items: [
            'Web page analysis: classification, clustering, and ranking',
            'Collaborative analysis and recommender systems',
            'Basket data analysis for targeted marketing',
            'Biological and medical data analysis',
            'Software engineering, text analysis, and social and information network analysis',
            'Built-in "invisible" data mining in products from companies such as Google, Microsoft, LinkedIn, and Meta',
            'Dedicated tools such as SAS, MS SQL-Server Analysis Manager, and Oracle Data Mining Tools',
          ],
        },
      ],
    },
    {
      id: 'society',
      title: 'Data mining and society',
      blocks: [
        {
          type: 'paragraph',
          text: 'Data mining can help scientific discovery, business management, economic recovery, and security protection, for example real-time discovery of intruders and cyberattacks.',
        },
        {
          type: 'paragraph',
          text: 'It also carries risk. Mining may unintentionally disclose confidential business or government information or an individual\'s personal information. This is why data security in data mining and **privacy-preserving data publishing and mining** are ongoing research themes.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'The guiding philosophy',
          text: 'Observe data sensitivity and preserve data security and people\'s privacy while still performing successful data mining.',
        },
      ],
    },
  ],

  comparisons: [
    {
      id: 'classification-vs-clustering',
      title: 'Classification versus cluster analysis',
      table: {
        headers: ['Aspect', 'Classification', 'Cluster analysis'],
        rows: [
          ['Learning type', 'Supervised', 'Unsupervised'],
          ['Class labels', 'Known in the training examples', 'Unknown'],
          ['Goal', 'Predict labels for new data', 'Form new categories'],
          ['Example', 'Classifying cars by gas mileage', 'Clustering houses to find distribution patterns'],
        ],
      },
    },
    {
      id: 'stored-vs-streaming',
      title: 'Stored versus streaming data',
      table: {
        headers: ['Aspect', 'Stored data', 'Streaming data'],
        rows: [
          ['Size', 'Finite', 'Infinite'],
          ['Arrival', 'Already held in repositories', 'Constantly coming'],
          ['Response', 'Not necessarily immediate', 'Real-time'],
          ['Examples', 'Large data repositories', 'Video surveillance, remote sensing'],
        ],
      },
    },
  ],

  examples: [],

  takeaways: [
    'Data mining discovers interesting patterns and knowledge from massive data, and is a single step inside KDD.',
    'KDD covers cleaning, integration, selection, transformation, mining, pattern evaluation, and knowledge presentation.',
    'Different data and different goals need different mining methods.',
    'Functions include summarization, pattern discovery, classification, clustering, deep learning, and outlier and trend analysis.',
    'Not all mined patterns are interesting, so evaluation is required.',
    'Scale, dimensionality, and complexity make data mining a confluence of multiple disciplines.',
    'Secure, privacy-aware mining is needed for data mining to benefit society.',
  ],

  examNotes: [
    'Be able to write the KDD steps in order and state which step is the actual mining.',
    'Know why "data mining" is a misnomer and give at least three alternative names.',
    'Be ready to classify a data example as structured, semi-structured, or unstructured. Transactional and sequence data are treated as semi-structured.',
    'Do not confuse classification (labels known) with clustering (labels unknown). The word "unsupervised" signals clustering.',
    'Remember the order in `[0.5%, 75%]`: support first, confidence second.',
    'Learn the clustering principle exactly: maximize intra-class similarity and minimize inter-class similarity.',
  ],

  mcqs: [
    {
      id: 'c1-q1', topic: 'What is data mining', difficulty: 'easy', skill: 'definition',
      question: 'Which statement best describes data mining?',
      options: ['Discovering interesting patterns, models, and other knowledge in large data sets', 'Storing large volumes of data in relational tables', 'Collecting raw data from sensors and websites', 'Encrypting sensitive records before they are published'],
      correctIndex: 0,
      explanation: 'Data mining is about discovering knowledge in large data sets. Storing, collecting, and encrypting data are not the mining itself.',
    },
    {
      id: 'c1-q2', topic: 'What is data mining', difficulty: 'medium', skill: 'concept',
      question: 'Why is the term "data mining" considered a misnomer?',
      options: ['The process actually extracts knowledge from data, so "knowledge mining from data" is more accurate', 'The process only works on small data sets', 'Mining means deleting incorrect data', 'The field no longer uses data as its input'],
      correctIndex: 0,
      explanation: 'The goal is knowledge, not data, so it should be called knowledge mining from data.',
    },
    {
      id: 'c1-q3', topic: 'KDD process', difficulty: 'easy', skill: 'technical',
      question: 'Which step directly follows data mining in the KDD process?',
      options: ['Pattern evaluation', 'Data cleaning', 'Data integration', 'Data selection'],
      correctIndex: 0,
      explanation: 'After patterns are mined they are evaluated, and then the knowledge is presented. The other options are preparation steps that come earlier.',
    },
    {
      id: 'c1-q4', topic: 'KDD process', difficulty: 'medium', skill: 'scenario',
      question: 'An analyst merges customer records from a sales database and a support system, resolving different customer ID formats, before any analysis. Which KDD activity is this?',
      options: ['Data integration', 'Pattern evaluation', 'Knowledge presentation', 'Outlier analysis'],
      correctIndex: 0,
      explanation: 'Combining multiple sources into one coherent data store is data integration, which belongs to the preparation stage.',
    },
    {
      id: 'c1-q5', topic: 'Data types', difficulty: 'easy', skill: 'application',
      question: 'A collection of customer review videos is best classified as:',
      options: ['Unstructured data', 'Structured data', 'A data cube', 'A relational table'],
      correctIndex: 0,
      explanation: 'Text and multimedia such as audio, images, and video are unstructured data.',
    },
    {
      id: 'c1-q6', topic: 'Data types', difficulty: 'medium', skill: 'application',
      question: 'According to the chapter, which data set is an example of semi-structured data?',
      options: ['Weblog sequence data', 'A fixed-schema relational table', 'A data matrix', 'A data cube'],
      correctIndex: 0,
      explanation: 'Sequence data, such as Weblogs, has certain structures with defined meaning and is treated as semi-structured. The others are structured examples.',
    },
    {
      id: 'c1-q7', topic: 'Data types', difficulty: 'medium', skill: 'comparison',
      question: 'What makes streaming data harder to mine than stored data?',
      options: ['It is dynamic, constantly arriving, potentially infinite, and needs real-time response', 'It is always unstructured text', 'It is finite but stored in many repositories', 'It cannot contain numeric values'],
      correctIndex: 0,
      explanation: 'The challenges come from continuous, unbounded arrival and the need to respond in real time. Stored data is finite.',
    },
    {
      id: 'c1-q8', topic: 'Data types', difficulty: 'hard', skill: 'analysis',
      question: 'Software can be mined to find plagiarized modules or copy-and-paste bugs. What general point does this illustrate?',
      options: ['Different kinds of patterns on the same data set can require different mining methods', 'Software data cannot be mined with standard methods', 'A single method is sufficient for any goal on one data set', 'Plagiarism detection is a form of data cleaning'],
      correctIndex: 0,
      explanation: 'The data is the same, but the goals differ, so the methods differ too. The method depends on both the data and the kind of pattern sought.',
    },
    {
      id: 'c1-q9', topic: 'Multidimensional summarization', difficulty: 'medium', skill: 'concept',
      question: 'Characterization and discrimination, such as contrasting dry and wet regions, belong to which data mining function?',
      options: ['Multidimensional data summarization', 'Outlier analysis', 'Deep learning', 'Sequential pattern mining'],
      correctIndex: 0,
      explanation: 'Multidimensional concept description generalizes, summarizes, and contrasts data characteristics, alongside data warehouses, data cubes, and OLAP.',
    },
    {
      id: 'c1-q10', topic: 'Frequent patterns', difficulty: 'easy', skill: 'technical',
      question: 'In the rule `Diaper → Beer [0.5%, 75%]`, what does 75% represent?',
      options: ['Confidence', 'Support', 'Coverage', 'Correlation'],
      correctIndex: 0,
      explanation: 'The bracket lists support first and confidence second, so 0.5% is support and 75% is confidence.',
    },
    {
      id: 'c1-q11', topic: 'Frequent patterns', difficulty: 'medium', skill: 'scenario',
      question: 'A supermarket wants to know which products shoppers often buy together in one visit. Which function fits best?',
      options: ['Mining frequent patterns and associations', 'Classification', 'Cluster analysis of store locations', 'Graph neural networks'],
      correctIndex: 0,
      explanation: 'Items purchased together in a basket form frequent itemsets, which is the classic pattern discovery task.',
    },
    {
      id: 'c1-q12', topic: 'Classification', difficulty: 'easy', skill: 'application',
      question: 'Which task is a typical application of classification?',
      options: ['Credit card fraud detection', 'Computing total annual sales', 'Rotating a data cube', 'Removing duplicate records'],
      correctIndex: 0,
      explanation: 'Fraud detection predicts a class label for each transaction and is a typical application of classification.',
    },
    {
      id: 'c1-q13', topic: 'Clustering', difficulty: 'medium', skill: 'comparison',
      question: 'What is the key difference between cluster analysis and classification?',
      options: ['In clustering class labels are unknown, while classification learns from labeled training examples', 'Clustering can only be used on images', 'Classification groups data with no prior labels', 'Clustering requires a training set with known classes'],
      correctIndex: 0,
      explanation: 'Clustering is unsupervised and forms new categories. Classification is supervised and predicts known classes.',
    },
    {
      id: 'c1-q14', topic: 'Clustering', difficulty: 'medium', skill: 'concept',
      question: 'A good clustering result follows which principle?',
      options: ['High intra-class similarity and low inter-class similarity', 'Low intra-class similarity and high inter-class similarity', 'Equal similarity everywhere', 'The same number of objects in each cluster'],
      correctIndex: 0,
      explanation: 'Objects in the same cluster should be similar, and objects in different clusters should be dissimilar.',
    },
    {
      id: 'c1-q15', topic: 'Outlier analysis', difficulty: 'hard', skill: 'analysis',
      question: 'Why might one say "one person\'s garbage could be another person\'s treasure" about outliers?',
      options: ['An object that looks like noise to one analysis may be the valuable finding in another, such as fraud', 'Outliers should always be deleted before mining', 'Outliers only appear in low-quality data', 'All outliers are measurement errors'],
      correctIndex: 0,
      explanation: 'Whether an outlier is noise or a meaningful exception depends on the goal. In fraud detection and rare event analysis it is the target.',
    },
    {
      id: 'c1-q16', topic: 'Other functions', difficulty: 'medium', skill: 'application',
      question: 'Finding that customers buy a digital camera and later buy large memory cards is an example of:',
      options: ['Sequential pattern mining', 'Graph mining', 'Data scrubbing', 'Multidimensional summarization'],
      correctIndex: 0,
      explanation: 'The order of the purchases matters here, which makes it a sequential pattern.',
    },
    {
      id: 'c1-q17', topic: 'Other functions', difficulty: 'medium', skill: 'application',
      question: 'Finding frequent substructures in chemical compounds is an example of:',
      options: ['Graph mining', 'Periodicity analysis', 'Trend analysis', 'Web usage mining'],
      correctIndex: 0,
      explanation: 'Finding frequent subgraphs, such as chemical compounds, is a graph mining task.',
    },
    {
      id: 'c1-q18', topic: 'Evaluation', difficulty: 'hard', skill: 'scenario',
      question: 'A pattern holds strongly for one city during one week and nowhere else. According to the chapter, what is the concern?',
      options: ['It may fit only a certain dimension space and be transient or unrepresentative', 'It proves the data has been cleaned incorrectly', 'It must be a frequent itemset', 'It cannot be stored in a database'],
      correctIndex: 0,
      explanation: 'Some patterns fit only certain dimensions such as time and location, and they may not be representative or may be transient.',
    },
    {
      id: 'c1-q19', topic: 'Confluence of disciplines', difficulty: 'hard', skill: 'analysis',
      question: 'Micro-array data with tens of thousands of dimensions is cited as a reason for needing multiple disciplines. Which challenge does it illustrate?',
      options: ['High dimensionality of data', 'Small data volumes', 'Lack of any numeric attributes', 'Purely structured relational storage'],
      correctIndex: 0,
      explanation: 'Micro-arrays illustrate high dimensionality, a challenge alongside data volume, complexity, and new applications.',
    },
    {
      id: 'c1-q20', topic: 'Data mining and society', difficulty: 'medium', skill: 'concept',
      question: 'What is the central philosophy of privacy-preserving data mining?',
      options: ['Observe data sensitivity and preserve privacy and security while still mining successfully', 'Stop mining any personal data under all circumstances', 'Publish all data so that results are transparent', 'Mine only data that is stored on government servers'],
      correctIndex: 0,
      explanation: 'The aim is balance: successful data mining that also respects sensitivity, security, and privacy.',
    },
  ],

  written: [
    {
      id: 'c1-w1', format: 'short', topic: 'What is data mining',
      prompt: 'What is data mining, and why is it called a misnomer?',
      shortAnswer: 'Discovering interesting patterns, models, and knowledge in large data sets. It is a misnomer because the output is knowledge, so "knowledge mining from data" is more accurate.',
      detailedAnswer: [
        'Data mining analyzes large data sets to extract interesting patterns, models, and other kinds of knowledge.',
        'The name focuses on the data rather than what is obtained from it. What is extracted is knowledge, so "knowledge mining from data" is the more accurate name. Related terms include KDD, pattern discovery, knowledge extraction, data analytics, and information harvesting.',
      ],
    },
    {
      id: 'c1-w2', format: 'short', topic: 'Evaluation',
      prompt: 'Why are not all mined patterns interesting?',
      shortAnswer: 'Mining can produce huge numbers of patterns. Some fit only certain dimensions, such as a time or place, and others are unrepresentative or transient.',
      detailedAnswer: [
        'Because so many patterns can be produced, most will have little value. A pattern can be valid only in a narrow part of the dimension space, can fail to represent the data generally, or can last only a short time.',
        'Results therefore need evaluating with criteria such as coverage, typicality versus novelty, accuracy, and timeliness.',
      ],
    },
    {
      id: 'c1-w3', format: 'short', topic: 'Society',
      prompt: 'Give two benefits and one risk of data mining for society.',
      shortAnswer: 'Benefits: scientific discovery and security protection. Risk: unintentional disclosure of confidential or personal information.',
      detailedAnswer: [
        'Benefits include scientific discovery, business management, economic recovery, and security protection, such as real-time discovery of intruders and cyberattacks.',
        'The risks are misuse and the unintentional disclosure of confidential business or government information, or of personal information. This motivates privacy-preserving data publishing and mining.',
      ],
    },
    {
      id: 'c1-w4', format: 'definition', topic: 'Data types',
      prompt: 'Define **structured data**.',
      shortAnswer: 'Uniform, record-like or table-like data defined by data dictionaries, with fixed attributes that each have a fixed value range and meaning.',
      detailedAnswer: [
        'Structured data has a uniform layout: every record has the same fixed set of attributes, each with a defined value range and semantic meaning. Relational databases, data cubes, data matrices, and many data warehouses are examples.',
      ],
    },
    {
      id: 'c1-w5', format: 'definition', topic: 'Outlier analysis',
      prompt: 'Which term describes "a data object that does not comply with the general behavior of the data"?',
      shortAnswer: 'An outlier.',
      detailedAnswer: [
        'An outlier does not follow the general behavior of the data. It may be noise or a meaningful exception. Outlier analysis is useful in fraud detection and rare event analysis, and outliers can be found as a by-product of clustering or regression.',
      ],
    },
    {
      id: 'c1-w6', format: 'matching', topic: 'Kinds of knowledge',
      prompt: 'Match each description to the correct data mining function.',
      pairs: [
        { term: 'Cluster analysis', definition: 'Groups data with unknown labels to form new categories.' },
        { term: 'Classification', definition: 'Builds a model from training examples to predict class labels.' },
        { term: 'Association analysis', definition: 'Finds rules such as `Diaper → Beer` with support and confidence.' },
        { term: 'Outlier analysis', definition: 'Finds objects that do not follow the general behavior of the data.' },
        { term: 'OLAP', definition: 'Explores multidimensional summaries built on data cubes.' },
      ],
      shortAnswer: 'Clustering groups unlabeled data, classification predicts labels, association analysis finds rules, outlier analysis finds exceptions, and OLAP explores cube summaries.',
      detailedAnswer: [
        'The key signals are: "unknown labels" means clustering, "training examples" means classification, "support and confidence" means association rules, "general behavior" means outliers, and "data cubes" means multidimensional summarization with OLAP.',
      ],
    },
    {
      id: 'c1-w7', format: 'matching', topic: 'Data types',
      prompt: 'Match each data example with its category.',
      pairs: [
        { term: 'Structured', definition: 'A relational table with fixed attributes.' },
        { term: 'Semi-structured', definition: 'A transactional data set or Weblog sequence.' },
        { term: 'Unstructured', definition: 'Audio, image, and video files.' },
        { term: 'Streaming', definition: 'Continuous remote sensing data needing real-time response.' },
      ],
      shortAnswer: 'Table: structured. Transactions and Weblogs: semi-structured. Audio and video: unstructured. Continuous remote sensing: streaming.',
      detailedAnswer: [
        'The first three categories describe the degree of structure. Streaming describes how the data arrives, in contrast to finite stored data.',
      ],
    },
    {
      id: 'c1-w8', format: 'compare', topic: 'Classification versus clustering',
      prompt: 'Compare **classification** and **cluster analysis**.',
      shortAnswer: 'Classification is supervised and predicts labels using labeled examples. Clustering is unsupervised and forms new groups when labels are unknown.',
      detailedAnswer: [
        'Both organize data into groups, but the difference lies in whether the groups are known in advance. Classification learns from known classes. Clustering discovers new groups based on similarity.',
      ],
      answerTable: {
        headers: ['Aspect', 'Classification', 'Cluster analysis'],
        rows: [
          ['Learning', 'Supervised', 'Unsupervised'],
          ['Labels', 'Known in training data', 'Unknown'],
          ['Output', 'Predicted class for new data', 'New categories'],
          ['Example', 'Credit card fraud detection', 'Finding house distribution patterns'],
        ],
      },
    },
    {
      id: 'c1-w9', format: 'compare', topic: 'Data types',
      prompt: 'Compare **stored data** with **streaming data**.',
      shortAnswer: 'Stored data is finite and held in repositories. Streaming data is dynamic, constantly arriving, infinite, and needs real-time response.',
      detailedAnswer: [
        'Stored data can be examined in repositories without being lost. Streaming data, such as video surveillance or remote sensing, keeps arriving without end and must be handled in real time, which challenges effective mining.',
      ],
      answerTable: {
        headers: ['Aspect', 'Stored', 'Streaming'],
        rows: [
          ['Size', 'Finite', 'Infinite'],
          ['Arrival', 'Held in repositories', 'Constantly coming'],
          ['Response', 'Not necessarily immediate', 'Real-time'],
        ],
      },
    },
    {
      id: 'c1-w10', format: 'fill-blank', topic: 'KDD process',
      prompt: 'Complete the sentence about the final stages of KDD.',
      sentence: 'After data mining, the discovered patterns go through ___ and the results are shown through knowledge ___.',
      blanks: [['pattern evaluation', 'evaluation', 'pattern/model evaluation', 'model evaluation'], ['presentation']],
      shortAnswer: 'Pattern evaluation; presentation.',
      detailedAnswer: ['Mining is followed by pattern or model evaluation, which identifies what is interesting, and then knowledge presentation, which shows the results to users.'],
    },
    {
      id: 'c1-w11', format: 'fill-blank', topic: 'Clustering',
      prompt: 'Complete the clustering principle.',
      sentence: 'Clustering aims at maximizing ___ similarity and minimizing ___ similarity.',
      blanks: [['intra-class', 'intraclass', 'intra class'], ['inter-class', 'interclass', 'inter class']],
      shortAnswer: 'Intra-class; inter-class.',
      detailedAnswer: ['Objects in the same cluster should be very similar (high intra-class similarity), and objects in different clusters should be very different (low inter-class similarity).'],
    },
    {
      id: 'c1-w12', format: 'list', topic: 'KDD process',
      prompt: 'List the steps of the KDD process.',
      shortAnswer: 'Data cleaning, data integration, data transformation, data selection, data mining, pattern evaluation, knowledge presentation.',
      detailedAnswer: [
        'Cleaning, integration, transformation, and selection make up data preparation. Mining then extracts patterns or models. Pattern evaluation identifies what is truly interesting, and knowledge presentation delivers the results.',
        'Selection may come before or after transformation depending on the source. All four come before mining.',
      ],
    },
    {
      id: 'c1-w13', format: 'list', topic: 'Evaluation',
      prompt: 'List the criteria for evaluating mined knowledge.',
      shortAnswer: 'Descriptive versus predictive, coverage, typicality versus novelty, accuracy, and timeliness.',
      detailedAnswer: [
        'These criteria judge whether a result deserves attention: what it does (describes or predicts), how much of the data it covers, whether it is typical or novel, how accurate it is, and whether it is timely.',
      ],
    },
    {
      id: 'c1-w14', format: 'list', topic: 'Confluence of disciplines',
      prompt: 'List the four reasons given for data mining being a confluence of multiple disciplines.',
      shortAnswer: 'Tremendous amounts of data, high dimensionality, high complexity of data, and new and sophisticated applications.',
      detailedAnswer: [
        'Large volumes require scalable algorithms. High dimensionality appears in data such as micro-arrays, with tens of thousands of dimensions. Complexity arises from streams, sequences, graphs, spatial, multimedia, text, and Web data. New applications add further demands.',
      ],
    },
    {
      id: 'c1-w15', format: 'explain', topic: 'KDD process',
      prompt: 'Explain why data mining is described as "an essential step" in knowledge discovery rather than the whole process.',
      shortAnswer: 'Mining extracts patterns, but it needs prepared data first and needs evaluation and presentation afterward for the results to become knowledge.',
      detailedAnswer: [
        'KDD is a sequence. Data is first cleaned, integrated, transformed, and selected so that mining works on suitable input. Mining then produces candidate patterns or models.',
        'Those outputs are not automatically knowledge. Many are uninteresting, so they must be evaluated, and the useful results must be presented in a form that people can use. Mining is therefore central, but not sufficient alone.',
      ],
    },
    {
      id: 'c1-w16', format: 'explain', topic: 'Outlier analysis',
      prompt: 'Discuss whether outliers should always be removed from a data set.',
      shortAnswer: 'No. They may be noise, but they may also be the valuable finding, as in fraud detection and rare event analysis.',
      detailedAnswer: [
        'An outlier does not follow the general behavior of the data, which can mean an error or noise. The question is "noise or exception?".',
        'The decision depends on the goal. For fraud detection, unusual objects are exactly what we are looking for, so removing them would destroy the most useful information.',
      ],
    },
    {
      id: 'c1-w17', format: 'scenario', topic: 'Kinds of knowledge',
      prompt: 'A bank wants to (a) flag suspicious card transactions using past labeled fraud cases, and (b) group customers by behavior with no predefined groups. Which function suits each?',
      shortAnswer: '(a) Classification. (b) Cluster analysis.',
      detailedAnswer: [
        'Task (a) has labeled history and predicts a class for new transactions, so it is supervised classification. Credit card fraud detection is a typical application.',
        'Task (b) has no known labels and forms new groups by similarity, so it is unsupervised cluster analysis.',
      ],
    },
    {
      id: 'c1-w18', format: 'scenario', topic: 'Data mining and society',
      prompt: 'A hospital plans to mine patient records to find disease patterns. Which concern from this chapter must it address, and how?',
      shortAnswer: 'Privacy and data security. It should use privacy-preserving mining and respect data sensitivity while still obtaining useful results.',
      detailedAnswer: [
        'Mining can unintentionally disclose personal information, and medical data is highly sensitive. The guiding philosophy is to observe data sensitivity and preserve security and privacy while performing successful mining.',
        'The relevant field of work is privacy-preserving data publishing and mining.',
      ],
    },
  ],
}

export default chapter
