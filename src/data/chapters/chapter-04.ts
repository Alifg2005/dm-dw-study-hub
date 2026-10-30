import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta: {
    number: 4,
    slug: 'chapter-04',
    title: 'Pattern Mining: Basic Concepts and Methods',
    description:
      'Frequent itemsets and association rules, closed and max patterns, Apriori, FP-growth, and judging patterns with lift, chi-square, and null-invariant measures.',
    examScope: 'midterm',
  },

  overview: [
    '**Pattern discovery** uncovers sets of items, subsequences, or substructures that occur together frequently, or are strongly correlated, in massive data. It answers questions such as which products are often bought together, and what people buy after an iPad.',
    'The chapter defines support and confidence, shows why the number of patterns explodes and how to compress them, teaches the two main mining algorithms, Apriori and FP-growth, and finally asks a more demanding question: which patterns are actually interesting?',
  ],

  objectives: [
    'Calculate absolute and relative support, and confidence.',
    'Find frequent itemsets and association rules from thresholds.',
    'Identify closed and maximal frequent itemsets, and explain lossless versus lossy compression.',
    'State the downward closure property and use it to prune candidates.',
    'Trace Apriori, including self-join and pruning.',
    'Build an FP-tree and mine conditional pattern bases.',
    'Explain the limits of the support-confidence framework.',
    'Calculate lift, chi-square, Kulczynski, and the Imbalance Ratio, and explain null-invariance.',
  ],

  keyConcepts: [
    { term: 'Support and confidence', summary: 'Support measures how common a pattern is. Confidence measures how often a rule holds when its left side occurs.' },
    { term: 'Combinatorial explosion', summary: 'A long frequent pattern has a huge number of sub-patterns, so compact representations are needed.' },
    { term: 'Downward closure', summary: 'Any subset of a frequent itemset must be frequent, which allows powerful pruning.' },
    { term: 'Pattern growth', summary: 'FP-growth avoids candidate generation by recursively mining conditional databases.' },
    { term: 'Strong is not interesting', summary: 'A rule can meet support and confidence thresholds and still be misleading.' },
    { term: 'Null-invariance', summary: 'Good measures for large transaction data should not change with the number of null transactions.' },
  ],

  definitions: [
    { term: 'Pattern', definition: 'A set of items, subsequences, or substructures that occur frequently together, or are strongly correlated, in a data set.' },
    { term: 'Transactional database (TDB)', definition: 'A database in which each transaction has an identifier (TID) and a set of items, and possibly counts.' },
    { term: 'k-itemset', definition: 'An itemset containing k items.' },
    { term: 'Absolute support', definition: 'The number of occurrences of an itemset.' },
    { term: 'Relative support', definition: 'The fraction of transactions containing an itemset.' },
    { term: 'Frequent itemset', definition: 'An itemset whose support is no less than the minsup threshold.' },
    { term: 'Confidence', definition: 'The conditional probability that a transaction containing X also contains Y: sup(X, Y) / sup(X).' },
    { term: 'Closed pattern', definition: 'A frequent pattern X with no super-pattern having the same support as X.' },
    { term: 'Max-pattern', definition: 'A frequent pattern X with no frequent super-pattern.' },
    { term: 'Downward closure (Apriori) property', definition: 'Any subset of a frequent itemset must be frequent.' },
    { term: 'FP-tree', definition: 'A compact tree of ordered frequent item lists with shared prefixes merged and counts accumulated.' },
    { term: 'Conditional database', definition: 'For an item, the transformed prefix paths under the condition that the item exists.' },
    { term: 'Null transaction', definition: 'A transaction containing neither of the items being analyzed.' },
    { term: 'Null-invariant', definition: 'A measure whose value does not change with the number of null transactions.' },
    { term: 'Imbalance Ratio (IR)', definition: 'A measure of how different the two directional relationships A → B and B → A are.' },
  ],

  sections: [
    {
      id: 'why-patterns',
      title: 'Why pattern discovery matters',
      blocks: [
        {
          type: 'list',
          title: 'A foundation for other tasks',
          items: [
            'Association, correlation, and causality analysis',
            'Mining sequential and structural (such as sub-graph) patterns',
            'Classification: discriminative pattern-based analysis',
            'Cluster analysis: pattern-based subspace clustering',
          ],
        },
        {
          type: 'paragraph',
          text: '**Applications** include market basket analysis, cross-marketing, catalog design, sale campaign analysis, Web log analysis, and biological sequence analysis, on data types including spatiotemporal, multimedia, time-series, and stream data.',
        },
      ],
    },
    {
      id: 'itemsets-rules',
      title: 'Itemsets, support, and association rules',
      blocks: [
        {
          type: 'table',
          table: {
            caption: 'Running example',
            headers: ['Tid', 'Items bought'],
            rows: [
              ['1', 'Beer, Nuts, Diaper'],
              ['2', 'Beer, Coffee, Diaper'],
              ['3', 'Beer, Diaper, Eggs'],
              ['4', 'Nuts, Eggs, Milk'],
              ['5', 'Nuts, Coffee, Diaper, Eggs, Milk'],
            ],
          },
        },
        {
          type: 'list',
          items: [
            'sup{Beer} = 3, sup{Diaper} = 4, sup{Beer, Diaper} = 3, sup{Beer, Eggs} = 1.',
            's{Beer} = 3/5 = 60%, s{Diaper} = 4/5 = 80%, s{Beer, Eggs} = 1/5 = 20%.',
          ],
        },
        { type: 'formula', label: 'Confidence of X → Y', expression: 'c = sup(X, Y) / sup(X)', note: 'Note that X ∪ Y is the set containing both X and Y.' },
        {
          type: 'paragraph',
          text: '**Association rule mining** finds all rules X → Y with s ≥ minsup and c ≥ minconf. It is very close to frequent pattern mining, and scalable methods are needed for large data.',
        },
      ],
    },
    {
      id: 'compressed-patterns',
      title: 'Too many patterns: closed and max-patterns',
      blocks: [
        {
          type: 'paragraph',
          text: 'With T1 = {a1, …, a50} and T2 = {a1, …, a100} and minsup = 1, the total number of frequent itemsets is C(100, 1) + C(100, 2) + … + C(100, 100) = **2^{100} − 1**. This is too huge for anyone to compute or store.',
        },
        {
          type: 'table',
          table: {
            headers: ['Representation', 'Condition', 'Result for this example', 'Compression'],
            rows: [
              ['**Closed**', 'Frequent, with no super-pattern of the same support', '{a1, …, a50}: 2 and {a1, …, a100}: 1', 'Lossless: support of any frequent pattern can be derived'],
              ['**Max-pattern**', 'Frequent, with no frequent super-pattern', '{a1, …, a100}: 1', 'Lossy: exact sub-pattern supports are lost'],
            ],
          },
        },
        {
          type: 'callout',
          tone: 'key',
          text: 'Every max-pattern is closed, and every closed pattern is frequent. In many applications, closed patterns are more desirable because they keep the support information.',
        },
      ],
    },
    {
      id: 'apriori',
      title: 'The Apriori algorithm',
      blocks: [
        {
          type: 'paragraph',
          text: 'Downward closure gives the **Apriori pruning principle**: if any itemset is infrequent, its supersets should not even be generated. Every transaction containing {beer, diaper, nuts} also contains {beer, diaper}. There are three major scalable approaches: **Apriori** (level-wise, join-based), **Eclat** (vertical data format), and **FP-growth** (pattern projection and growth).',
        },
        {
          type: 'list',
          title: 'Outline (level-wise, generate and test)',
          ordered: true,
          items: [
            'Scan the database once to get frequent 1-itemsets.',
            'Generate length-(k+1) candidates from frequent length-k itemsets.',
            'Test the candidates against the database to find frequent (k+1)-itemsets.',
            'Set k := k + 1, and repeat until no frequent or candidate set can be generated.',
            'Return all the frequent itemsets found.',
          ],
        },
        {
          type: 'list',
          title: 'Candidate generation',
          items: [
            '**Self-join:** two (k−1)-itemsets join if their first k−2 items match and `p.item(k−1) < q.item(k−1)`.',
            '**Prune:** remove any candidate with an infrequent subset.',
            '**Ordering** gives each itemset one consistent representation, so {abc, cab, bca} are not treated as different.',
            'The `<` condition prevents generating the same candidate twice: join(abc, abd) is allowed and join(abd, abc) is rejected.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Candidate generation example',
          text: 'F3 = {abc, abd, acd, ace, bcd}. Self-join gives abcd (abc + abd) and acde (acd + ace). Prune acde because ade is not in F3. Result: C4 = {abcd}.',
        },
      ],
    },
    {
      id: 'fp-growth',
      title: 'FP-growth',
      blocks: [
        {
          type: 'paragraph',
          text: 'Apriori is breadth-first, and it repeatedly scans the database. **FP-growth** (Han, Pei, and Yin, SIGMOD 2000) is a depth-first alternative with no candidate generation: for a frequent itemset, it confines later search to only the transactions containing it.',
        },
        {
          type: 'list',
          title: 'Method',
          ordered: true,
          items: [
            'Scan once to find frequent single items, and sort them in descending frequency to form the **f-list**.',
            'Scan again, and insert each transaction\'s ordered frequent items into an **FP-tree**, merging shared sub-branches and accumulating counts.',
            'For each item, collect its **conditional database** from the prefix paths, using the header table.',
            'Build a **conditional FP-tree** from it, keeping only items that meet minsup.',
            'Recurse until the tree is empty or has a single path. A single path generates all combinations of its sub-paths in one shot.',
          ],
        },
        {
          type: 'list',
          title: 'Scaling and special cases',
          items: [
            '**Single prefix path:** reduce the path to one node, mine the two parts, and concatenate the results.',
            '**FP-tree too large for memory:** project the database on frequent single items, and construct and mine an FP-tree for each projected database.',
            '**Parallel projection:** project on each frequent item. Space costly, but all partitions can be processed in parallel.',
            '**Partition projection:** partition in order, passing unprocessed parts to subsequent partitions.',
          ],
        },
      ],
    },
    {
      id: 'interestingness',
      title: 'Which patterns are interesting?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Interestingness is **objective** (support, confidence, correlation) or **subjective** (depends on the user: query-based, or judged against one\'s knowledge base for unexpectedness, freshness, and timeliness).',
        },
        { type: 'formula', label: 'Lift', expression: 'lift(B, C) = c(B → C) / s(C) = s(B ∪ C) / (s(B) × s(C))', note: '1 means independent, above 1 positively correlated, below 1 negatively correlated.' },
        { type: 'formula', label: 'Chi-square', expression: 'χ^{2} = Σ (Observed − Expected)^{2} / Expected', note: 'Expected = (row total × column total) / grand total.' },
        {
          type: 'paragraph',
          text: 'Lift and χ^{2} are more telling than support and confidence, but they have their own weakness. They are **not null-invariant**, so null transactions can change their value. In one data set, BC (100) is much rarer than B¬C (1000) and ¬BC (1000), yet 100,000 null transactions push lift to 8.44 and χ^{2} to 670.',
        },
        {
          type: 'table',
          table: {
            caption: 'Interestingness measures, with s = support',
            headers: ['Measure', 'Definition', 'Range', 'Null-invariant?'],
            rows: [
              ['χ^{2}(A, B)', 'Σ (e − o)^{2} / e', '[0, ∞]', 'No'],
              ['Lift(A, B)', 's(A∪B) / (s(A) × s(B))', '[0, ∞]', 'No'],
              ['AllConf(A, B)', 's(A∪B) / max{s(A), s(B)}', '[0, 1]', 'Yes'],
              ['Jaccard(A, B)', 's(A∪B) / (s(A) + s(B) − s(A∪B))', '[0, 1]', 'Yes'],
              ['Cosine(A, B)', 's(A∪B) / √(s(A) × s(B))', '[0, 1]', 'Yes'],
              ['Kulczynski(A, B)', '½ (s(A∪B)/s(A) + s(A∪B)/s(B))', '[0, 1]', 'Yes'],
              ['MaxConf(A, B)', 'max{s(A∪B)/s(A), s(A∪B)/s(B)}', '[0, 1]', 'Yes'],
            ],
          },
        },
        { type: 'formula', label: 'Imbalance Ratio', expression: 'IR(A, B) = |s(A) − s(B)| / (s(A) + s(B) − s(A∪B))' },
        {
          type: 'paragraph',
          text: 'The null-invariant measures are essentially min, max, and mean variants of p = P(B|A) and q = P(A|B). They can still disagree. On data sets D4 to D6, Kulc stays at 0.5 while IR is 0, 0.89, and 0.99. **Kulczynski with IR** gives both the overall score and the degree of imbalance.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Application: DBLP coauthors',
          text: 'In the DBLP bibliographic database, with over 3.8 million entries, Kulc is used to find advisor-advisee relationships and close collaborators. A student who publishes mostly with one advisor gives an imbalanced pair, and Kulc still ranks it highly.',
        },
      ],
    },
  ],

  comparisons: [
    {
      id: 'closed-vs-max',
      title: 'Closed patterns versus max-patterns',
      table: {
        headers: ['Aspect', 'Closed', 'Max-pattern'],
        rows: [
          ['Condition on super-patterns', 'None with the same support', 'None that is frequent'],
          ['Compression', 'Lossless', 'Lossy'],
          ['Sub-pattern support', 'Can be derived', 'Lost'],
          ['Typical number', 'More patterns', 'Fewer patterns'],
        ],
      },
    },
    {
      id: 'apriori-vs-fpgrowth',
      title: 'Apriori versus FP-growth',
      table: {
        headers: ['Aspect', 'Apriori', 'FP-growth'],
        rows: [
          ['Search', 'Breadth-first, level-wise', 'Depth-first, divide and conquer'],
          ['Candidates', 'Generate and test', 'No candidate generation'],
          ['Database scans', 'Repeated, level by level', 'Two scans to build the FP-tree'],
          ['Data structure', 'Candidate sets', 'FP-tree and conditional FP-trees'],
        ],
      },
    },
    {
      id: 'measures-compare',
      title: 'Lift and chi-square versus Kulczynski',
      table: {
        headers: ['Aspect', 'Lift and χ^{2}', 'Kulczynski with IR'],
        rows: [
          ['Null-invariant', 'No', 'Yes'],
          ['Effect of null transactions', 'Can change the value greatly', 'None'],
          ['Directional imbalance', 'Not reported', 'Reported by IR'],
          ['When to use', 'Few or balanced null transactions', 'When null transactions are predominant'],
        ],
      },
    },
  ],

  examples: [
    {
      id: 'c4-ex-rules',
      title: 'Frequent itemsets and rules',
      scenario: 'Use the five-transaction database, with minsup = 50% and minconf = 50%.',
      steps: [
        'Frequent 1-itemsets: Beer 3, Nuts 3, Diaper 4, Eggs 3.',
        'Frequent 2-itemsets: only {Beer, Diaper}: 3. There are no frequent 3-itemsets.',
        'Beer → Diaper: support 3/5 = 60%, confidence 3/3 = 100%.',
        'Diaper → Beer: support 3/5 = 60%, confidence 3/4 = 75%.',
      ],
      result: 'Rules: Beer → Diaper (60%, 100%) and Diaper → Beer (60%, 75%).',
    },
    {
      id: 'c4-ex-closed',
      title: 'Frequent, closed, and maximal itemsets',
      scenario: 'TIDs: 1 {A, C, D}, 2 {B, C, D}, 3 {A, B, C, D}, 4 {B, D}, 5 {A, B, C, D}. minsup = 3.',
      table: {
        headers: ['Itemset', 'Support', 'Closed?', 'Maximal?'],
        rows: [
          ['{A}', '3', 'No, {A, C} has the same support', 'No'],
          ['{B}', '4', 'No, {B, D} has the same support', 'No'],
          ['{C}', '4', 'No, {C, D} has the same support', 'No'],
          ['{D}', '5', 'Yes', 'No'],
          ['{A, C}', '3', 'No, {A, C, D} has the same support', 'No'],
          ['{A, D}', '3', 'No, {A, C, D} has the same support', 'No'],
          ['{B, C}', '3', 'No, {B, C, D} has the same support', 'No'],
          ['{B, D}', '4', 'Yes', 'No'],
          ['{C, D}', '4', 'Yes', 'No'],
          ['{A, C, D}', '3', 'Yes', 'Yes'],
          ['{B, C, D}', '3', 'Yes', 'Yes'],
        ],
      },
      steps: [
        'Count every itemset and drop those under 3: {A, B}, {A, B, C}, {A, B, D}, and {A, B, C, D} each have support 2.',
        'Closed: no superset has the same support.',
        'Maximal: no superset is frequent.',
      ],
      result: '11 frequent, 5 closed ({D}, {B, D}, {C, D}, {A, C, D}, {B, C, D}), and 2 maximal ({A, C, D}, {B, C, D}).',
    },
    {
      id: 'c4-ex-apriori',
      title: 'Apriori trace',
      scenario: 'TIDs: 10 {A, C, D}, 20 {B, C, E}, 30 {A, B, C, E}, 40 {B, E}. minsup = 2.',
      steps: [
        'C1 counts: A 2, B 3, C 3, D 1, E 3. D is removed, so F1 = {A, B, C, E}.',
        'C2 counts: AB 1, AC 2, AE 1, BC 2, BE 3, CE 2. So F2 = {AC, BC, BE, CE}.',
        'C3 = {BCE}, because BC, BE, and CE are all frequent. Its count is 2.',
        'No more candidates can be generated.',
      ],
      result: 'F3 = {B, C, E} with support 2, after 3 database scans.',
    },
    {
      id: 'c4-ex-fptree',
      title: 'Mining an FP-tree',
      scenario: 'TIDs: 100 {f,a,c,d,g,i,m,p}, 200 {a,b,c,f,l,m,o}, 300 {b,f,h,j,o,w}, 400 {b,c,k,s,p}, 500 {a,f,c,e,l,p,m,n}. min_support = 3.',
      table: {
        headers: ['Item', 'Conditional database', 'Conditional FP-tree', 'Patterns generated'],
        rows: [
          ['p:3', 'fcam:2, cb:1', 'c:3', 'cp:3'],
          ['m:3', 'fca:2, fcab:1', 'fca:3', 'fm, cm, am, fcm, fam, cam, fcam (all :3)'],
          ['b:3', 'fca:1, f:1, c:1', 'empty', 'none'],
          ['a:3', 'fc:3', 'fc:3', 'fa, ca, fca (all :3)'],
          ['c:4', 'f:3', 'f:3', 'fc:3'],
          ['f:4', 'empty', 'empty', 'none'],
        ],
      },
      steps: [
        'Frequent items: f:4, c:4, a:3, b:3, m:3, p:3, so the f-list is f-c-a-b-m-p.',
        'Ordered transactions: fcamp, fcabm, fb, cbp, fcamp.',
        'Insert each into the tree, merging shared prefixes. The result has branches f:4 → c:3 → a:3 and a separate c:1 → b:1 → p:1.',
        'Mine each item\'s conditional database, starting from the least frequent end of the header table.',
      ],
      result: 'For m, the conditional tree is the single path fca:3, so all its combinations are generated at once.',
    },
    {
      id: 'c4-ex-lift',
      title: 'A misleading rule',
      scenario: 'Of 1000 students, 600 play basketball (B), 750 eat cereal (C), and 400 do both. minsup = 30%, minconf = 60%.',
      table: {
        headers: ['', 'Basketball', 'Not basketball', 'Row'],
        rows: [
          ['Cereal', '400 (expected 450)', '350 (expected 300)', '750'],
          ['Not cereal', '200 (expected 150)', '50 (expected 100)', '250'],
          ['Column', '600', '400', '1000'],
        ],
      },
      steps: [
        'Rule B → C has support 40% and confidence 66.7%, so it looks strong.',
        'But 75% of all students eat cereal, which is above 66.7%. Also, ¬B → C has support 35% and confidence 87.5%.',
        'lift(B, C) = 0.4 / (0.6 × 0.75) = 0.89, below 1, so negatively correlated.',
        'lift(¬B, C) = 0.35 / (0.4 × 0.75) = 1.17, above 1, so positively correlated.',
        'χ^{2} = 50^{2}/450 + 50^{2}/300 + 50^{2}/150 + 50^{2}/100 = 55.56.',
      ],
      result: 'B and C are correlated, and since the observed 400 is below the expected 450, the association is negative.',
    },
  ],

  takeaways: [
    'Support shows how common a pattern is, and confidence is a conditional probability.',
    'Closed patterns compress without loss, while max-patterns compress with loss.',
    'The downward closure property prunes supersets of infrequent itemsets.',
    'Apriori is breadth-first with candidate generation. FP-growth is depth-first without it.',
    'Strong rules can mislead, as the basketball and cereal example shows.',
    'Lift above 1 means positive correlation, 1 means independence, and below 1 means negative correlation.',
    'Lift and chi-square are not null-invariant. When null transactions dominate, use cosine or Kulczynski, with IR to report imbalance.',
  ],

  examNotes: [
    'Practice calculating support, confidence, and lift from a small table. Keep the percent and count forms straight.',
    'Practice listing frequent, closed, and maximal itemsets. Closed checks equal support among supersets, and maximal checks frequent supersets.',
    'In Apriori, candidates must survive both the self-join and the prune step. Always show the pruned candidates.',
    'For FP-trees, sort by the f-list before inserting and drop infrequent items. Forgetting this is the most common error.',
    'To compute a chi-square expected value, use row total × column total / grand total.',
    'The confidence formula divides by the left side of the rule, so X → Y and Y → X differ.',
    'Be ready to say why the null-invariant measures matter, and why Kulc needs IR.',
  ],

  mcqs: [
    {
      id: 'c4-q1', topic: 'Support', difficulty: 'easy', skill: 'technical',
      question: 'In a database of 5 transactions, {Beer} appears in 3. What is its relative support?',
      options: ['60%', '30%', '3%', '75%'],
      correctIndex: 0,
      explanation: 'Relative support is the fraction of transactions containing the itemset: 3/5 = 60%.',
    },
    {
      id: 'c4-q2', topic: 'Confidence', difficulty: 'easy', skill: 'technical',
      question: 'sup{Diaper} = 4 and sup{Diaper, Beer} = 3. What is the confidence of Diaper → Beer?',
      options: ['75%', '60%', '100%', '80%'],
      correctIndex: 0,
      explanation: 'c = sup(X, Y) / sup(X) = 3 / 4 = 75%.',
    },
    {
      id: 'c4-q3', topic: 'Confidence', difficulty: 'medium', skill: 'concept',
      question: 'Why can X → Y and Y → X have different confidence but the same support?',
      options: ['Support uses transactions containing both, but confidence divides by the support of the rule\'s left side', 'Support depends on item order', 'Confidence ignores X entirely', 'The two rules involve different items'],
      correctIndex: 0,
      explanation: 'Both rules have the same X ∪ Y, so the same support. Confidence is sup(X, Y) / sup(left side), which can differ.',
    },
    {
      id: 'c4-q4', topic: 'Frequent patterns', difficulty: 'medium', skill: 'technical',
      question: 'T1 = {a1, …, a50} and T2 = {a1, …, a100}, with minsup = 1. How many frequent itemsets exist?',
      options: ['2^{100} − 1', '100', '150', '2^{50}'],
      correctIndex: 0,
      explanation: 'All non-empty subsets of the 100 items are frequent, so the total is 2^{100} − 1.',
    },
    {
      id: 'c4-q5', topic: 'Closed patterns', difficulty: 'medium', skill: 'definition',
      question: 'A frequent itemset X is closed when:',
      options: ['No super-pattern of X has the same support as X', 'No super-pattern of X is frequent', 'X appears in every transaction', 'X contains only one item'],
      correctIndex: 0,
      explanation: 'Closed is about equal support among super-patterns. "No frequent super-pattern" defines a max-pattern.',
    },
    {
      id: 'c4-q6', topic: 'Closed patterns', difficulty: 'hard', skill: 'analysis',
      question: 'T1 = {a, b, c}, T2 = {a, b}, T3 = {a, c}, T4 = {b, c}, with minsup = 2. Which itemsets are maximal frequent?',
      options: ['{a, b}, {a, c}, {b, c}', '{a, b, c} only', '{a}, {b}, {c}', 'All six frequent itemsets'],
      correctIndex: 0,
      explanation: '{a, b, c} has support 1, so it is not frequent. The three 2-itemsets each have support 2, with no frequent superset.',
    },
    {
      id: 'c4-q7', topic: 'Compression', difficulty: 'medium', skill: 'comparison',
      question: 'Why is mining closed patterns often preferred to mining max-patterns?',
      options: ['Closed patterns keep support information, while max-patterns lose the exact support of sub-patterns', 'Max-patterns always return more patterns', 'Closed patterns need no threshold', 'Max-patterns work only on numeric data'],
      correctIndex: 0,
      explanation: 'Closed patterns are lossless. From max-patterns we know a subset is frequent, but not its real support.',
    },
    {
      id: 'c4-q8', topic: 'Downward closure', difficulty: 'easy', skill: 'concept',
      question: 'If {beer, diaper, nuts} is frequent, what must be true?',
      options: ['{beer, diaper} is also frequent', '{beer, diaper, nuts, milk} is also frequent', '{milk} is infrequent', 'Its confidence is 100%'],
      correctIndex: 0,
      explanation: 'Any subset of a frequent itemset must be frequent, because every transaction containing the larger set contains the subset.',
    },
    {
      id: 'c4-q9', topic: 'Apriori', difficulty: 'medium', skill: 'technical',
      question: 'F3 = {abc, abd, acd, ace, bcd}. What is C4 after self-join and pruning?',
      options: ['{abcd}', '{abcd, acde}', '{acde}', '{abcd, bcde}'],
      correctIndex: 0,
      explanation: 'Self-join gives abcd and acde. acde is pruned because its subset ade is not in F3.',
    },
    {
      id: 'c4-q10', topic: 'Apriori', difficulty: 'medium', skill: 'application',
      question: 'During self-join, why is the condition p.item(k−1) < q.item(k−1) used?',
      options: ['To avoid generating the same candidate twice', 'To remove infrequent items from the database', 'To sort transactions by frequency', 'To compute the confidence of each rule'],
      correctIndex: 0,
      explanation: 'It allows join(abc, abd) and rejects join(abd, abc), so each candidate is created once.',
    },
    {
      id: 'c4-q11', topic: 'Apriori', difficulty: 'hard', skill: 'scenario',
      question: 'With minsup = 2, the candidate {A, C, E} has the 2-itemset {A, E} with support 1. What does Apriori do?',
      options: ['Prunes {A, C, E} without counting it in the database', 'Counts {A, C, E} in the next scan anyway', 'Lowers minsup to 1', 'Restarts the algorithm from 1-itemsets'],
      correctIndex: 0,
      explanation: 'An infrequent subset means the candidate cannot be frequent, so it is pruned before the costly database test.',
    },
    {
      id: 'c4-q12', topic: 'FP-growth', difficulty: 'easy', skill: 'comparison',
      question: 'What is the main methodological difference between Apriori and FP-growth?',
      options: ['Apriori is breadth-first with candidate generation, while FP-growth is depth-first without it', 'Apriori works only on sequences', 'FP-growth requires no minimum support', 'FP-growth scans the database once per candidate'],
      correctIndex: 0,
      explanation: 'FP-growth was motivated by replacing level-wise candidate generation and test with depth-first pattern growth.',
    },
    {
      id: 'c4-q13', topic: 'FP-growth', difficulty: 'medium', skill: 'technical',
      question: 'Frequent items are f:4, c:4, a:3, b:3, m:3, p:3. A transaction contains {a, f, c, e, l, p, m, n}. What is its ordered frequent list?',
      options: ['f, c, a, m, p', 'a, f, c, e, l, p, m, n', 'p, m, a, c, f', 'f, c, a, b, m, p'],
      correctIndex: 0,
      explanation: 'Drop infrequent items (e, l, n), and order the rest by the f-list f-c-a-b-m-p. Item b is not in this transaction.',
    },
    {
      id: 'c4-q14', topic: 'FP-growth', difficulty: 'hard', skill: 'analysis',
      question: 'For min_support = 3, item m has the conditional database fca:2, fcab:1. Why is its conditional FP-tree fca:3, with no b?',
      options: ['b has count 1 in this conditional database, below min_support, while f, c, and a each have count 3', 'b is the rarest item in the entire database', 'Conditional trees keep only three items', 'b appears after m in the f-list'],
      correctIndex: 0,
      explanation: 'Counts within the conditional database decide what stays: f, c, and a have 3, and b has only 1.',
    },
    {
      id: 'c4-q15', topic: 'FP-growth', difficulty: 'medium', skill: 'concept',
      question: 'If a conditional FP-tree has only a single path, what happens?',
      options: ['All combinations of its sub-paths can be generated as frequent patterns directly', 'Mining fails and must restart', 'Only the full path is frequent', 'The tree must be split with Apriori'],
      correctIndex: 0,
      explanation: 'A single path generates all the combinations of its sub-paths, each of which is a frequent pattern.',
    },
    {
      id: 'c4-q16', topic: 'Scaling', difficulty: 'medium', skill: 'comparison',
      question: 'How does parallel projection compare with partition projection?',
      options: ['Parallel projects on each frequent item and is space-costly, while partition passes unprocessed parts to later partitions', 'Parallel needs less space, while partition must project every item fully', 'Both are the same technique', 'Partition can be used only when the FP-tree fits in memory'],
      correctIndex: 0,
      explanation: 'Parallel projection allows all partitions to be processed in parallel at a cost in space. Partition projection works in order and passes along what is left.',
    },
    {
      id: 'c4-q17', topic: 'Lift', difficulty: 'medium', skill: 'technical',
      question: 's(A) = 0.5, s(B) = 0.4, and s(A ∪ B) = 0.3. What is lift(A, B), and what does it show?',
      options: ['1.5, positive correlation', '0.6, negative correlation', '0.75, negative correlation', '1.0, independence'],
      correctIndex: 0,
      explanation: 'lift = 0.3 / (0.5 × 0.4) = 0.3 / 0.2 = 1.5, which is above 1.',
    },
    {
      id: 'c4-q18', topic: 'Support-confidence limits', difficulty: 'hard', skill: 'scenario',
      question: 'A rule has confidence 66.7%, but 75% of all transactions contain its right side. What should you conclude?',
      options: ['The rule is misleading, because the left side lowers the chance of the right side', 'The rule is strong and should be used because it passes thresholds', 'The two sides are independent', 'The support must be calculated incorrectly'],
      correctIndex: 0,
      explanation: 'Confidence below the overall probability of the right side means lift is below 1. This is the basketball and cereal lesson.',
    },
    {
      id: 'c4-q19', topic: 'Chi-square', difficulty: 'medium', skill: 'technical',
      question: 'In a contingency table, the row total is 750, the column total is 600, and the grand total is 1000. What is the expected value of that cell?',
      options: ['450', '400', '600', '750'],
      correctIndex: 0,
      explanation: 'Expected = 750 × 600 / 1000 = 450.',
    },
    {
      id: 'c4-q20', topic: 'Null-invariance', difficulty: 'hard', skill: 'analysis',
      question: 'A supermarket has millions of baskets, and most contain neither milk nor coffee. Which measure choice is best for their association?',
      options: ['Kulczynski with the Imbalance Ratio, because null transactions do not affect it', 'Lift alone, because it is above 1', 'Chi-square alone, because it grows with data size', 'Support alone, because it counts all baskets'],
      correctIndex: 0,
      explanation: 'Lift and chi-square are not null-invariant. When null transactions are predominant, use null-invariant measures, and IR reports imbalance.',
    },
  ],

  written: [
    {
      id: 'c4-w1', format: 'short', topic: 'Support and confidence',
      prompt: 'What do support and confidence measure?',
      shortAnswer: 'Support measures how often an itemset occurs in the data. Confidence measures how often transactions containing X also contain Y.',
      detailedAnswer: ['Support of X → Y is the fraction of transactions containing both X and Y. Confidence is sup(X, Y) / sup(X), a conditional probability. These metrics together capture the popularity and correlation of X and Y.'],
    },
    {
      id: 'c4-w2', format: 'short', topic: 'Downward closure',
      prompt: 'Why does the downward closure property hold?',
      shortAnswer: 'Every transaction containing an itemset also contains all its subsets, so a subset\'s support is at least as high.',
      detailedAnswer: ['If {beer, diaper, nuts} appears in a transaction, then {beer, diaper} appears there too. So a subset of a frequent itemset cannot have a lower support. Conversely, if any subset is infrequent, the itemset cannot be frequent.'],
    },
    {
      id: 'c4-w3', format: 'short', topic: 'Null-invariance',
      prompt: 'Why is null-invariance important?',
      shortAnswer: 'In massive transaction data, most transactions contain neither item, and this should not change how we judge the relationship between the two items.',
      detailedAnswer: ['Null cases are predominant in large data sets: neither milk nor coffee is in most baskets. Lift and chi-square change with null transactions, so they can give misleading results. Null-invariant measures do not.'],
    },
    {
      id: 'c4-w4', format: 'definition', topic: 'Patterns',
      prompt: 'Define a **max-pattern**.',
      shortAnswer: 'A frequent pattern X with no frequent super-pattern.',
      detailedAnswer: ['Max-patterns are a lossy compression. We know all the sub-patterns are frequent, but not their exact support.'],
    },
    {
      id: 'c4-w5', format: 'definition', topic: 'FP-growth',
      prompt: 'What term describes "the transformed prefix paths of an item, under the condition that the item exists"?',
      shortAnswer: 'The item\'s conditional database, also called its conditional pattern base.',
      detailedAnswer: ['For example, p\'s conditional database is fcam:2, cb:1. Mining partitions by item in this way is the divide-and-conquer idea of FP-growth.'],
    },
    {
      id: 'c4-w6', format: 'matching', topic: 'Terms',
      prompt: 'Match each term with its definition.',
      pairs: [
        { term: 'Closed pattern', definition: 'Frequent, with no super-pattern of the same support.' },
        { term: 'Max-pattern', definition: 'Frequent, with no frequent super-pattern.' },
        { term: 'Null transaction', definition: 'Contains neither of the items being analyzed.' },
        { term: 'FP-tree', definition: 'Stores ordered frequent items with shared prefixes merged and counts accumulated.' },
        { term: 'Relative support', definition: 'Fraction of transactions containing an itemset.' },
      ],
      shortAnswer: 'Closed: same support test. Max: frequent test. Null: neither item. FP-tree: merged prefixes. Relative support: fraction.',
      detailedAnswer: ['The difference between closed and max-patterns lies in the test on super-patterns, equal support versus being frequent.'],
    },
    {
      id: 'c4-w7', format: 'matching', topic: 'Measures',
      prompt: 'Match each lift or Kulc result with its interpretation.',
      pairs: [
        { term: 'Lift = 1', definition: 'The items are independent.' },
        { term: 'Lift > 1', definition: 'The items are positively correlated.' },
        { term: 'Lift < 1', definition: 'The items are negatively correlated.' },
        { term: 'IR = 0', definition: 'The two directional relationships are balanced.' },
        { term: 'IR near 1', definition: 'The two directional relationships are highly imbalanced.' },
      ],
      shortAnswer: 'Lift 1: independent. Above 1: positive. Below 1: negative. IR 0: balanced. IR near 1: imbalanced.',
      detailedAnswer: ['For example, data sets D4, D5, and D6 can all have Kulc 0.5, but with IR values of 0, 0.89, and 0.99.'],
    },
    {
      id: 'c4-w8', format: 'compare', topic: 'Closed and max-patterns',
      prompt: 'Compare **closed patterns** and **max-patterns**.',
      shortAnswer: 'Closed patterns are lossless: no super-pattern has the same support. Max-patterns are lossy: no super-pattern is frequent.',
      detailedAnswer: ['For T1 = {a1, …, a50} and T2 = {a1, …, a100} with minsup = 1, there are two closed patterns and one max-pattern. Closed patterns let us recover that {a2, …, a40} has support 2. The max-pattern tells us only that it is frequent.'],
      answerTable: {
        headers: ['Aspect', 'Closed', 'Max'],
        rows: [
          ['Test', 'No super-pattern with equal support', 'No frequent super-pattern'],
          ['Compression', 'Lossless', 'Lossy'],
          ['Example count', '2', '1'],
        ],
      },
    },
    {
      id: 'c4-w9', format: 'compare', topic: 'Algorithms',
      prompt: 'Compare **Apriori** and **FP-growth**.',
      shortAnswer: 'Apriori searches breadth-first, generating and testing candidates over repeated scans. FP-growth searches depth-first using an FP-tree with no candidate generation.',
      detailedAnswer: ['Apriori relies on downward closure to prune candidates level by level. FP-growth partitions by pattern and recursively mines conditional databases, confining the search to relevant transactions.'],
      answerTable: {
        headers: ['Aspect', 'Apriori', 'FP-growth'],
        rows: [
          ['Search', 'Breadth-first', 'Depth-first'],
          ['Candidates', 'Generated and tested', 'None generated'],
          ['Key structure', 'Candidate sets', 'FP-tree'],
        ],
      },
    },
    {
      id: 'c4-w10', format: 'fill-blank', topic: 'Apriori',
      prompt: 'Complete the steps of candidate generation.',
      sentence: 'Apriori generates candidates in two steps: ___ and ___.',
      blanks: [['self-joining', 'self-join', 'joining', 'join'], ['pruning', 'prune']],
      shortAnswer: 'Self-joining; pruning.',
      detailedAnswer: ['Self-joining combines frequent k-itemsets sharing their first k−1 items. Pruning removes any candidate with an infrequent subset.'],
    },
    {
      id: 'c4-w11', format: 'fill-blank', topic: 'Lift',
      prompt: 'Complete the lift formula and its interpretation.',
      sentence: 'lift(B, C) = s(B ∪ C) / (s(B) × ___). A value below ___ means B and C are negatively correlated.',
      blanks: [['s(C)'], ['1', 'one']],
      shortAnswer: 's(C); 1.',
      detailedAnswer: ['Lift compares the observed co-occurrence with what independence would predict. A value of exactly 1 means independence.'],
    },
    {
      id: 'c4-w12', format: 'list', topic: 'Apriori',
      prompt: 'List the steps of the Apriori algorithm.',
      shortAnswer: 'Scan for frequent 1-itemsets, then repeatedly generate (k+1) candidates, test them against the database, increment k, stop when none remain, and return all frequent itemsets.',
      detailedAnswer: ['Each level needs a database scan to count candidates. Generation uses self-join and prune.'],
    },
    {
      id: 'c4-w13', format: 'list', topic: 'Interestingness',
      prompt: 'List the five null-invariant measures covered in this chapter.',
      shortAnswer: 'AllConf, Jaccard, Cosine, Kulczynski, and MaxConf.',
      detailedAnswer: ['All five have the range [0, 1], and they are essentially min, max, and mean variants of p = P(B|A) and q = P(A|B). They can disagree on imbalanced data sets such as D4 to D6.'],
    },
    {
      id: 'c4-w14', format: 'explain', topic: 'Support-confidence limits',
      prompt: 'Using the basketball and cereal example, explain the limitation of the support-confidence framework.',
      shortAnswer: 'play-basketball → eat-cereal [40%, 66.7%] passes the thresholds, but 75% of all students eat cereal, so playing basketball actually lowers the likelihood.',
      detailedAnswer: [
        'With minsup 30% and minconf 60%, the rule appears strong. But its confidence, 66.7%, is below the overall 75% cereal rate.',
        'The more telling rule is ¬basketball → cereal [35%, 87.5%]. Lift confirms this: lift(B, C) = 0.89 and lift(¬B, C) = 1.17.',
        'Support and confidence do not compare a rule with the base rate of its right side.',
      ],
    },
    {
      id: 'c4-w15', format: 'explain', topic: 'FP-growth',
      prompt: 'Explain how FP-growth mines patterns recursively.',
      shortAnswer: 'It partitions the database by each frequent item, builds a conditional FP-tree for each partition, and recurses until the tree is empty or a single path.',
      detailedAnswer: [
        'First it finds frequent single items and partitions the database based on each one. For each item, its conditional database comes from the prefix paths in the FP-tree.',
        'A conditional FP-tree keeps only items that meet the threshold, and mining repeats on it. A single-path tree generates all the combinations of its sub-paths, each a frequent pattern.',
      ],
    },
    {
      id: 'c4-w16', format: 'scenario', topic: 'Measures',
      prompt: 'Given s(A) = 0.5, s(B) = 0.4, s(A ∪ B) = 0.3, calculate the confidence of A → B, lift, Kulczynski, and IR.',
      shortAnswer: 'Confidence 0.6, lift 1.5, Kulc 0.675, and IR 0.167.',
      detailedAnswer: [
        'Confidence(A → B) = 0.3 / 0.5 = 0.6. Lift = 0.3 / (0.5 × 0.4) = 1.5.',
        'Kulc = ½ (0.3/0.5 + 0.3/0.4) = ½ (0.6 + 0.75) = 0.675.',
        'IR = |0.5 − 0.4| / (0.5 + 0.4 − 0.3) = 0.1 / 0.6 = 0.167, which indicates a fairly balanced relationship.',
      ],
    },
    {
      id: 'c4-w17', format: 'scenario', topic: 'Closed and maximal patterns',
      prompt: 'T1 = {a, b, c}, T2 = {a, b}, T3 = {a, c}, T4 = {b, c}, with minsup = 2. Find the frequent, closed, and maximal itemsets.',
      shortAnswer: 'Frequent and closed: {a}, {b}, {c}, {a, b}, {a, c}, {b, c}. Maximal: {a, b}, {a, c}, {b, c}.',
      detailedAnswer: [
        'Each single item has support 3, each pair has support 2, and {a, b, c} has support 1, so it is not frequent.',
        'Each single item (3) has more support than its pairs (2), so it is closed. Each pair has only the infrequent {a, b, c} (support 1) above it, so it is closed and also maximal.',
      ],
    },
    {
      id: 'c4-w18', format: 'scenario', topic: 'Choosing measures',
      prompt: 'A data set shows Lift(B, C) = 8.44, yet BC occurs 100 times while B¬C and ¬BC occur 1000 times each, and there are 100,000 null transactions. How do you interpret this?',
      shortAnswer: 'The high lift is caused by the many null transactions and is misleading. B and C rarely occur together, so use a null-invariant measure.',
      detailedAnswer: [
        'Given B, the probability of C is only 100/1100. The large number of ¬B¬C transactions inflates lift and chi-square (χ^{2} = 670).',
        'A null-invariant measure such as Kulc gives ½ (100/1100 + 100/1100) = 0.09, which correctly shows a weak association.',
      ],
    },
  ],
}

export default chapter
