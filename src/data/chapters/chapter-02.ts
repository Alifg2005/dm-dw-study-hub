import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta: {
    number: 2,
    slug: 'chapter-02',
    title: 'Data, Measurements, and Data Preprocessing',
    description:
      'Attribute types, statistics, similarity and distance measures, data quality, cleaning, integration, transformation, and dimensionality reduction.',
    examScope: 'midterm',
  },

  overview: [
    'Every mining method depends on what the data is and how good it is. This chapter first describes data: the kinds of data sets, the types of attributes, and the statistics and graphs that summarize them.',
    'It then measures how alike objects are, using similarity and distance. Finally it prepares data for mining through cleaning, integration, transformation, and dimensionality reduction.',
  ],

  objectives: [
    'Classify attributes as nominal, binary, ordinal, or numeric, and as discrete or continuous.',
    'Calculate and interpret mean, median, mode, variance, standard deviation, quartiles, and correlation.',
    'Read boxplots, histograms, and scatter plots, and find outliers with the IQR.',
    'Compute Manhattan, Euclidean, supremum, ordinal, binary, and cosine measures.',
    'Identify data quality dimensions and handle missing and noisy data.',
    'Explain data integration problems, including conflicts and redundancy.',
    'Apply min-max, z-score, and decimal scaling normalization, and perform binning.',
    'Compare sampling methods and explain dimensionality reduction.',
  ],

  keyConcepts: [
    { term: 'Attribute type decides the method', summary: 'A valid operation on one type is meaningless on another. You cannot average nominal values such as hair color.' },
    { term: 'Center and spread', summary: 'Central tendency says where data sits. Dispersion says how widely it is spread. You need both.' },
    { term: 'Proximity', summary: 'Similarity and dissimilarity quantify how alike objects are. Many mining methods rely on them.' },
    { term: 'Garbage in, garbage out', summary: 'Real data is incomplete, noisy, and inconsistent, so preprocessing affects result quality.' },
    { term: 'Same scale', summary: 'Normalization stops attributes with large values from dominating distance calculations.' },
    { term: 'Curse of dimensionality', summary: 'As dimensions grow, data becomes sparse and distance becomes less meaningful.' },
  ],

  definitions: [
    { term: 'Data object', definition: 'An entity described by attributes. Also called a sample, example, instance, data point, or tuple. In a database, rows are objects and columns are attributes.' },
    { term: 'Attribute', definition: 'A data field representing a characteristic of an object. Also called a dimension, feature, or variable.' },
    { term: 'Nominal attribute', definition: 'Values are categories, states, or names of things with no meaningful order.' },
    { term: 'Binary attribute', definition: 'A nominal attribute with only two states, 0 and 1. It can be symmetric or asymmetric.' },
    { term: 'Ordinal attribute', definition: 'Values have a meaningful order, but the magnitude between successive values is unknown.' },
    { term: 'Interval-scaled attribute', definition: 'Numeric, measured on equal-sized units, with order but no true zero-point.' },
    { term: 'Ratio-scaled attribute', definition: 'Numeric with an inherent zero-point, so values can be compared as multiples.' },
    { term: 'Median', definition: 'The value that divides an ordered data set into two equal halves.' },
    { term: 'Mode', definition: 'The value that occurs most frequently in the data.' },
    { term: 'IQR', definition: 'Inter-quartile range: Q3 − Q1.' },
    { term: 'Metric', definition: 'A distance that satisfies positivity, symmetry, and the triangle inequality.' },
    { term: 'Noise', definition: 'Random error or variance in a measured variable.' },
    { term: 'Data scrubbing', definition: 'Using simple domain knowledge, such as postal codes or spell-checking, to detect and correct errors.' },
    { term: 'Data auditing', definition: 'Analyzing data to discover rules and relationships, then finding what violates them.' },
    { term: 'Discretization', definition: 'Dividing the range of a continuous attribute into intervals, whose labels can replace actual values.' },
    { term: 'Data reduction', definition: 'Obtaining a much smaller representation of the data that produces almost the same analytical results.' },
    { term: 'Curse of dimensionality', definition: 'As dimensionality increases, data becomes sparse, density and distance become less meaningful, and subspace combinations grow exponentially.' },
  ],

  sections: [
    {
      id: 'data-sets',
      title: 'Types of data sets, objects, and attributes',
      blocks: [
        {
          type: 'table',
          table: {
            headers: ['Family', 'Examples'],
            rows: [
              ['**Record data**', 'Relational records, data matrices, crosstabs, transaction data, and document term-frequency vectors'],
              ['**Graphs and networks**', 'Transportation networks, the World Wide Web, molecular structures, social or information networks'],
              ['**Ordered data**', 'Video (image sequences), temporal time-series, sequential transaction sequences, genetic sequences'],
              ['**Spatial, image, and multimedia**', 'Maps, images, and video'],
            ],
          },
        },
        {
          type: 'table',
          table: {
            caption: 'Attribute types',
            headers: ['Type', 'Meaning', 'Examples'],
            rows: [
              ['**Nominal**', 'Categories with no order', 'Hair color, marital status, occupation, ID numbers, zip codes'],
              ['**Symmetric binary**', 'Both outcomes equally important', 'Gender'],
              ['**Asymmetric binary**', 'Outcomes not equally important. By convention, assign 1 to the most important outcome.', 'Medical test (positive or negative)'],
              ['**Ordinal**', 'Meaningful order, unknown magnitude between values', 'Size {small, medium, large}, grades, army rankings'],
              ['**Interval**', 'Equal-sized units, order, no true zero', 'Temperature in °C or °F, calendar dates'],
              ['**Ratio**', 'Inherent zero-point', 'Temperature in Kelvin, length, counts, monetary quantities'],
            ],
          },
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Interval or ratio?',
          text: 'Ask whether "twice as much" makes sense. 10 K is twice as high as 5 K, so Kelvin is ratio-scaled. Celsius has no true zero, so it is interval-scaled.',
        },
        {
          type: 'paragraph',
          text: 'Independently of these types, an attribute can be **discrete** (a finite or countably infinite set of values, such as zip codes or the words in a document collection, with binary as a special case) or **continuous** (real numbers, such as temperature, height, or weight, usually held as floating-point variables).',
        },
      ],
    },
    {
      id: 'central-tendency',
      title: 'Central tendency',
      blocks: [
        { type: 'formula', label: 'Sample mean', expression: 'x̄ = (1/n) Σ x_{i}', note: 'n is the sample size.' },
        { type: 'formula', label: 'Population mean', expression: 'μ = Σ x / N', note: 'N is the population size.' },
        { type: 'formula', label: 'Weighted arithmetic mean', expression: 'x̄ = Σ w_{i}x_{i} / Σ w_{i}' },
        {
          type: 'list',
          items: [
            '**Trimmed mean:** chops off extreme values before averaging, as in Olympic gymnastics score computation.',
            '**Median:** the middle value of an odd number of values, or the average of the middle two for an even number. For frequency data, cumulative frequencies identify the observation containing the median.',
            '**Mode:** the most frequent value. Data can be unimodal, bimodal, trimodal, or multi-modal.',
          ],
        },
        {
          type: 'table',
          table: {
            caption: 'Position of the measures by data shape',
            headers: ['Shape', 'Relationship'],
            rows: [
              ['Symmetric', 'Mean, median, and mode coincide'],
              ['Positively skewed', 'Mode < median < mean, with a long right tail'],
              ['Negatively skewed', 'Mean < median < mode, with a long left tail'],
            ],
          },
        },
        {
          type: 'callout',
          tone: 'supplement',
          text: 'The slides show these positions only as a diagram. The inequalities above state the same relationship in words.',
        },
      ],
    },
    {
      id: 'dispersion',
      title: 'Dispersion, covariance, and correlation',
      blocks: [
        { type: 'formula', label: 'Population variance', expression: 'σ^{2} = E[(X − μ)^{2}]', note: 'Measures how much X deviates from its mean. Sample variance uses s^{2}.' },
        { type: 'paragraph', text: 'The **standard deviation** s (or σ) is the square root of the variance.' },
        { type: 'formula', label: 'Correlation coefficient', expression: 'ρ_{12} = σ_{12} / (σ_{1} σ_{2})', note: 'Covariance normalized by each variable\'s standard deviation. Range [−1, 1].' },
        {
          type: 'list',
          items: [
            '**ρ > 0:** positively correlated. Values rise together, and a higher value means a stronger correlation.',
            '**ρ = 0:** independent, under the same assumption discussed for covariance.',
            '**ρ < 0:** negatively correlated.',
          ],
        },
        {
          type: 'list',
          title: 'Quartiles and the five-number summary',
          items: [
            '**Q1** is the 25th percentile and **Q3** is the 75th percentile.',
            '**IQR** = Q3 − Q1.',
            '**Five-number summary:** min, Q1, median, Q3, max.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Outliers',
          text: 'The usual rule flags values more than 1.5 × IQR beyond the box: above Q3 + 1.5 × IQR or below Q1 − 1.5 × IQR.',
        },
        {
          type: 'callout',
          tone: 'source-note',
          text: 'The slide phrases this briefly as "a value higher/lower than 1.5 x IQR". Read it as a distance measured from the quartiles, as written above.',
        },
      ],
    },
    {
      id: 'graphs',
      title: 'Graphic displays',
      blocks: [
        {
          type: 'list',
          items: [
            '**Boxplot:** the box ends are Q1 and Q3, so its height is the IQR. A line marks the median. Whiskers extend to the minimum and maximum, and outliers are plotted individually.',
            '**Histogram:** tabulated frequencies shown as bars.',
            '**Scatter plot:** each pair of values is plotted as coordinates. It gives a first look at bivariate data, showing clusters, outliers, and correlation.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Histograms often tell more than boxplots',
          text: 'Two very different distributions can have the same min, Q1, median, Q3, and max, and so have the same boxplot. A histogram reveals the difference.',
        },
      ],
    },
    {
      id: 'proximity',
      title: 'Similarity and distance',
      blocks: [
        {
          type: 'paragraph',
          text: '**Similarity** is higher when objects are more alike, and often falls in [0, 1]. **Dissimilarity** (distance) is lower when objects are more alike, has a minimum of 0, and ranges over [0, 1] or [0, ∞). **Proximity** refers to either one.',
        },
        {
          type: 'paragraph',
          text: 'A **data matrix** holds n data points with l dimensions. A **dissimilarity matrix** registers only the distances d(i, j). It is usually symmetric, so it can be stored as a triangular matrix.',
        },
        { type: 'formula', label: 'Minkowski distance (L_{p} norm)', expression: 'd(i, j) = ( |x_{i1} − x_{j1}|^{p} + … + |x_{il} − x_{jl}|^{p} )^{1/p}' },
        {
          type: 'table',
          table: {
            caption: 'Special cases',
            headers: ['p', 'Name', 'Meaning'],
            rows: [
              ['p = 1', '**Manhattan** (city block, L_{1})', 'Sum of absolute differences. Hamming distance is an example: the number of differing bits between binary vectors.'],
              ['p = 2', '**Euclidean** (L_{2})', 'Straight-line distance'],
              ['p → ∞', '**Supremum** (L_{max}, L_{∞})', 'The maximum difference on any one attribute'],
            ],
          },
        },
        {
          type: 'list',
          title: 'Properties of a metric',
          items: [
            '**Positivity:** d(i, j) > 0 if i ≠ j, and d(i, i) = 0.',
            '**Symmetry:** d(i, j) = d(j, i).',
            '**Triangle inequality:** d(i, j) ≤ d(i, k) + d(k, j).',
          ],
        },
        { type: 'formula', label: 'Ordinal attributes: map rank to [0, 1], then treat as interval-scaled', expression: 'z_{if} = (r_{if} − 1) / (M_{f} − 1)', note: 'freshman 0, sophomore 1/3, junior 2/3, senior 1.' },
        { type: 'formula', label: 'Cosine similarity', expression: 'cos(d1, d2) = (d1 · d2) / (||d1|| × ||d2||)', note: 'Used for term-frequency vectors, gene features, and information retrieval.' },
        {
          type: 'callout',
          tone: 'key',
          title: 'Limit: hidden semantics',
          text: '"The cat bites a mouse" and "The mouse bites a cat" have the same bag of words but different meanings. A vector space model cannot capture this, so complex semantics need new similarity measures.',
        },
      ],
    },
    {
      id: 'proximity-self-study',
      title: 'Binary, categorical, and mixed attributes (self-study)',
      blocks: [
        {
          type: 'callout',
          tone: 'key',
          title: 'Marked self-study in the source',
          text: 'These slides are labeled self-study. They are summarized here so that you can decide how to prepare for them.',
        },
        {
          type: 'paragraph',
          text: 'For two objects with binary attributes, count **q** (both 1), **r** (i is 1, j is 0), **s** (i is 0, j is 1), and **t** (both 0).',
        },
        { type: 'formula', label: 'Symmetric binary', expression: 'd(i, j) = (r + s) / (q + r + s + t)' },
        { type: 'formula', label: 'Asymmetric binary', expression: 'd(i, j) = (r + s) / (q + r + s)', note: 't is ignored because a shared 0 is not informative.' },
        { type: 'formula', label: 'Categorical, simple matching', expression: 'd(i, j) = (p − m) / p', note: 'm is the number of matches and p is the total number of variables. Alternatively, create one binary attribute per nominal state.' },
        { type: 'formula', label: 'Mixed types, weighted combination', expression: 'd(i, j) = Σ w_{ij}^{(f)} d_{ij}^{(f)} / Σ w_{ij}^{(f)}', note: 'Numeric: normalized distance. Binary or nominal: 0 if equal, else 1. Ordinal: compute ranks, then treat as interval-scaled.' },
      ],
    },
    {
      id: 'data-quality',
      title: 'Data quality and cleaning',
      blocks: [
        {
          type: 'list',
          title: 'Major preprocessing tasks',
          items: [
            '**Data cleaning:** handle missing data, smooth noise, identify or remove outliers, resolve inconsistencies.',
            '**Data integration:** combine multiple databases, data cubes, or files.',
            '**Data reduction:** dimensionality reduction, numerosity reduction, and data compression.',
            '**Transformation and discretization:** normalization and concept hierarchy generation.',
          ],
        },
        {
          type: 'table',
          table: {
            caption: 'Six measures of data quality',
            headers: ['Measure', 'Question it asks'],
            rows: [
              ['**Accuracy**', 'Is it correct or wrong?'],
              ['**Completeness**', 'Is anything not recorded or unavailable?'],
              ['**Consistency**', 'Were some copies modified and others not? Are there dangling references?'],
              ['**Timeliness**', 'Is it updated in time?'],
              ['**Believability**', 'How much can we trust that the data is correct?'],
              ['**Interpretability**', 'How easily can the data be understood?'],
            ],
          },
        },
        {
          type: 'table',
          table: {
            caption: 'Ways data can be dirty',
            headers: ['Problem', 'Meaning', 'Example from the source'],
            rows: [
              ['**Incomplete**', 'Missing values, attributes, or only aggregate data', '`Occupation = " "`'],
              ['**Noisy**', 'Noise, errors, or outliers', '`Salary = "−10"`'],
              ['**Inconsistent**', 'Discrepancies in codes or names', '`Age = "42"` with `Birthday = "03/07/2010"`'],
              ['**Intentional**', 'Disguised missing data', 'January 1 as everyone\'s birthday'],
            ],
          },
        },
        {
          type: 'list',
          title: 'Handling missing data',
          ordered: true,
          items: [
            '**Ignore the tuple:** usual when the class label is missing. Not effective when the percentage of missing values per attribute varies considerably.',
            '**Fill in manually:** tedious and possibly infeasible.',
            '**Global constant:** such as "unknown", which risks creating a new class.',
            '**Attribute mean.**',
            '**Attribute mean for samples of the same class:** smarter.',
            '**Most probable value:** inference-based, such as a Bayesian formula or decision tree.',
          ],
        },
        {
          type: 'list',
          title: 'Handling noisy data',
          items: [
            '**Binning:** sort, partition into bins, then smooth by means, medians, or boundaries.',
            '**Regression:** fit the data to regression functions.',
            '**Clustering:** detect and remove outliers.',
            '**Semi-supervised:** combined computer and human inspection of suspicious values.',
          ],
        },
        {
          type: 'list',
          title: 'Cleaning as a process',
          items: [
            '**Discrepancy detection:** use metadata (domain, range, dependency, distribution), check field overloading, and check uniqueness, consecutive, and null rules.',
            '**Data scrubbing** and **data auditing** tools detect errors.',
            '**Data migration tools** and **ETL tools** apply transformations.',
          ],
        },
      ],
    },
    {
      id: 'integration',
      title: 'Data integration',
      blocks: [
        {
          type: 'paragraph',
          text: 'Data integration combines data from multiple sources into a coherent store. It helps reduce noise, gives a more complete picture, and improves mining speed and quality.',
        },
        {
          type: 'list',
          items: [
            '**Schema integration:** match metadata, such as `A.cust-id` and `B.cust-#`.',
            '**Entity identification:** recognize real-world entities across sources, such as Bill Clinton and William Clinton.',
            '**Data value conflicts:** the same entity has different values, for example from metric versus British units. Resolve by taking the mean, median, mode, max, or min, taking the most recent value, or truth finding, which considers source quality.',
            '**Redundancy:** the same attribute may have different names, or one attribute may be derivable from another, such as annual revenue. Detect it with correlation and covariance analysis.',
          ],
        },
      ],
    },
    {
      id: 'transformation',
      title: 'Data transformation',
      blocks: [
        {
          type: 'paragraph',
          text: 'A transformation maps all values of an attribute to a new set of values. Methods include smoothing, attribute construction, aggregation, normalization, and discretization.',
        },
        { type: 'formula', label: 'Min-max normalization', expression: 'v′ = ((v − min_{A}) / (max_{A} − min_{A})) × (new_max_{A} − new_min_{A}) + new_min_{A}' },
        { type: 'formula', label: 'Z-score normalization', expression: 'v′ = (v − μ_{A}) / σ_{A}', note: 'The distance from the mean in units of standard deviation.' },
        { type: 'formula', label: 'Decimal scaling', expression: 'v′ = v / 10^{j}', note: 'j is the smallest integer such that Max(|v′|) < 1.' },
        {
          type: 'callout',
          tone: 'source-note',
          text: 'The normalization slide says an income of $73,000 in its text, but its calculations use $73,600 and give 0.716 and 1.225. The worked example below uses $73,600 so that the arithmetic matches.',
        },
        {
          type: 'list',
          title: 'Discretization methods',
          items: ['Binning', 'Histogram analysis', 'Clustering analysis', 'Decision-tree analysis', 'Correlation (χ^{2}) analysis'],
        },
        {
          type: 'list',
          title: 'Compression',
          items: [
            '**String compression** is typically lossless, but allows only limited manipulation without expansion.',
            '**Audio and video compression** is typically lossy, with progressive refinement.',
            '**Time sequences** differ from audio, as they are typically short and vary slowly with time.',
          ],
        },
        {
          type: 'list',
          title: 'Sampling',
          items: [
            'Sampling chooses a small representative subset s to stand in for data set N, allowing potentially sub-linear mining complexity.',
            '**Simple random sampling:** each item has equal probability. It can perform poorly with skewed data.',
            '**Without replacement (SRSWOR):** a selected object is removed from the population.',
            '**With replacement (SRSWR):** a selected object stays in the population.',
            '**Stratified sampling:** partition the data, then draw approximately the same percentage from each partition.',
            'Sampling may not reduce database I/O, because data is read a page at a time.',
          ],
        },
        {
          type: 'paragraph',
          text: '**Data reduction** methods include regression and log-linear models, histograms, clustering, sampling, data cube aggregation, and data compression.',
        },
      ],
    },
    {
      id: 'dimensionality',
      title: 'Dimensionality reduction',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dimensionality reduction lowers the number of random variables under consideration by obtaining a set of principal variables. It addresses the **curse of dimensionality**.',
        },
        {
          type: 'list',
          title: 'Advantages',
          items: ['Avoids the curse of dimensionality', 'Helps eliminate irrelevant features and reduce noise', 'Reduces the time and space required', 'Allows easier visualization'],
        },
        {
          type: 'list',
          title: 'Typical methods',
          items: ['Principal Component Analysis', 'Attribute Subset Selection', 'Nonlinear Dimensionality Reduction'],
        },
      ],
    },
  ],

  comparisons: [
    {
      id: 'histogram-vs-bar',
      title: 'Histogram versus bar chart',
      table: {
        headers: ['Aspect', 'Histogram', 'Bar chart'],
        rows: [
          ['Purpose', 'Shows the distribution of a variable', 'Compares categories'],
          ['Data', 'Quantitative, grouped into bins', 'Categorical'],
          ['X-axis', 'Numerical intervals', 'Categories'],
          ['Bar order', 'Fixed numerical order', 'Can be reordered'],
          ['Spacing', 'Bars usually touch', 'Bars usually have gaps'],
          ['Encoding', 'Area represents frequency, important with unequal bins', 'Height represents the value'],
        ],
      },
    },
    {
      id: 'binning-widths',
      title: 'Equal-width versus equal-depth binning',
      table: {
        headers: ['Aspect', 'Equal-width', 'Equal-depth (frequency)'],
        rows: [
          ['Rule', 'N intervals of equal size, W = (B − A) / N', 'N intervals with about the same number of samples'],
          ['Strength', 'Most straightforward', 'Good data scaling'],
          ['Weakness', 'Outliers may dominate, and skewed data is handled poorly', 'Categorical attributes can be tricky'],
        ],
      },
    },
    {
      id: 'selection-vs-extraction',
      title: 'Feature selection versus feature extraction',
      table: {
        headers: ['Aspect', 'Feature selection', 'Feature extraction'],
        rows: [
          ['Idea', 'Find a subset of the original variables', 'Transform data into a space of fewer dimensions'],
          ['Original features', 'Kept as they are', 'Replaced by transformed ones'],
        ],
      },
    },
    {
      id: 'lossless-vs-lossy',
      title: 'Lossless versus lossy compression',
      table: {
        headers: ['Aspect', 'Lossless', 'Lossy'],
        rows: [
          ['Reconstruction', 'Exact original data', 'An approximation of the original'],
          ['Typical use', 'Strings', 'Audio and video'],
        ],
      },
    },
  ],

  examples: [
    {
      id: 'c2-ex-minkowski',
      title: 'Minkowski distance at special cases',
      scenario: 'Four points: x1 = (1, 2), x2 = (3, 5), x3 = (2, 0), x4 = (4, 5). Compute distances between x1 and x2.',
      steps: [
        'Differences on each attribute: |1 − 3| = 2 and |2 − 5| = 3.',
        'Manhattan: 2 + 3 = 5.',
        'Euclidean: √(2^{2} + 3^{2}) = √13 = 3.61.',
        'Supremum: max(2, 3) = 3.',
      ],
      result: 'd(x1, x2) is 5 by L_{1}, 3.61 by L_{2}, and 3 by L_{∞}.',
    },
    {
      id: 'c2-ex-cosine',
      title: 'Cosine similarity',
      scenario: 'd1 = (5, 0, 3, 0, 2, 0, 0, 2, 0, 0) and d2 = (3, 0, 2, 0, 1, 1, 0, 1, 0, 1).',
      steps: [
        'Dot product: 15 + 6 + 2 + 2 = 25.',
        '||d1|| = √(25 + 9 + 4 + 4) = √42 = 6.481.',
        '||d2|| = √(9 + 4 + 1 + 1 + 1 + 1) = √17 = 4.12.',
        'cos(d1, d2) = 25 / (6.481 × 4.12).',
      ],
      result: 'cos(d1, d2) = 0.94, so the two documents are very similar.',
    },
    {
      id: 'c2-ex-binary',
      title: 'Asymmetric binary dissimilarity (self-study)',
      scenario: 'Gender is symmetric and is left out. Y and P become 1, and N becomes 0, for Fever, Cough, and Test-1 to Test-4.',
      table: {
        headers: ['Name', 'Fever', 'Cough', 'Test-1', 'Test-2', 'Test-3', 'Test-4'],
        rows: [
          ['Jack', '1', '0', '1', '0', '0', '0'],
          ['Mary', '1', '0', '1', '0', '1', '0'],
          ['Jim', '1', '1', '0', '0', '0', '0'],
        ],
      },
      steps: [
        'd(Jack, Mary): q = 2, r = 0, s = 1, so (0 + 1) / (2 + 0 + 1) = 0.33.',
        'd(Jack, Jim): q = 1, r = 1, s = 1, so (1 + 1) / (1 + 1 + 1) = 0.67.',
        'd(Jim, Mary): q = 1, r = 1, s = 2, so (1 + 2) / (1 + 1 + 2) = 0.75.',
      ],
      result: 'Jack and Mary are most alike, and Jim and Mary are least alike.',
    },
    {
      id: 'c2-ex-normalization',
      title: 'Normalizing an income',
      scenario: 'Income ranges from $12,000 to $98,000, with μ = 54,000 and σ = 16,000. Normalize $73,600.',
      steps: [
        'Min-max to [0.0, 1.0]: (73,600 − 12,000) / (98,000 − 12,000) × (1.0 − 0) + 0 = 0.716.',
        'Z-score: (73,600 − 54,000) / 16,000 = 1.225.',
      ],
      result: 'Min-max gives 0.716. Z-score gives 1.225, meaning 1.225 standard deviations above the mean.',
    },
    {
      id: 'c2-ex-binning',
      title: 'Smoothing by binning',
      scenario: 'Sorted prices: 4, 8, 9, 15, 21, 21, 24, 25, 26, 28, 29, 34. Use three equal-frequency bins.',
      table: {
        headers: ['Bin', 'Values', 'By means', 'By boundaries'],
        rows: [
          ['1', '4, 8, 9, 15', '9, 9, 9, 9', '4, 4, 4, 15'],
          ['2', '21, 21, 24, 25', '23, 23, 23, 23', '21, 21, 25, 25'],
          ['3', '26, 28, 29, 34', '29, 29, 29, 29', '26, 26, 26, 34'],
        ],
      },
      steps: [
        'Partition into three bins of four values each.',
        'By means: replace each value with its bin mean, such as (4 + 8 + 9 + 15) / 4 = 9.',
        'By boundaries: replace each value with the nearer bin boundary, such as 8 → 4 and 9 → 4 in Bin 1, because each is closer to 4 than to 15.',
      ],
      result: 'Both approaches smooth noise by using the values in the same bin.',
    },
    {
      id: 'c2-ex-ordinal',
      title: 'Ordinal distance',
      scenario: 'Rank {freshman, sophomore, junior, senior} as 1 to 4, so M = 4.',
      steps: [
        'Apply z = (r − 1) / (M − 1): freshman 0, sophomore 1/3, junior 2/3, senior 1.',
        'd(freshman, senior) = |0 − 1| = 1.',
        'd(junior, senior) = |2/3 − 1| = 1/3.',
      ],
      result: 'Mapping ranks to [0, 1] lets us use interval-scaled distance on ordinal values.',
    },
  ],

  takeaways: [
    'Rows are data objects and columns are attributes. Attribute type determines the valid operations.',
    'Interval attributes have no true zero. Ratio attributes do.',
    'Mean, median, and mode describe center. Variance, standard deviation, and IQR describe spread.',
    'Correlation ranges over [−1, 1] and is covariance normalized by standard deviations.',
    'Boxplots summarize five numbers, while histograms reveal the shape of a distribution.',
    'Minkowski generalizes Manhattan (p = 1), Euclidean (p = 2), and supremum (p → ∞).',
    'Data quality has six measures: accuracy, completeness, consistency, timeliness, believability, and interpretability.',
    'Min-max, z-score, and decimal scaling put attributes on comparable scales.',
    'High dimensionality makes data sparse and distances less meaningful. Dimensionality reduction addresses this.',
  ],

  examNotes: [
    'Practice each normalization and each Minkowski case by hand, and memorize the formulas.',
    'Ordinal values have an order but unknown gaps. Zip codes and ID numbers are nominal, even though they look numeric.',
    'For asymmetric binary distance, drop t from the denominator. Symmetric binary keeps it.',
    'Know the six ways to handle missing data and the four ways to handle noisy data, in the source\'s wording.',
    'Practice binning by hand. Smoothing by boundaries replaces each value with the closer boundary.',
    'Mistakes to avoid: Euclidean is p = 2, and supremum is the largest single attribute difference.',
    'Slides marked self-study (binary, categorical, and mixed proximity) are lower priority, but know the formulas if your instructor includes them.',
    'The normalization slide mixes $73,000 and $73,600. In an exam, use the numbers the question gives you.',
  ],

  mcqs: [
    {
      id: 'c2-q1', topic: 'Attribute types', difficulty: 'easy', skill: 'application',
      question: 'Size = {small, medium, large} is which attribute type?',
      options: ['Ordinal', 'Nominal', 'Ratio', 'Symmetric binary'],
      correctIndex: 0,
      explanation: 'The values have a meaningful order, but the magnitude between them is unknown, which defines ordinal.',
    },
    {
      id: 'c2-q2', topic: 'Attribute types', difficulty: 'medium', skill: 'comparison',
      question: 'Why is temperature in Kelvin ratio-scaled while temperature in Celsius is interval-scaled?',
      options: ['Kelvin has an inherent zero-point, so 10 K is twice as high as 5 K', 'Celsius values cannot be ordered', 'Kelvin uses unequal units', 'Celsius is a nominal measurement'],
      correctIndex: 0,
      explanation: 'Ratio scales have a true zero, so multiples make sense. Celsius has equal units and order, but no true zero.',
    },
    {
      id: 'c2-q3', topic: 'Attribute types', difficulty: 'medium', skill: 'scenario',
      question: 'A medical test records positive or negative, and positive results matter much more. How should it be treated?',
      options: ['As an asymmetric binary attribute, assigning 1 to positive', 'As a symmetric binary attribute', 'As a ratio-scaled attribute', 'As a continuous attribute'],
      correctIndex: 0,
      explanation: 'The outcomes are not equally important, so it is asymmetric binary. By convention, 1 goes to the most important outcome.',
    },
    {
      id: 'c2-q4', topic: 'Central tendency', difficulty: 'easy', skill: 'technical',
      question: 'What is the median of 3, 7, 9, 12?',
      options: ['8', '7', '9', '7.75'],
      correctIndex: 0,
      explanation: 'With an even count, take the average of the middle two values: (7 + 9) / 2 = 8.',
    },
    {
      id: 'c2-q5', topic: 'Central tendency', difficulty: 'medium', skill: 'analysis',
      question: 'In a positively skewed distribution, which ordering is correct?',
      options: ['Mode < median < mean', 'Mean < median < mode', 'Mean = median = mode', 'Median < mode < mean'],
      correctIndex: 0,
      explanation: 'The long right tail pulls the mean upward, so the mean is greatest and the mode is lowest.',
    },
    {
      id: 'c2-q6', topic: 'Dispersion', difficulty: 'medium', skill: 'technical',
      question: 'If Q1 = 20 and Q3 = 50, a value would usually be flagged as a high outlier above:',
      options: ['95', '50', '65', '80'],
      correctIndex: 0,
      explanation: 'IQR = 30, and 1.5 × 30 = 45. The upper fence is Q3 + 45 = 95.',
    },
    {
      id: 'c2-q7', topic: 'Correlation', difficulty: 'medium', skill: 'concept',
      question: 'A correlation coefficient of −0.9 between X1 and X2 means:',
      options: ['A strong negative relationship: as one increases, the other tends to decrease', 'A weak positive relationship', 'The variables are independent', 'The calculation is invalid because correlation cannot be negative'],
      correctIndex: 0,
      explanation: 'Correlation ranges over [−1, 1]. A value near −1 shows a strong negative correlation.',
    },
    {
      id: 'c2-q8', topic: 'Graphic displays', difficulty: 'hard', skill: 'analysis',
      question: 'Two data sets have identical boxplots. What can you conclude?',
      options: ['They share the same five-number summary, but their distributions may differ', 'They have identical distributions', 'They have the same mean', 'They contain the same individual values'],
      correctIndex: 0,
      explanation: 'A boxplot shows only min, Q1, median, Q3, and max (plus outliers). Histograms can reveal very different shapes behind the same boxplot.',
    },
    {
      id: 'c2-q9', topic: 'Graphic displays', difficulty: 'easy', skill: 'comparison',
      question: 'Which property belongs to a histogram rather than a bar chart?',
      options: ['Numerical bins in a fixed order, with bars that usually touch', 'Categories that can be reordered', 'Separated bars for categorical data', 'Bar height comparing different product names'],
      correctIndex: 0,
      explanation: 'Histograms show the distribution of quantitative data grouped into bins. The other descriptions fit bar charts.',
    },
    {
      id: 'c2-q10', topic: 'Distance', difficulty: 'easy', skill: 'technical',
      question: 'For x = (1, 2) and y = (3, 5), what is the Manhattan distance?',
      options: ['5', '3', '3.61', '13'],
      correctIndex: 0,
      explanation: '|1 − 3| + |2 − 5| = 2 + 3 = 5. Note that 3 is the supremum distance and 3.61 is the Euclidean distance.',
    },
    {
      id: 'c2-q11', topic: 'Distance', difficulty: 'medium', skill: 'technical',
      question: 'For x = (2, 0) and y = (4, 5), what is the supremum distance?',
      options: ['5', '2', '7', '5.39'],
      correctIndex: 0,
      explanation: 'The attribute differences are 2 and 5. Supremum is the maximum, 5. The sum, 7, is Manhattan, and 5.39 is Euclidean.',
    },
    {
      id: 'c2-q12', topic: 'Distance', difficulty: 'hard', skill: 'concept',
      question: 'A dissimilarity measure violates d(i, j) ≤ d(i, k) + d(k, j). What follows?',
      options: ['It is not a metric, because it fails the triangle inequality', 'It is still a metric, if it is symmetric', 'It must be Euclidean distance', 'It cannot be used to measure any dissimilarity'],
      correctIndex: 0,
      explanation: 'A metric must satisfy positivity, symmetry, and the triangle inequality. Nonmetric dissimilarities do exist, but they are not metrics.',
    },
    {
      id: 'c2-q13', topic: 'Ordinal proximity', difficulty: 'medium', skill: 'technical',
      question: 'An ordinal variable has 5 ordered states. What value does rank 3 map to with z = (r − 1) / (M − 1)?',
      options: ['0.5', '0.6', '0.33', '0.75'],
      correctIndex: 0,
      explanation: '(3 − 1) / (5 − 1) = 2 / 4 = 0.5.',
    },
    {
      id: 'c2-q14', topic: 'Cosine similarity', difficulty: 'hard', skill: 'analysis',
      question: 'Why can cosine similarity not separate "The cat bites a mouse" from "The mouse bites a cat"?',
      options: ['Both produce the same term vector, so the measure cannot capture hidden semantics', 'Cosine similarity works only on numeric sensor data', 'The sentences have different lengths', 'Cosine similarity ignores term frequency entirely'],
      correctIndex: 0,
      explanation: 'The two sentences have the same bag of words, so their vectors match even though their meanings differ. That is beyond a vector space model.',
    },
    {
      id: 'c2-q15', topic: 'Data quality', difficulty: 'easy', skill: 'application',
      question: 'A record shows `Age = "42"` and `Birthday = "03/07/2010"`. What kind of problem is this?',
      options: ['Inconsistent data', 'Incomplete data', 'Disguised missing data', 'Redundant data'],
      correctIndex: 0,
      explanation: 'The two fields contradict each other, which is a discrepancy, so the record is inconsistent.',
    },
    {
      id: 'c2-q16', topic: 'Missing data', difficulty: 'medium', skill: 'comparison',
      question: 'Which way of filling a missing income value does the source describe as smarter than using the overall attribute mean?',
      options: ['The attribute mean for all samples of the same class', 'A global constant such as "unknown"', 'Ignoring the attribute everywhere', 'Replacing it with the maximum income'],
      correctIndex: 0,
      explanation: 'Using the class-specific mean takes into account the group that the record belongs to.',
    },
    {
      id: 'c2-q17', topic: 'Data integration', difficulty: 'medium', skill: 'scenario',
      question: 'Two databases store annual revenue in one table and monthly revenue in another. Which problem and detection method apply?',
      options: ['Redundancy from a derivable attribute, detected with correlation or covariance analysis', 'Disguised missing data, detected by sampling', 'Noise, detected with a boxplot of customer names', 'Entity identification, detected with decimal scaling'],
      correctIndex: 0,
      explanation: 'Annual revenue can be derived from other data, so it is redundant. The source detects redundancy with correlation and covariance analysis.',
    },
    {
      id: 'c2-q18', topic: 'Normalization', difficulty: 'medium', skill: 'technical',
      question: 'Values range up to 986 in absolute size. With decimal scaling, what is j?',
      options: ['3', '2', '4', '10'],
      correctIndex: 0,
      explanation: 'j is the smallest integer that gives Max(|v′|) < 1. 986 / 10^{3} = 0.986, while 986 / 10^{2} = 9.86 is too large.',
    },
    {
      id: 'c2-q19', topic: 'Binning and sampling', difficulty: 'hard', skill: 'scenario',
      question: 'A data set has a rare class of only 2% of records. Which sampling approach best keeps it represented?',
      options: ['Stratified sampling', 'Simple random sampling without replacement', 'Simple random sampling with replacement', 'Equal-width binning'],
      correctIndex: 0,
      explanation: 'Simple random sampling can perform poorly under skew. Stratified sampling draws approximately the same percentage from each partition.',
    },
    {
      id: 'c2-q20', topic: 'Dimensionality reduction', difficulty: 'hard', skill: 'comparison',
      question: 'What is the difference between feature selection and feature extraction?',
      options: ['Selection keeps a subset of original features, while extraction transforms data into a lower-dimensional space', 'Selection adds new attributes, while extraction deletes rows', 'Selection applies only to images, while extraction applies only to text', 'They are different names for the same technique'],
      correctIndex: 0,
      explanation: 'Feature selection finds a subset of the original variables. Feature extraction transforms data from the high-dimensional space to one with fewer dimensions.',
    },
  ],

  written: [
    {
      id: 'c2-w1', format: 'short', topic: 'Attributes',
      prompt: 'What is the difference between discrete and continuous attributes?',
      shortAnswer: 'Discrete attributes have a finite or countably infinite set of values. Continuous attributes have real numbers as values.',
      detailedAnswer: [
        'Discrete examples include zip codes, professions, and the set of words in a document collection, and binary attributes are a special case. Continuous examples include temperature, height, and weight, typically stored as floating-point variables.',
        'In practice, real values can only be measured and represented with a finite number of digits.',
      ],
    },
    {
      id: 'c2-w2', format: 'short', topic: 'Normalization',
      prompt: 'Why should attributes be normalized before computing distances?',
      shortAnswer: 'So that attributes with large values do not dominate the distance calculation.',
      detailedAnswer: [
        'Normalization scales values to a smaller, specified range. Without it, a large-valued attribute would outweigh others regardless of its real importance. Chapter 6 makes the same point about k-Nearest Neighbors, where salary can overwhelm a feature measured from 1 to 5.',
      ],
    },
    {
      id: 'c2-w3', format: 'short', topic: 'Data integration',
      prompt: 'State three reasons for performing data integration.',
      shortAnswer: 'It helps reduce or avoid noise, gives a more complete picture, and improves mining speed and quality.',
      detailedAnswer: ['Data integration combines data from multiple sources into a coherent store. Using several sources together can fill gaps and expose errors, which in turn improves the speed and quality of mining.'],
    },
    {
      id: 'c2-w4', format: 'definition', topic: 'Attributes',
      prompt: 'Define **data object** and give its other names.',
      shortAnswer: 'An entity described by attributes. Also called a sample, example, instance, data point, object, or tuple.',
      detailedAnswer: ['A data set is made up of data objects, and each represents an entity. A sales database contains customers, items, and sales. In a database, rows are data objects and columns are attributes.'],
    },
    {
      id: 'c2-w5', format: 'definition', topic: 'Dimensionality',
      prompt: 'What is the **curse of dimensionality**?',
      shortAnswer: 'As dimensionality increases, data becomes sparse, density and distance become less meaningful, and subspace combinations grow exponentially.',
      detailedAnswer: ['Density and distance between points are critical for clustering and outlier analysis, so these methods suffer when distance loses meaning. Dimensionality reduction helps avoid this problem.'],
    },
    {
      id: 'c2-w6', format: 'matching', topic: 'Attribute types',
      prompt: 'Match each example with its attribute type.',
      pairs: [
        { term: 'Nominal', definition: 'Occupation or hair color' },
        { term: 'Asymmetric binary', definition: 'A medical test, where a positive result matters most' },
        { term: 'Ordinal', definition: 'Army rankings' },
        { term: 'Interval', definition: 'Calendar dates' },
        { term: 'Ratio', definition: 'Length or monetary quantity' },
      ],
      shortAnswer: 'Occupation: nominal. Medical test: asymmetric binary. Rankings: ordinal. Dates: interval. Length: ratio.',
      detailedAnswer: ['Look for order, equal-sized units, and an inherent zero. Nominal has none of these, ordinal has order only, interval has order and equal units, and ratio adds a true zero.'],
    },
    {
      id: 'c2-w7', format: 'matching', topic: 'Data quality',
      prompt: 'Match each data quality measure with the question it asks.',
      pairs: [
        { term: 'Accuracy', definition: 'Is the data correct or wrong?' },
        { term: 'Completeness', definition: 'Is anything not recorded or unavailable?' },
        { term: 'Timeliness', definition: 'Is the data updated in time?' },
        { term: 'Believability', definition: 'How much can we trust that the data is correct?' },
        { term: 'Interpretability', definition: 'How easily can the data be understood?' },
        { term: 'Consistency', definition: 'Were some copies modified but others not?' },
      ],
      shortAnswer: 'Accuracy: correct? Completeness: recorded? Timeliness: up to date? Believability: trusted? Interpretability: understood? Consistency: copies agree?',
      detailedAnswer: ['Together these provide a multidimensional view of data quality. Data can score well on one measure and poorly on another.'],
    },
    {
      id: 'c2-w8', format: 'compare', topic: 'Graphic displays',
      prompt: 'Compare a **histogram** and a **bar chart**.',
      shortAnswer: 'A histogram shows the distribution of grouped numerical data with touching bars. A bar chart compares categories with separated, reorderable bars.',
      detailedAnswer: ['The choice depends on the data type. Use a histogram for a numeric variable\'s distribution and a bar chart for categories. In a histogram, area represents frequency, which matters when bin widths are unequal.'],
      answerTable: {
        headers: ['Aspect', 'Histogram', 'Bar chart'],
        rows: [
          ['Purpose', 'Distribution', 'Compare categories'],
          ['Data', 'Quantitative in bins', 'Categorical'],
          ['Order', 'Fixed', 'Reorderable'],
          ['Spacing', 'Usually touching', 'Usually separated'],
          ['Encoding', 'Area', 'Height'],
        ],
      },
    },
    {
      id: 'c2-w9', format: 'compare', topic: 'Binning',
      prompt: 'Compare **equal-width** and **equal-depth** partitioning.',
      shortAnswer: 'Equal-width uses intervals of the same size. Equal-depth uses intervals holding about the same number of samples.',
      detailedAnswer: ['Equal-width is the most straightforward, but outliers may dominate and skewed data is poorly handled. Equal-depth gives good data scaling, but categorical attributes can be tricky.'],
      answerTable: {
        headers: ['Aspect', 'Equal-width', 'Equal-depth'],
        rows: [
          ['Rule', 'W = (B − A) / N', 'About the same count per interval'],
          ['Strength', 'Straightforward', 'Good data scaling'],
          ['Weakness', 'Outliers and skew', 'Categorical attributes are tricky'],
        ],
      },
    },
    {
      id: 'c2-w10', format: 'compare', topic: 'Proximity',
      prompt: 'Compare **symmetric** and **asymmetric** binary dissimilarity.',
      shortAnswer: 'Symmetric uses (r + s) / (q + r + s + t). Asymmetric uses (r + s) / (q + r + s), ignoring shared zeros.',
      detailedAnswer: ['For symmetric attributes, both outcomes are equally important, so matches on 0 count. For asymmetric attributes, the important outcome is 1, so t, where both objects are 0, is left out.', 'The source marks this topic as self-study.'],
      answerTable: {
        headers: ['Aspect', 'Symmetric', 'Asymmetric'],
        rows: [
          ['Importance of outcomes', 'Equal', 'Unequal'],
          ['Formula', '(r + s) / (q + r + s + t)', '(r + s) / (q + r + s)'],
          ['Example', 'Gender', 'Medical test'],
        ],
      },
    },
    {
      id: 'c2-w11', format: 'fill-blank', topic: 'Dispersion',
      prompt: 'Complete the statement about the five-number summary.',
      sentence: 'The five-number summary is min, ___, median, ___, and max. The IQR is calculated as ___ minus Q1.',
      blanks: [['Q1', 'first quartile'], ['Q3', 'third quartile'], ['Q3', 'third quartile']],
      shortAnswer: 'Q1; Q3; Q3.',
      detailedAnswer: ['Q1 is the 25th percentile and Q3 is the 75th percentile. The IQR is the height of the box in a boxplot.'],
    },
    {
      id: 'c2-w12', format: 'fill-blank', topic: 'Distance',
      prompt: 'Complete the special cases of Minkowski distance.',
      sentence: 'With p = 1 we get ___ distance, with p = 2 we get ___ distance, and as p approaches infinity we get ___ distance.',
      blanks: [['Manhattan', 'city block'], ['Euclidean'], ['supremum', 'Lmax', 'L-infinity']],
      shortAnswer: 'Manhattan; Euclidean; supremum.',
      detailedAnswer: ['Manhattan sums absolute differences, Euclidean is the straight-line distance, and supremum takes the maximum difference between any attribute of the vectors.'],
    },
    {
      id: 'c2-w13', format: 'list', topic: 'Missing data',
      prompt: 'List the ways to handle missing data.',
      shortAnswer: 'Ignore the tuple, fill in manually, or fill automatically with a global constant, the attribute mean, the same-class attribute mean, or the most probable value.',
      detailedAnswer: ['Ignoring the tuple is typical when the class label is missing, but it is not effective when missing percentages vary greatly by attribute. Manual filling is tedious. The same-class mean is smarter than the overall mean, and the most probable value uses inference such as a Bayesian formula or decision tree.'],
    },
    {
      id: 'c2-w14', format: 'list', topic: 'Noisy data',
      prompt: 'List four methods for handling noisy data.',
      shortAnswer: 'Binning, regression, clustering, and semi-supervised combined computer and human inspection.',
      detailedAnswer: ['Binning sorts and partitions the data and then smooths it. Regression fits data to functions. Clustering detects and removes outliers. Combined inspection detects suspicious values and has a human check them.'],
    },
    {
      id: 'c2-w15', format: 'list', topic: 'Dimensionality reduction',
      prompt: 'List the advantages of dimensionality reduction.',
      shortAnswer: 'It avoids the curse of dimensionality, eliminates irrelevant features and noise, reduces time and space, and allows easier visualization.',
      detailedAnswer: ['Typical methods include Principal Component Analysis, Attribute Subset Selection, and Nonlinear Dimensionality Reduction.'],
    },
    {
      id: 'c2-w16', format: 'explain', topic: 'Data cleaning',
      prompt: 'Explain why data cleaning is treated as a process rather than a single operation.',
      shortAnswer: 'Errors must first be detected, using metadata, rules, and audit tools, and then corrected through transformations, using migration and ETL tools.',
      detailedAnswer: [
        'Discrepancy detection uses metadata about domain, range, dependency, and distribution, and checks field overloading along with uniqueness, consecutive, and null rules. Data scrubbing tools use domain knowledge, and data auditing tools discover rules and find violators.',
        'Corrections are then applied through migration tools and ETL tools, where users specify transformations.',
      ],
    },
    {
      id: 'c2-w17', format: 'explain', topic: 'Data integration',
      prompt: 'Discuss how value conflicts arise during integration and how they can be resolved.',
      shortAnswer: 'The same entity can have different values across sources, for example from different scales. Resolve by aggregating, taking the latest value, or truth finding.',
      detailedAnswer: [
        'Conflicts can arise from different representations and scales, such as metric and British units, or sometimes for no clear reason.',
        'Options are the mean, median, mode, max, or min, the most recent value, or truth finding, which considers source quality. This overlaps with data cleaning.',
      ],
    },
    {
      id: 'c2-w18', format: 'scenario', topic: 'Normalization',
      prompt: 'Salaries have min 20,000, max 100,000, mean 60,000, and standard deviation 20,000. Normalize 80,000 using min-max to [0, 1] and using z-score.',
      shortAnswer: 'Min-max: 0.75. Z-score: 1.0.',
      detailedAnswer: [
        'Min-max: (80,000 − 20,000) / (100,000 − 20,000) = 60,000 / 80,000 = 0.75.',
        'Z-score: (80,000 − 60,000) / 20,000 = 1.0, so the salary is one standard deviation above the mean.',
      ],
    },
    {
      id: 'c2-w19', format: 'scenario', topic: 'Data quality',
      prompt: 'A form forces users to enter a birthday, and many choose January 1. What data problem is this, and what should an analyst do?',
      shortAnswer: 'Disguised missing data. Detect the suspicious value using distribution checks and treat it as missing.',
      detailedAnswer: [
        'The source describes intentional disguised missing data with this exact example: January 1 as everyone\'s birthday. The value looks valid but actually hides a missing value.',
        'Discrepancy detection on the distribution of values can reveal the unusual spike. The analyst can then treat these values as missing and apply a missing-data method.',
      ],
    },
  ],
}

export default chapter
