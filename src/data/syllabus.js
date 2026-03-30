export const SYLLABUS = [
  {
    id: 'unit1',
    title: 'Java Fundamentals',
    icon: '☕',
    color: '#FF6B35',
    topics: [
      { id: 'u1t1', title: 'Features of Java & OOP Concepts', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t2', title: 'Java Virtual Machine (JVM)', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t3', title: 'Bytecode & Bytecode Interpretation', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t4', title: 'Data Types', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t5', title: 'Variables, Arrays & Expressions', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t6', title: 'Operators', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1t7', title: 'Control Structures (if, switch, for, while, do-while)', co: 'CO1', tlo: 'TLO1' },
      { id: 'u1qb', title: 'Unit 1 Question Bank (Parts A/B/C)', co: 'CO1', tlo: 'TLO1' },
    ],
  },
  {
    id: 'unit2',
    title: 'Java Classes',
    icon: '🏛️',
    color: '#4ECDC4',
    topics: [
      { id: 'u2t1', title: 'Abstract Classes & Static Classes', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t2', title: 'Inner Classes & Packages', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t3', title: 'Wrapper Classes & Interfaces', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t4', title: 'this, super & Access Control', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t5', title: 'Exception Handling & Exception as Objects', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t6', title: 'Exception Hierarchy', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2t7', title: 'try-catch-finally, throw & throws', co: 'CO2', tlo: 'TLO2' },
      { id: 'u2qb', title: 'Unit 2 Question Bank (Parts A/B/C)', co: 'CO2', tlo: 'TLO2' },
    ],
  },
  {
    id: 'unit3',
    title: 'I/O Package & Multithreading',
    icon: '📁',
    color: '#45B7D1',
    topics: [
      { id: 'u3t1', title: 'Input Streams & Output Streams', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t2', title: 'Object Serialization & Deserialization', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t3', title: 'Filter Streams & Pipe Streams', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t4', title: 'Thread Life Cycle & Multithreading Basics', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t5', title: 'Multithreading Advantages & Issues', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t6', title: 'Simple Thread Programs', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3t7', title: 'Thread Synchronization', co: 'CO3', tlo: 'TLO3' },
      { id: 'u3qb', title: 'Unit 3 Question Bank (Parts A/B/C)', co: 'CO3', tlo: 'TLO3' },
    ],
  },
  {
    id: 'unit4',
    title: 'Graphical User Interface',
    icon: '🖥️',
    color: '#9B59B6',
    topics: [
      { id: 'u4t1', title: 'Introduction to AWT', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4t2', title: 'Layout Managers & Components', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4t3', title: 'Event Handling', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4t4', title: 'Applet Class & Applet Lifecycle', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4t5', title: 'Passing Parameters & HTML Embedding', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4t6', title: 'Swing Components (JFrame, JButton, JLabel, JPanel, JApplet)', co: 'CO4', tlo: 'TLO4' },
      { id: 'u4qb', title: 'Unit 4 Question Bank (Parts A/B/C)', co: 'CO4', tlo: 'TLO4' },
    ],
  },
  {
    id: 'unit5',
    title: 'Database Connectivity',
    icon: '🗄️',
    color: '#E74C3C',
    topics: [
      { id: 'u5t1', title: 'JDBC Architecture', co: 'CO5', tlo: 'TLO5' },
      { id: 'u5t2', title: 'Establishing DB Connection & Connection Interface', co: 'CO5', tlo: 'TLO5' },
      { id: 'u5t3', title: 'Working with Statement & PreparedStatement', co: 'CO5', tlo: 'TLO5' },
      { id: 'u5t4', title: 'Creating & Executing SQL Queries', co: 'CO5', tlo: 'TLO5' },
      { id: 'u5t5', title: 'Working with ResultSet', co: 'CO5', tlo: 'TLO5' },
    ],
  },
];

export const getTotalTopics = () =>
  SYLLABUS.reduce((sum, unit) => sum + unit.topics.length, 0);

export const findTopicById = (topicId) => {
  for (const unit of SYLLABUS) {
    const topic = unit.topics.find((t) => t.id === topicId);
    if (topic) return { unit, topic };
  }
  return null;
};
