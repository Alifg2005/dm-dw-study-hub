import type { Chapter } from '../../types/chapter'

const chapter: Chapter = {
  meta: {
    number: 6,
    slug: 'chapter-06',
    title: 'Classification: Basic Concepts',
    description:
      'Decision trees, Naive Bayes, k-Nearest Neighbors, case-based reasoning, linear and logistic regression, gradient descent, and evaluating classifiers.',
    examScope: 'midterm',
  },

  overview: [
    '**Classification** builds a model from labeled training data and uses it to assign categorical labels to new data. This chapter introduces several ways of doing that: decision trees, Bayes classification, lazy learners, and linear classifiers.',
    'It then asks how we know whether a model is any good, using confusion matrices and metrics, holdout and cross-validation, and ROC curves. The summary makes one point clear: no single method is superior for all data sets.',
  ],

  objectives: [
    'Distinguish supervised from unsupervised learning, and classification from numeric prediction.',
    'Describe the stages of model construction, validation, testing, and deployment.',
    'Build a decision tree using entropy, conditional entropy, and information gain.',
    'Explain gain ratio, and handle continuous attributes.',
    'Apply Bayes\' theorem and Naive Bayes, including the Laplacian correction.',
    'Contrast eager and lazy learning, and apply k-NN and case-based reasoning.',
    'Explain linear regression, logistic regression, gradient descent, and the learning rate.',
    'Calculate accuracy, error rate, sensitivity, specificity, precision, recall, and F1.',
    'Explain underfitting and overfitting, holdout, cross-validation, and ROC curves.',
  ],

  keyConcepts: [
    { term: 'Generalization', summary: 'The goal is good performance on new records, not merely on the training data.' },
    { term: 'Reducing uncertainty', summary: 'Decision trees choose the split that removes the most uncertainty about the class.' },
    { term: 'Prior plus evidence', summary: 'Bayes\' theorem updates what was previously known in light of new evidence.' },
    { term: 'Similar records, similar outputs', summary: 'Instance-based methods predict from the stored records most like the new one.' },
    { term: 'Score to probability to class', summary: 'Logistic regression computes a score, applies the sigmoid, and then applies a threshold.' },
    { term: 'Beyond accuracy', summary: 'With imbalanced classes, accuracy can look high while the rare class is missed.' },
  ],

  definitions: [
    { term: 'Supervised learning', definition: 'Learning from training data accompanied by class labels. New data is classified with the resulting model.' },
    { term: 'Unsupervised learning', definition: 'Class labels of training data are unknown. The aim is to establish the existence of classes or clusters.' },
    { term: 'Classification', definition: 'Predicting categorical (discrete or nominal) class labels.' },
    { term: 'Numeric prediction', definition: 'Modeling continuous-valued functions to predict an unknown numeric target.' },
    { term: 'Training set', definition: 'The set of samples used for model construction.' },
    { term: 'Test set', definition: 'Independent labeled samples used to estimate model accuracy.' },
    { term: 'Validation set', definition: 'A test set used to select or refine models. Also called a development set.' },
    { term: 'Entropy', definition: 'A measure of the impurity or uncertainty of the class labels in a node.' },
    { term: 'Conditional entropy', definition: 'The weighted average entropy of the child nodes: the uncertainty remaining after a split.' },
    { term: 'Information gain', definition: 'The reduction in uncertainty produced by a split.' },
    { term: 'Prior probability', definition: 'The probability of a class before observing the evidence.' },
    { term: 'Posterior probability', definition: 'The updated probability of a class after observing the evidence.' },
    { term: 'Eager learning', definition: 'Builds a model during training and uses it to predict new records.' },
    { term: 'Lazy learning', definition: 'Stores the training records, with most of the work happening when a new record must be predicted.' },
    { term: 'Learning rate', definition: 'Controls how large the parameter updates are during gradient descent.' },
    { term: 'Overfitting', definition: 'The model is too complex and fits details and noise specific to the training data. Training error stays low while validation error rises.' },
    { term: 'Underfitting', definition: 'The model is too simple and misses important patterns. Training and validation errors are both high.' },
    { term: 'AUC', definition: 'Area Under the ROC Curve, summarizing a model\'s ability to distinguish between two classes.' },
  ],

  sections: [
    {
      id: 'basic-concepts',
      title: 'Classification basics',
      blocks: [
        {
          type: 'flow',
          steps: [
            { label: 'Model construction', detail: 'Train on labeled samples. The model may be a tree, rules, or formulas.' },
            { label: 'Validation and testing', detail: 'Compare known labels with predictions, on an independent test set.' },
            { label: 'Deployment', detail: 'If accuracy is acceptable, classify new data.' },
          ],
        },
        {
          type: 'paragraph',
          text: 'The method assumes that each sample belongs to a predefined class. **Accuracy** is the percentage of test samples classified correctly. If the test set is used to select or refine models, it is called a **validation** (or development) set.',
        },
      ],
    },
    {
      id: 'decision-trees',
      title: 'Decision tree induction',
      blocks: [
        {
          type: 'list',
          title: 'Basic algorithm',
          items: [
            'Build top-down, recursively, by divide and conquer, starting with all training examples at the root.',
            'Partition examples recursively on selected attributes.',
            'Select each attribute with a heuristic or statistical measure, such as information gain or Gini index.',
            'Predict at a leaf by majority voting.',
          ],
        },
        {
          type: 'list',
          title: 'Stop partitioning when',
          items: ['All samples at a node belong to the same class', 'No attributes remain for further partitioning', 'No samples are left'],
        },
        {
          type: 'table',
          table: {
            caption: 'Play Golf: the training data used throughout this chapter',
            headers: ['Outlook', 'Temp', 'Humidity', 'Windy', 'Play Golf'],
            rows: [
              ['Rainy', 'Hot', 'High', 'False', 'No'],
              ['Rainy', 'Hot', 'High', 'True', 'No'],
              ['Overcast', 'Hot', 'High', 'False', 'Yes'],
              ['Sunny', 'Mild', 'High', 'False', 'Yes'],
              ['Sunny', 'Cool', 'Normal', 'False', 'Yes'],
              ['Sunny', 'Cool', 'Normal', 'True', 'No'],
              ['Overcast', 'Cool', 'Normal', 'True', 'Yes'],
              ['Rainy', 'Mild', 'High', 'False', 'No'],
              ['Rainy', 'Cool', 'Normal', 'False', 'Yes'],
              ['Sunny', 'Mild', 'Normal', 'False', 'Yes'],
              ['Rainy', 'Mild', 'Normal', 'True', 'Yes'],
              ['Overcast', 'Mild', 'High', 'True', 'Yes'],
              ['Overcast', 'Hot', 'Normal', 'False', 'Yes'],
              ['Sunny', 'Mild', 'High', 'True', 'No'],
            ],
          },
        },
        { type: 'formula', label: 'Entropy before the split', expression: 'H(D) = − Σ p_{i} log_{2}(p_{i})', note: 'p_{i} is the probability a tuple belongs to class C_{i}, estimated by |C_{i,D}| / |D|.' },
        { type: 'formula', label: 'Conditional entropy after splitting on A', expression: 'H(D|A) = Σ (|D_{j}| / |D|) × H(D_{j})' },
        { type: 'formula', label: 'Information gain', expression: 'Gain(A) = H(D) − H(D|A)', note: 'Select the attribute with the highest gain. Used in ID3 and C4.5.' },
        {
          type: 'paragraph',
          text: 'Higher entropy means higher uncertainty. A node of 4 Pass and 4 Fail has entropy 1, and a pure node has entropy 0.',
        },
        {
          type: 'paragraph',
          text: '**Gain ratio** fixes a bias: information gain favors attributes with many values. A Student ID would give one pure branch per student, but would not help predict new cases. Gain ratio normalizes gain by how broadly the data are divided.',
        },
        { type: 'formula', label: 'Split information', expression: 'SplitInfo_{A}(D) = − Σ (|D_{j}| / |D|) × log_{2}(|D_{j}| / |D|)' },
        { type: 'formula', label: 'Gain ratio', expression: 'GainRatio(A) = Gain(A) / SplitInfo_{A}(D)' },
        {
          type: 'list',
          title: 'Handling continuous attributes',
          items: [
            '**Method 1:** discretize values and treat them as categorical, such as age < 20, 20..30, 30..40, 40..50, > 50.',
            '**Method 2:** sort the values, consider midpoints (a_{i} + a_{i+1}) / 2 as split points, and choose the one with maximum information gain. Then split into A ≤ P and A > P.',
          ],
        },
      ],
    },
    {
      id: 'bayes',
      title: 'Bayes classification',
      blocks: [
        { type: 'formula', label: 'Bayes\' theorem', expression: 'P(C|X) = P(X|C) P(C) / P(X)', note: 'Posterior = likelihood × prior / evidence.' },
        {
          type: 'paragraph',
          text: 'P(X) is the same for every class, so for classification we compare only likelihood × prior, and assign the class with the highest posterior.',
        },
        { type: 'formula', label: 'Single-feature example from the Play Golf data', expression: 'P(Yes | Sunny) = P(Sunny | Yes) P(Yes) / P(Sunny) = (3/9 × 9/14) / (5/14) = 0.60', note: 'Likewise, P(No | Sunny) = (2/5 × 5/14) / (5/14) = 0.40.' },
        { type: 'formula', label: 'Naive Bayes', expression: 'P(C|X) ∝ P(C) × P(x_{1}|C) × P(x_{2}|C) × … × P(x_{n}|C)', note: 'Multiplies the likelihood of each feature, assuming the features are independent given the class.' },
        {
          type: 'paragraph',
          text: 'The **zero-probability problem**: if one conditional probability is zero, the whole product is zero. The **Laplacian correction** adds 1 (or a small integer) to each case. With 1,000 tuples where income is low (0), medium (990), and high (10), the estimates become 1/1003, 991/1003, and 11/1003, which are close to the uncorrected values.',
        },
        {
          type: 'list',
          title: 'Strengths and weaknesses',
          items: [
            '**Strengths:** fast and simple (mostly counting), often as accurate as decision trees, and it learns as it goes, as each new example updates the counts.',
            '**Weakness:** it assumes clues are unrelated, which is rarely true. Fever and cough often appear together. The source names Bayesian Belief Networks (Chapter 7) as the fix.',
          ],
        },
      ],
    },
    {
      id: 'lazy-learners',
      title: 'Lazy learners: k-NN and CBR',
      blocks: [
        {
          type: 'paragraph',
          text: 'Instance-based methods assume similar records have similar outputs. **k-Nearest Neighbors** represents records as points and compares distances. **Case-Based Reasoning** retrieves similar cases and adapts their solutions.',
        },
        {
          type: 'list',
          title: 'k-NN steps',
          ordered: true,
          items: [
            'Choose the number of neighbors, k.',
            'Calculate the distance from the new record to every training record, commonly using Euclidean distance.',
            'Select the k closest records.',
            'Predict the most common class (classification), or the average value (numeric prediction).',
          ],
        },
        {
          type: 'table',
          table: {
            caption: 'Selecting k',
            headers: ['', 'Small k', 'Large k'],
            rows: [
              ['Focus', 'Records very close to the new one', 'A wider group of records'],
              ['Risk', 'Affected by noise, may overfit', 'May ignore local patterns, may underfit'],
              ['Boundary', 'Complex', 'Smoother'],
            ],
          },
        },
        {
          type: 'paragraph',
          text: 'Choose k by testing several values on validation data. For binary classification, an odd k can reduce ties. **Normalize features first**, or a feature in thousands, such as salary, can dominate one measured from 1 to 5.',
        },
        { type: 'formula', label: 'Distance-weighted k-NN', expression: 'w = 1 / d^{2}', note: 'Closer neighbors get more influence.' },
        {
          type: 'list',
          title: 'k-NN strengths and weaknesses',
          items: [
            '**Strengths:** simple, works for classification and numeric prediction, makes no strong assumptions about data shape, and several neighbors can reduce the effect of noisy records.',
            '**Weaknesses:** prediction can be slow with large training sets, results depend on the distance measure and scaling, irrelevant features mislead, and high-dimensional data may have no clearly near neighbors.',
          ],
        },
        {
          type: 'flow',
          steps: [
            { label: 'Retrieve', detail: 'A similar previous case' },
            { label: 'Reuse', detail: 'Its solution' },
            { label: 'Revise', detail: 'The solution when necessary' },
            { label: 'Retain', detail: 'The new experience' },
          ],
        },
        {
          type: 'paragraph',
          text: 'A **CBR** example: a customer\'s printer is connected but does not print, so the system retrieves similar support cases and adapts what worked before. Its main challenge is deciding which previous cases are truly similar.',
        },
      ],
    },
    {
      id: 'linear-classifiers',
      title: 'Linear and logistic regression',
      blocks: [
        { type: 'formula', label: 'Linear regression, one input', expression: 'ŷ = b + wx', note: 'w is the slope and b is the intercept (the prediction when x is zero).' },
        { type: 'formula', label: 'Least squares error', expression: 'L(w, b) = Σ (y_{i} − b − wx_{i})^{2}', note: 'Sums the squared differences between actual and predicted values.' },
        {
          type: 'paragraph',
          text: '**Logistic regression**, despite its name, is a classification method. For binary classification, it estimates the probability of one of two outcomes, in two stages.',
        },
        {
          type: 'flow',
          steps: [
            { label: 'Compute a score', detail: 'z = b + w_{1}x_{1} + w_{2}x_{2} + … + w_{n}x_{n}' },
            { label: 'Apply the sigmoid', detail: 'An S-shaped curve maps z to a value between 0 and 1' },
            { label: 'Apply a threshold', detail: 'At 0.5: probability ≥ 0.5 means Pass, otherwise Fail' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Training adjusts weights so that probabilities match the known outcomes: high for students who passed and low for those who failed. A **loss function** measures how poorly they match.',
        },
        {
          type: 'list',
          title: 'Gradient descent',
          ordered: true,
          items: [
            'Start with initial parameter values.',
            'Measure the model\'s loss.',
            'Find a direction for adjusting the parameters that reduces loss.',
            'Take a small step and repeat.',
            'Stop when further updates produce little improvement.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The analogy is walking down a foggy mountain: you cannot see the whole landscape, but you can feel which way slopes downward.',
        },
        {
          type: 'table',
          table: {
            caption: 'Effect of the learning rate',
            headers: ['Learning rate', 'Effect'],
            rows: [
              ['Too low', 'Needs many updates before reaching the minimum point'],
              ['Just right', 'Reaches the minimum point swiftly'],
              ['Too high', 'Causes drastic updates that lead to divergent behavior'],
            ],
          },
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Model evaluation and selection',
      blocks: [
        {
          type: 'table',
          table: {
            caption: 'Confusion matrix',
            headers: ['Actual \\ Predicted', 'C', '¬C', 'Total'],
            rows: [
              ['C', 'TP', 'FN', 'P'],
              ['¬C', 'FP', 'TN', 'N'],
              ['Total', 'P′', 'N′', 'All'],
            ],
          },
        },
        {
          type: 'table',
          table: {
            caption: 'Metrics',
            headers: ['Metric', 'Formula', 'Meaning'],
            rows: [
              ['**Accuracy**', '(TP + TN) / All', 'Percentage of test tuples correctly classified'],
              ['**Error rate**', '(FP + FN) / All', '1 − accuracy'],
              ['**Sensitivity (recall)**', 'TP / P', 'True positive recognition rate'],
              ['**Specificity**', 'TN / N', 'True negative recognition rate'],
              ['**Precision**', 'TP / (TP + FP)', 'Exactness: what % labeled positive are actually positive?'],
              ['**Recall**', 'TP / (TP + FN)', 'Completeness: what % of positives were labeled positive?'],
              ['**F1**', '2 × P × R / (P + R)', 'Harmonic mean of precision and recall'],
            ],
          },
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Class imbalance',
          text: 'When one class is rare, as with fraud or HIV-positive cases, accuracy can mislead. Sensitivity and specificity handle this better. There is also often a trade-off: finding more actual positives may mean making more incorrect positive predictions.',
        },
        {
          type: 'list',
          title: 'Estimating accuracy',
          items: [
            '**Holdout:** random partition into independent training (such as 2/3) and test (such as 1/3) sets.',
            '**Repeated random sub-sampling:** repeat holdout k times and average the accuracies.',
            '**k-fold cross-validation:** partition into k mutually exclusive subsets of about equal size. At iteration i, D_{i} is the test set and the others form the training set. k = 10 is most popular.',
            '**Leave-one-out:** k equals the number of tuples, for small data.',
            '**Stratified cross-validation:** each fold has about the same class distribution as the initial data.',
            '**Bootstrap:** named in the source but not covered.',
          ],
        },
        {
          type: 'paragraph',
          text: '**ROC curves** visually compare models, showing the trade-off between true positive rate (TP/P, vertical axis) and false positive rate (FP/N, horizontal axis), by varying the decision threshold. A perfect model has area 1.0. The closer the curve is to the diagonal (area 0.5), the less effective the model is.',
        },
        {
          type: 'callout',
          tone: 'source-note',
          text: 'The chapter\'s first outline lists "Techniques to Improve Classification Accuracy", but later outlines drop it and no slides cover it. That topic is therefore not included here. Check with your instructor if it is examinable.',
        },
      ],
    },
  ],

  comparisons: [
    {
      id: 'supervised-unsupervised',
      title: 'Supervised versus unsupervised learning',
      table: {
        headers: ['Aspect', 'Supervised', 'Unsupervised'],
        rows: [
          ['Labels', 'Training data has class labels', 'Labels unknown'],
          ['Typical task', 'Classification', 'Clustering'],
          ['Goal', 'Classify new data with the model', 'Establish whether classes or clusters exist'],
        ],
      },
    },
    {
      id: 'eager-lazy',
      title: 'Eager versus lazy learning',
      table: {
        headers: ['Aspect', 'Eager', 'Lazy'],
        rows: [
          ['Approach', 'Learn first, predict later', 'Store first, calculate when needed'],
          ['Model', 'Builds a model', 'Uses stored examples'],
          ['Training', 'May take longer', 'Fast'],
          ['Prediction', 'Usually fast', 'Can be slower'],
          ['Examples', 'Decision trees, Naive Bayes', 'k-Nearest Neighbors'],
        ],
      },
    },
    {
      id: 'linear-logistic',
      title: 'Linear versus logistic regression',
      table: {
        headers: ['Aspect', 'Linear regression', 'Logistic regression'],
        rows: [
          ['Main task', 'Numeric prediction', 'Classification'],
          ['Example', 'Predict an exam mark', 'Predict Pass or Fail'],
          ['Model output', 'A numeric value', 'A probability'],
          ['Final prediction', 'Use the predicted number', 'Apply a threshold to the probability'],
          ['Training goal', 'Reduce prediction error', 'Reduce loss in predicted probabilities'],
        ],
      },
    },
    {
      id: 'knn-cbr',
      title: 'k-NN versus case-based reasoning',
      table: {
        headers: ['Aspect', 'k-NN', 'CBR'],
        rows: [
          ['Compares', 'Records, using mathematical distance', 'Richer case descriptions'],
          ['Output', 'Vote or average of neighbors', 'An adapted previous solution'],
        ],
      },
    },
    {
      id: 'fit',
      title: 'Underfitting, good fit, and overfitting',
      table: {
        headers: ['Aspect', 'Underfitting', 'Good fit', 'Overfitting'],
        rows: [
          ['Complexity', 'Too simple', 'Suitable', 'Too complex'],
          ['Behavior', 'Misses important patterns', 'Captures patterns that also apply to new records', 'Fits details and noise of training data'],
          ['Errors', 'Training and validation both high', 'Validation near its lowest point', 'Training low, validation rising'],
        ],
      },
    },
    {
      id: 'tree-pros-cons',
      title: 'Decision tree advantages and disadvantages',
      table: {
        headers: ['Advantages', 'Disadvantages'],
        rows: [
          ['White box, and easy to explain, even to non-experts', 'Unstable and sensitive to noise'],
          ['Easy to implement and efficient', 'Accuracy may not be good enough, depending on the data'],
          ['Tolerates missing data, with no need to normalize', 'Optimal splitting is NP, so greedy algorithms are used'],
          ['Works on various attribute types, and non-parametric', 'Overfitting'],
        ],
      },
    },
  ],

  examples: [
    {
      id: 'c6-ex-gain',
      title: 'Choosing the root attribute: Play Golf',
      scenario: 'D has 14 records with 9 Yes and 5 No. Compare splitting attributes.',
      table: {
        headers: ['Outlook', 'Yes', 'No', 'Entropy'],
        rows: [
          ['Rainy', '2', '3', '0.971'],
          ['Overcast', '4', '0', '0'],
          ['Sunny', '3', '2', '0.971'],
        ],
      },
      steps: [
        'H(D) = −(9/14) log_{2}(9/14) − (5/14) log_{2}(5/14) = 0.940.',
        'H(D|Outlook) = (5/14)(0.971) + (4/14)(0) + (5/14)(0.971) = 0.694.',
        'Gain(Outlook) = 0.940 − 0.694 = 0.246.',
        'Likewise, Gain(Temp) = 0.029, Gain(Humidity) = 0.151, and Gain(Windy) = 0.048.',
      ],
      result: 'Outlook has the highest gain, so it becomes the root. Overcast is pure (Yes). Sunny splits on Windy (gain 0.971), and Rainy splits on Humidity (gain 0.971).',
    },
    {
      id: 'c6-ex-nb',
      title: 'Naive Bayes: classifying a new day',
      scenario: 'Classify Outlook = Rainy, Temp = Cool, Humidity = High, Windy = True, from the same 14 records.',
      table: {
        headers: ['Feature value', 'P(value | Yes)', 'P(value | No)'],
        rows: [
          ['Rainy', '2/9', '3/5'],
          ['Cool', '3/9', '1/5'],
          ['High', '3/9', '4/5'],
          ['True', '3/9', '3/5'],
        ],
      },
      steps: [
        'Priors: P(Yes) = 9/14 and P(No) = 5/14.',
        'Score(Yes) = 9/14 × 2/9 × 3/9 × 3/9 × 3/9 = 0.00529.',
        'Score(No) = 5/14 × 3/5 × 1/5 × 4/5 × 3/5 = 0.02057.',
        'Optionally normalize: 0.00529 / 0.02586 ≈ 0.20 and 0.02057 / 0.02586 ≈ 0.80.',
      ],
      result: 'Predict Play = No, with approximately 80% probability.',
    },
    {
      id: 'c6-ex-bayes',
      title: 'Bayes\' theorem: will it rain?',
      scenario: 'Of 100 days, 10 were rainy, 40 started cloudy, and 5 of the rainy days started cloudy.',
      steps: [
        'P(Rain) = 10%, P(Cloud) = 40%, P(Cloud | Rain) = 5/10 = 50%.',
        'P(Rain | Cloud) = (0.5 × 0.1) / 0.4 = 12.5%.',
        'Intuitive check: 5 of the 40 cloudy mornings became rainy, and 5/40 = 12.5%.',
      ],
      result: 'Seeing clouds raises the probability of rain from 10% to 12.5%.',
    },
    {
      id: 'c6-ex-knn',
      title: 'k-NN prediction with k = 3',
      scenario: 'The three nearest neighbors have been found for two new records.',
      steps: [
        'Classification: neighbors Yes, Yes, No give the most common class, Yes.',
        'Numeric prediction: neighbors 70, 75, 80 give (70 + 75 + 80) / 3 = 75.',
      ],
      result: 'Predict Yes for classification, and 75 for numeric prediction.',
    },
    {
      id: 'c6-ex-metrics',
      title: 'Classifier metrics: cancer data',
      scenario: 'A test on 10,000 records.',
      table: {
        headers: ['Actual \\ Predicted', 'cancer = yes', 'cancer = no', 'Total'],
        rows: [
          ['cancer = yes', '90', '210', '300'],
          ['cancer = no', '140', '9560', '9700'],
          ['Total', '230', '9770', '10000'],
        ],
      },
      steps: [
        'Sensitivity = 90 / 300 = 30%. Specificity = 9560 / 9700 = 98.56%.',
        'Accuracy = (90 + 9560) / 10000 = 96.50%. Error rate = (140 + 210) / 10000 = 3.50%.',
        'Precision = 90 / 230 = 39.13%. Recall = 90 / 300 = 30.00%.',
        'F1 = 2 × 39.13% × 30.00% / (39.13% + 30.00%) = 33.96%.',
      ],
      result: 'Accuracy is 96.50%, yet the model finds only 30% of actual cancer cases. This is why accuracy alone is not enough.',
    },
  ],

  takeaways: [
    'Classification predicts categorical labels. Numeric prediction models continuous values.',
    'Decision trees split greedily on the attribute with the highest gain, and gain ratio reduces the bias toward many-valued attributes.',
    'Naive Bayes compares prior × likelihoods and assumes that features are independent.',
    'k-NN is lazy: it needs k, a distance measure, and normalized features.',
    'Logistic regression is a classifier: score, then sigmoid, then threshold.',
    'Gradient descent reduces loss in small steps, and the learning rate controls the size of those steps.',
    'Use precision, recall, sensitivity, specificity, and F1 when classes are imbalanced.',
    'Select models on unseen data performance, not on training error.',
    'No single method is superior for all data sets.',
  ],

  examNotes: [
    'Practice a full information gain calculation by hand, and keep logs in base 2.',
    'Be careful with Naive Bayes denominators: P(x | C) divides by the class count, such as 9 for Yes and 5 for No.',
    'Do not confuse precision (divide by predicted positives) with recall (divide by actual positives).',
    'Memorize the confusion matrix layout: rows are actual and columns are predicted.',
    'The name "logistic regression" is a trap. It is a classification method.',
    'Know the effect of small and large k, and of low and high learning rates.',
    'Know the CBR cycle: retrieve, reuse, revise, retain.',
    'Recognize overfitting: training error low, validation error rising.',
    'On ROC: perfect is area 1.0, and the diagonal is area 0.5.',
  ],

  mcqs: [
    {
      id: 'c6-q1', topic: 'Basic concepts', difficulty: 'easy', skill: 'comparison',
      question: 'Which task is numeric prediction rather than classification?',
      options: ['Predicting a student\'s exam mark', 'Predicting Pass or Fail', 'Labeling email as spam or not spam', 'Deciding whether to play golf'],
      correctIndex: 0,
      explanation: 'Numeric prediction models continuous values. The others predict categorical labels.',
    },
    {
      id: 'c6-q2', topic: 'Basic concepts', difficulty: 'medium', skill: 'concept',
      question: 'If a test set is used to choose between candidate models, what does the source call it?',
      options: ['A validation (or development) set', 'A training set', 'A deployment set', 'A bootstrap set'],
      correctIndex: 0,
      explanation: 'When a test set is used to select or refine models, it is called a validation or development set.',
    },
    {
      id: 'c6-q3', topic: 'Entropy', difficulty: 'easy', skill: 'technical',
      question: 'What is the entropy of a node with 4 Pass and 4 Fail records?',
      options: ['1', '0', '0.5', '0.918'],
      correctIndex: 0,
      explanation: 'An even split between two classes has maximum uncertainty: −(½) log_{2}(½) − (½) log_{2}(½) = 1.',
    },
    {
      id: 'c6-q4', topic: 'Information gain', difficulty: 'medium', skill: 'technical',
      question: 'H(D) = 1. A split gives children of 2 records with entropy 0 and 6 records with entropy 0.918. What is the gain?',
      options: ['0.311', '0.689', '0.918', '0.082'],
      correctIndex: 0,
      explanation: 'H(D|A) = (2/8)(0) + (6/8)(0.918) = 0.689. Gain = 1 − 0.689 = 0.311.',
    },
    {
      id: 'c6-q5', topic: 'Gain ratio', difficulty: 'medium', skill: 'analysis',
      question: 'Why would splitting on Student ID give high information gain yet be a poor choice?',
      options: ['Each branch is pure, but the split does not help predict new cases', 'Student IDs always contain missing values', 'Numeric attributes cannot be split', 'It gives an entropy of 1 in every branch'],
      correctIndex: 0,
      explanation: 'Information gain is biased toward attributes with many values. Gain ratio normalizes this by considering how broadly the data are divided.',
    },
    {
      id: 'c6-q6', topic: 'Decision trees', difficulty: 'medium', skill: 'technical',
      question: 'Sorted values of a continuous attribute start 15, 18, 21. What are the first two candidate split points?',
      options: ['16.5 and 19.5', '15 and 18', '18 and 21', '33 and 39'],
      correctIndex: 0,
      explanation: 'Split points are midpoints: (15 + 18) / 2 = 16.5 and (18 + 21) / 2 = 19.5.',
    },
    {
      id: 'c6-q7', topic: 'Decision trees', difficulty: 'easy', skill: 'concept',
      question: 'Which is a stated disadvantage of decision trees?',
      options: ['Being unstable and sensitive to noise', 'Requiring all data to be normalized', 'Being impossible to explain to non-experts', 'Working only with one attribute type'],
      correctIndex: 0,
      explanation: 'Trees are unstable, sensitive to noise, and prone to overfitting. The other options contradict their listed advantages.',
    },
    {
      id: 'c6-q8', topic: 'Bayes\' theorem', difficulty: 'medium', skill: 'technical',
      question: 'P(Rain) = 0.1, P(Cloud) = 0.4, and P(Cloud | Rain) = 0.5. What is P(Rain | Cloud)?',
      options: ['12.5%', '5%', '20%', '50%'],
      correctIndex: 0,
      explanation: '(0.5 × 0.1) / 0.4 = 0.125.',
    },
    {
      id: 'c6-q9', topic: 'Naive Bayes', difficulty: 'medium', skill: 'concept',
      question: 'Why can Naive Bayes ignore P(X) when choosing a class?',
      options: ['P(X) is the same for every class, so it does not change the comparison', 'P(X) is always equal to 1', 'P(X) is always zero', 'Features are not used in the calculation'],
      correctIndex: 0,
      explanation: 'The denominator is shared, so comparing likelihood × prior is enough. Dividing by P(X) is only needed for actual posterior probabilities.',
    },
    {
      id: 'c6-q10', topic: 'Naive Bayes', difficulty: 'hard', skill: 'scenario',
      question: 'Income has values low (0), medium (990), and high (10) in 1,000 tuples. After the Laplacian correction, P(income = low) is:',
      options: ['1/1003', '0', '1/1000', '3/1000'],
      correctIndex: 0,
      explanation: 'Add 1 to each of the 3 cases: the count becomes 1 and the total becomes 1003, which avoids a zero that would wipe out the product.',
    },
    {
      id: 'c6-q11', topic: 'Naive Bayes', difficulty: 'hard', skill: 'analysis',
      question: 'Why might Naive Bayes struggle when fever and cough are both features?',
      options: ['It assumes that features are independent given the class, but these often appear together', 'It cannot handle medical data', 'It requires numeric features', 'It builds a very deep tree'],
      correctIndex: 0,
      explanation: 'The naive independence assumption is rarely true. The source names Bayesian Belief Networks as the fix.',
    },
    {
      id: 'c6-q12', topic: 'Lazy learning', difficulty: 'easy', skill: 'comparison',
      question: 'Compared with eager learners, lazy learners typically have:',
      options: ['Fast training and slower prediction', 'Slow training and fast prediction', 'No need to store training data', 'A complete model built in advance'],
      correctIndex: 0,
      explanation: 'Lazy learners store records and do most of their work when a prediction is requested.',
    },
    {
      id: 'c6-q13', topic: 'k-NN', difficulty: 'medium', skill: 'scenario',
      question: 'A k-NN model uses salary (in thousands) and a satisfaction score from 1 to 5, and salary dominates predictions. What should be done?',
      options: ['Normalize the features before calculating distance', 'Increase the learning rate', 'Remove all numeric features', 'Use a larger training set only'],
      correctIndex: 0,
      explanation: 'Without normalization, a feature with large values can dominate the distance, even when it is not more important.',
    },
    {
      id: 'c6-q14', topic: 'k-NN', difficulty: 'medium', skill: 'analysis',
      question: 'What is the likely effect of a very small k?',
      options: ['A complex boundary that is sensitive to noise and may overfit', 'A smooth boundary that may underfit', 'Prediction with no distance calculation', 'Equal weights on all training records'],
      correctIndex: 0,
      explanation: 'Small k depends on very close records, so it is affected by noise. A very large k tends to underfit.',
    },
    {
      id: 'c6-q15', topic: 'Case-based reasoning', difficulty: 'easy', skill: 'technical',
      question: 'What is the correct order of the CBR cycle?',
      options: ['Retrieve, reuse, revise, retain', 'Reuse, retain, retrieve, revise', 'Retain, retrieve, revise, reuse', 'Revise, reuse, retrieve, retain'],
      correctIndex: 0,
      explanation: 'The system retrieves a similar case, reuses its solution, revises it when necessary, and retains the new experience.',
    },
    {
      id: 'c6-q16', topic: 'Logistic regression', difficulty: 'medium', skill: 'concept',
      question: 'What does the sigmoid function do in logistic regression?',
      options: ['Converts any score to a value between 0 and 1', 'Selects the best attribute to split on', 'Finds the k nearest records', 'Sorts records by their class label'],
      correctIndex: 0,
      explanation: 'The S-shaped sigmoid maps the linear score to a probability, which is then compared to a threshold.',
    },
    {
      id: 'c6-q17', topic: 'Gradient descent', difficulty: 'hard', skill: 'analysis',
      question: 'During training, the loss bounces up and away from the minimum on each update. What is the most likely cause?',
      options: ['The learning rate is too high', 'The learning rate is too low', 'The model has too few training epochs', 'The sigmoid threshold is 0.5'],
      correctIndex: 0,
      explanation: 'Too large a learning rate causes drastic updates that lead to divergent behavior. A low rate would be slow but stable.',
    },
    {
      id: 'c6-q18', topic: 'Metrics', difficulty: 'hard', skill: 'technical',
      question: 'TP = 40, FN = 10, FP = 20, TN = 130. What are precision and recall?',
      options: ['Precision 66.67%, recall 80%', 'Precision 80%, recall 66.67%', 'Precision 85%, recall 80%', 'Precision 66.67%, recall 86.67%'],
      correctIndex: 0,
      explanation: 'Precision = 40 / (40 + 20) = 66.67%. Recall = 40 / (40 + 10) = 80%.',
    },
    {
      id: 'c6-q19', topic: 'Overfitting', difficulty: 'medium', skill: 'scenario',
      question: 'As model complexity grows, training error keeps falling, but validation error starts to rise. What is happening?',
      options: ['Overfitting', 'Underfitting', 'A good fit', 'Class imbalance'],
      correctIndex: 0,
      explanation: 'The model is fitting details and noise of the training data. Choose the model with good performance on unseen data.',
    },
    {
      id: 'c6-q20', topic: 'ROC curves', difficulty: 'hard', skill: 'comparison',
      question: 'Model A has AUC 0.95 and model B has AUC 0.55. What should you conclude?',
      options: ['A distinguishes the classes better, while B is close to the ineffective diagonal', 'B is better because its value is closer to 0.5', 'Both are equally effective', 'A has a higher error rate at every threshold, by definition'],
      correctIndex: 0,
      explanation: 'A perfect model has area 1.0. The closer the area is to 0.5, the less effective the model is at distinguishing cases.',
    },
  ],

  written: [
    {
      id: 'c6-w1', format: 'short', topic: 'Entropy',
      prompt: 'What does entropy measure in decision tree induction?',
      shortAnswer: 'The impurity or uncertainty of the class labels in a node.',
      detailedAnswer: ['Higher entropy means higher uncertainty. A node with an even split of two classes has entropy 1, and a pure node has entropy 0. Trees choose splits that reduce it.'],
    },
    {
      id: 'c6-w2', format: 'short', topic: 'Class imbalance',
      prompt: 'Why is accuracy not enough for imbalanced classes?',
      shortAnswer: 'A model can achieve high accuracy by doing well on the majority class while missing the rare positive class.',
      detailedAnswer: ['In the cancer example, accuracy is 96.50% while sensitivity is only 30%. Sensitivity, specificity, precision, and recall reveal what accuracy hides.'],
    },
    {
      id: 'c6-w3', format: 'short', topic: 'Evaluation',
      prompt: 'Why should a model\'s final accuracy be assessed on a separate test set?',
      shortAnswer: 'Because the goal is good performance on unseen data. Training performance alone can hide overfitting.',
      detailedAnswer: ['A model can fit details and noise in the training data, keeping training error low. Only independent data shows whether the patterns also apply to new records.'],
    },
    {
      id: 'c6-w4', format: 'definition', topic: 'Information gain',
      prompt: 'Define **information gain**.',
      shortAnswer: 'The reduction in uncertainty produced by a split: Gain(A) = H(D) − H(D|A).',
      detailedAnswer: ['H(D) is the entropy before splitting, and H(D|A) is the weighted entropy after splitting on A. The attribute with the highest gain is selected, as in ID3 and C4.5.'],
    },
    {
      id: 'c6-w5', format: 'definition', topic: 'Bayes',
      prompt: 'Define **prior** and **posterior** probability.',
      shortAnswer: 'The prior is the probability before seeing evidence. The posterior is the updated probability after seeing it.',
      detailedAnswer: ['In the picnic example, P(Rain) = 10% is the prior and P(Rain | Cloud) = 12.5% is the posterior.'],
    },
    {
      id: 'c6-w6', format: 'matching', topic: 'Metrics',
      prompt: 'Match each metric with its formula.',
      pairs: [
        { term: 'Accuracy', definition: '(TP + TN) / All' },
        { term: 'Sensitivity', definition: 'TP / P' },
        { term: 'Specificity', definition: 'TN / N' },
        { term: 'Precision', definition: 'TP / (TP + FP)' },
        { term: 'Error rate', definition: '(FP + FN) / All' },
      ],
      shortAnswer: 'Accuracy (TP + TN) / All. Sensitivity TP / P. Specificity TN / N. Precision TP / (TP + FP). Error rate (FP + FN) / All.',
      detailedAnswer: ['Recall has the same formula as sensitivity, since TP + FN = P. F1 combines precision and recall as a harmonic mean.'],
    },
    {
      id: 'c6-w7', format: 'matching', topic: 'Methods',
      prompt: 'Match each method with its description.',
      pairs: [
        { term: 'Decision tree', definition: 'Top-down recursive partitioning on selected attributes.' },
        { term: 'Naive Bayes', definition: 'Multiplies the prior by the likelihood of each feature.' },
        { term: 'k-NN', definition: 'Votes or averages among the closest stored records.' },
        { term: 'CBR', definition: 'Retrieves and adapts solutions from previous cases.' },
        { term: 'Logistic regression', definition: 'Applies a sigmoid to a weighted score and uses a threshold.' },
      ],
      shortAnswer: 'Tree: recursive partitioning. Naive Bayes: prior × likelihoods. k-NN: closest records. CBR: adapted cases. Logistic: sigmoid and threshold.',
      detailedAnswer: ['Decision trees, Naive Bayes, and logistic regression are eager, building a model first. k-NN and CBR are lazy instance-based methods.'],
    },
    {
      id: 'c6-w8', format: 'compare', topic: 'Eager and lazy learning',
      prompt: 'Compare **eager** and **lazy** learning.',
      shortAnswer: 'Eager learners build a model during training and predict quickly. Lazy learners store records, train quickly, and do the work at prediction time.',
      detailedAnswer: ['Decision trees and Naive Bayes are eager examples. k-Nearest Neighbors is a lazy example.'],
      answerTable: {
        headers: ['Aspect', 'Eager', 'Lazy'],
        rows: [
          ['Model', 'Built in advance', 'Stored examples'],
          ['Training', 'May take longer', 'Fast'],
          ['Prediction', 'Usually fast', 'Can be slower'],
          ['Example', 'Decision tree', 'k-NN'],
        ],
      },
    },
    {
      id: 'c6-w9', format: 'compare', topic: 'Regression',
      prompt: 'Compare **linear** and **logistic** regression.',
      shortAnswer: 'Linear regression predicts a number and reduces prediction error. Logistic regression outputs a probability, applies a threshold, and reduces loss in probabilities.',
      detailedAnswer: ['Despite its name, logistic regression is a classification method. Both combine inputs using learned weights.'],
      answerTable: {
        headers: ['Aspect', 'Linear', 'Logistic'],
        rows: [
          ['Task', 'Numeric prediction', 'Classification'],
          ['Example', 'Exam mark', 'Pass or Fail'],
          ['Output', 'Numeric value', 'Probability'],
          ['Final step', 'Use the number', 'Apply a threshold'],
        ],
      },
    },
    {
      id: 'c6-w10', format: 'compare', topic: 'Fit',
      prompt: 'Compare **underfitting** and **overfitting**.',
      shortAnswer: 'Underfitting is too simple, with high training and validation errors. Overfitting is too complex, with low training error and rising validation error.',
      detailedAnswer: ['A good fit lies between them, with validation error near its lowest point. Choose the model that performs well on unseen data, not the one with the lowest training error.'],
      answerTable: {
        headers: ['Aspect', 'Underfitting', 'Overfitting'],
        rows: [
          ['Complexity', 'Too simple', 'Too complex'],
          ['Training error', 'High', 'Low'],
          ['Validation error', 'High', 'Rising'],
        ],
      },
    },
    {
      id: 'c6-w11', format: 'fill-blank', topic: 'CBR',
      prompt: 'Complete the CBR cycle.',
      sentence: 'A CBR system will ___ a similar case, ___ its solution, ___ the solution when necessary, and ___ the new experience.',
      blanks: [['retrieve'], ['reuse'], ['revise'], ['retain']],
      shortAnswer: 'Retrieve; reuse; revise; retain.',
      detailedAnswer: ['In the printer example, the system retrieves similar support cases, suggests what worked before, adapts it, and keeps the experience for future use.'],
    },
    {
      id: 'c6-w12', format: 'fill-blank', topic: 'ROC',
      prompt: 'Complete the statement about ROC curves.',
      sentence: 'The vertical axis shows the ___ rate and the horizontal axis shows the ___ rate. A perfect model has an area of ___.',
      blanks: [['true positive', 'TP', 'tpr'], ['false positive', 'FP', 'fpr'], ['1.0', '1']],
      shortAnswer: 'True positive; false positive; 1.0.',
      detailedAnswer: ['Vary the decision threshold, calculate TP/P and FP/N at each one, and plot the point. An area close to 0.5 means the model is ineffective.'],
    },
    {
      id: 'c6-w13', format: 'list', topic: 'Decision trees',
      prompt: 'List the conditions for stopping partitioning in a decision tree.',
      shortAnswer: 'All samples at the node belong to the same class, no attributes remain, or no samples are left.',
      detailedAnswer: ['If attributes run out while a node is still mixed, majority voting classifies the leaf.'],
    },
    {
      id: 'c6-w14', format: 'list', topic: 'Decision trees',
      prompt: 'List four advantages and three disadvantages of decision trees.',
      shortAnswer: 'Advantages: white box, easy to explain, efficient, no normalization needed. Disadvantages: unstable, sensitive to noise, overfitting.',
      detailedAnswer: ['Other advantages: easy to implement, tolerates missing data, works on various attribute types, and non-parametric. Other disadvantages: accuracy may not be good enough, and optimal splitting is NP, so greedy algorithms are used.'],
    },
    {
      id: 'c6-w15', format: 'list', topic: 'Gradient descent',
      prompt: 'List the steps of gradient descent.',
      shortAnswer: 'Start with initial values, measure the loss, find a direction that reduces it, take a small step and repeat, and stop when there is little improvement.',
      detailedAnswer: ['The learning rate sets the size of the steps. Too low is slow, and too high can diverge.'],
    },
    {
      id: 'c6-w16', format: 'explain', topic: 'Cross-validation',
      prompt: 'Explain k-fold cross-validation, and why it is stratified.',
      shortAnswer: 'Partition data into k equal subsets, and use each once as the test set with the rest for training. Stratifying keeps each fold\'s class distribution like the original data.',
      detailedAnswer: [
        'The subsets are mutually exclusive and about equal in size. At iteration i, D_{i} is the test set, and k = 10 is most popular. Leave-one-out sets k to the number of tuples and suits small data.',
        'Stratified folds have about the same class distribution as the initial data, so each fold represents the classes fairly.',
      ],
    },
    {
      id: 'c6-w17', format: 'explain', topic: 'Naive Bayes',
      prompt: 'Explain the zero-probability problem and how it is solved.',
      shortAnswer: 'A single zero conditional probability makes the whole product zero. The Laplacian correction adds a small count to each case.',
      detailedAnswer: [
        'Naive Bayes multiplies conditional probabilities, so each must be non-zero. If income = low never occurs among 1,000 tuples, the score for any sample with low income becomes zero, regardless of its other features.',
        'Adding 1 to each of the three cases gives 1/1003, 991/1003, and 11/1003. The corrected values are close to the uncorrected ones, but no longer zero.',
      ],
    },
    {
      id: 'c6-w18', format: 'scenario', topic: 'Metrics',
      prompt: 'A classifier has TP = 40, FN = 10, FP = 20, TN = 130. Calculate accuracy, specificity, precision, recall, and F1.',
      shortAnswer: 'Accuracy 85%, specificity 86.67%, precision 66.67%, recall 80%, F1 72.73%.',
      detailedAnswer: [
        'All = 200, P = 50, N = 150. Accuracy = 170 / 200 = 85%. Specificity = 130 / 150 = 86.67%.',
        'Precision = 40 / 60 = 66.67%. Recall = 40 / 50 = 80%. F1 = 2 × 0.6667 × 0.8 / (0.6667 + 0.8) = 72.73%.',
      ],
    },
    {
      id: 'c6-w19', format: 'scenario', topic: 'Regression',
      prompt: 'A trained model predicts exam marks as ŷ = 40 + 5x, where x is study hours. Predict the mark for 8 hours, and interpret 5 and 40.',
      shortAnswer: 'ŷ = 80. Each extra hour adds 5 marks, and 40 is the prediction for zero hours.',
      detailedAnswer: ['ŷ = 40 + 5 × 8 = 80. Here 5 is the slope w, showing how much the prediction changes per unit of input, and 40 is the intercept b.'],
    },
    {
      id: 'c6-w20', format: 'scenario', topic: 'Choosing a classifier',
      prompt: 'A bank must give customers a clear reason for each loan decision. Which method from this chapter suits this best, and why?',
      shortAnswer: 'A decision tree, because it is a white box that is easy to explain, even to non-experts.',
      detailedAnswer: ['The path from root to leaf is a readable series of conditions. The bank must still watch for its weaknesses, instability and overfitting, and evaluate it on separate test data. The source notes no single method is best for all data sets.'],
    },
  ],
}

export default chapter
