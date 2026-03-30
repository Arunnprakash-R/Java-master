// Local AI Response Engine — Adaptive Teaching Engine (JavaMaster)
// MODE 1: Quick (2-4 lines) | MODE 2: Standard (analogy+code+mistake) | MODE 3: Deep (full guide)
// MODE 4: Debug (fix code) | MODE 5: Practice (quiz/exercise)
import { getTopicById, searchTopics, findMatchingQuestion, searchAllQuestions } from '../data/knowledge/index.js';
import { SYLLABUS, findTopicById } from '../data/syllabus.js';

// ═══════════════════════════════════════════════════════════════
// MODE CLASSIFIER — Determines response depth based on question
// ═══════════════════════════════════════════════════════════════
function classifyMode(query) {
  const q = query.toLowerCase().trim();
  const wordCount = q.split(/\s+/).length;

  // MODE 5: Practice / Quiz
  if (/practice|quiz|test me|test my|exercise|give me a problem|challenge/.test(q)) {
    return 5;
  }

  // MODE 4: Debug / Fix code
  if (/fix this|fix my|what.?s wrong|why.* error|debug|error.*code|issue.*code|not working|doesn.?t compile|doesn.?t work|what.?s the issue/.test(q)) {
    return 4;
  }

  // MODE 3: Deep explanation
  if (/in detail|in depth|deeply|from scratch|fully understand|under the hood|internally|everything about|teach me|complete guide|explain everything|confused about|step by step/.test(q)) {
    return 3;
  }

  // MODE 1: Quick answer
  if (wordCount <= 5) return 1;
  if (/^what is |^what are |^define |^meaning of |^what does .* mean/.test(q)) return 1;
  if (/^difference between |^diff between |^compare |^vs /.test(q)) return 1;
  if (/^is .* correct|^can i use|^can we use/.test(q)) return 1;
  if (/\bjust\b|\bquickly\b|\bbriefly\b|\bsimply\b|\bshort\b|\bin short\b/.test(q)) return 1;

  // MODE 2: Standard explanation (default for most questions)
  return 2;
}

// ═══════════════════════════════════════════════════════════════
// GENERAL RESPONSES (greetings, meta)
// ═══════════════════════════════════════════════════════════════
const GENERAL_RESPONSES = {
  greeting: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
    response: `## ☕ Hello! Welcome to JavaMaster!

I'm your Java teacher with an **adaptive brain**! I adjust my answers based on how you ask:

| How You Ask | What You Get |
|-------------|-------------|
| **"What is X?"** | Quick 2-3 line answer ⚡ |
| **"Explain X with example"** | Standard explanation + code 📝 |
| **"Teach me X in detail"** | Full deep guide with everything 📚 |
| **Paste broken code** | I'll find and fix the bug 🔧 |
| **"Quiz me on X"** | Practice problems to test yourself 🎯 |

**Ask me anything!** — "What is inheritance?", "Explain loops with example", "Teach me JDBC in detail" etc.`
  },
  thanks: {
    patterns: ['thank', 'thanks', 'thank you', 'thx', 'appreciate'],
    response: `## 😊 You're Welcome!

Keep practicing! Ask me about any other Java topic — I have 35 topics ready with full explanations!`
  },
  whatCanYouDo: {
    patterns: ['what can you do', 'what do you know', 'help me', 'how to use', 'what topics'],
    response: `## 📚 I Can Teach You Everything in Java!

| Unit | Topics |
|------|--------|
| ☕ **Unit 1** | Java Features, OOP, JVM, Data Types, Variables, Arrays, Operators, Control Structures |
| 🏛️ **Unit 2** | Abstract Classes, Interfaces, Packages, Access Control, Exception Handling |
| 📁 **Unit 3** | I/O Streams, Serialization, Threads, Synchronization |
| 🖥️ **Unit 4** | AWT, Swing, Layout Managers, Event Handling, Applets |
| 🗄️ **Unit 5** | JDBC, Database Connection, SQL Queries, ResultSet |

**Just ask any question!** I'll explain with definition, syntax, code, and comparison.`
  }
};

// Add a lightweight quality pass to make answers feel consistent and actionable
function polishResponse(content, modeLabel = null, topicTitle = null) {
    if (!content) return '';
    const trimmed = typeof content === 'string' ? content.trim() : String(content);
    const title = modeLabel ? `### ${modeLabel}${topicTitle ? ` · ${topicTitle}` : ''}\n\n` : '';
    const footer = '\n\n---\n**Next:** Ask for a code sample, a common pitfall, or a quick quiz to deepen understanding.\n**Verify:** Cross-check with official Java docs or concise primers (e.g., Oracle Java tutorials, W3Schools Java).';
    return `${title}${trimmed}${footer}`;
}

// ═══════════════════════════════════════════════════════════════
// STRUCTURED TOPIC RESPONSES — Definition + Syntax + Types + 
// Example + Comparison + Key Points for EVERY major concept
// ═══════════════════════════════════════════════════════════════
const STRUCTURED_RESPONSES = [
  // ── INHERITANCE ──
  {
    patterns: ['inheritance', 'inherit', 'extends', 'subclass', 'superclass', 'parent class', 'child class', 'base class', 'derived class'],
    quick: `**Inheritance** is when a child class acquires all properties and methods of a parent class using the \`extends\` keyword. It represents the IS-A relationship — like "Dog IS-A Animal".
\`class Dog extends Animal { }\` — Dog gets all of Animal's methods automatically.
Java supports single, multilevel, and hierarchical inheritance (NOT multiple with classes — use interfaces).

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🧬 Inheritance in Java

**Analogy:** Like a child inheriting traits from parents 👨‍👩‍👧 — your eye color, height come from them, but you also have your own unique skills.

**Inheritance** lets one class (child) acquire all fields and methods of another class (parent) using \`extends\`. The child can add its own new methods or override parent methods.

**5 Types:** Single (A→B), Multilevel (A→B→C), Hierarchical (A→B,C,D), Multiple (❌ not with classes, use interfaces), Hybrid (combination).

\`\`\`java
class Animal {
    String name;
    void eat() { System.out.println(name + " is eating"); }
}

class Dog extends Animal {          // Dog inherits eat() from Animal
    void bark() { System.out.println(name + " says Woof!"); }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.name = "Buddy";
        d.eat();     // Inherited from Animal ✅
        d.bark();    // Dog's own method ✅
    }
}
/* Output:
   Buddy is eating
   Buddy says Woof! */
\`\`\`

⚠️ **Common Mistake:** Calling \`run()\` instead of \`start()\` with threads, or forgetting \`super()\` in child constructor when parent has no default constructor.

💡 **Key Takeaway:** Inheritance = code reusability. Use \`extends\` for classes, \`implements\` for interfaces.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Inheritance

**Problem:** Create a class hierarchy for a school system:
1. Create a \`Person\` class with \`name\` and \`age\` fields, and a \`display()\` method
2. Create a \`Student\` class that extends \`Person\`, adding \`rollNo\` and \`marks\` fields
3. Create a \`Teacher\` class that extends \`Person\`, adding \`subject\` and \`salary\` fields
4. Override \`display()\` in both child classes to show all fields
5. In \`main()\`, create one Student and one Teacher, call \`display()\` on both

**Requirements:**
- Use \`super()\` to call parent constructor
- Use \`@Override\` annotation
- Use meaningful variable names

**Hint:** Think about what's common (name, age) vs what's specific (marks vs salary)...

Try it yourself first, then ask me for the solution! 💪`,
    response: `## 🧬 Inheritance in Java — Complete Guide

---

### 📖 1. Definition
**Inheritance** is a mechanism in Java where one class (child/subclass) **acquires all the properties and methods** of another class (parent/superclass). It represents the **IS-A relationship**.

> *"A Dog IS-A Animal. A Car IS-A Vehicle."*

---

### 🎯 2. Real-Life Analogy
Think about your family 👨‍👩‍👧:
- You **inherit** features from your parents — eyes, hair color, height
- But you also have your **own unique features** — your hobbies, skills
- Your parents inherited from THEIR parents (grandparents) — this is **multilevel inheritance**

Similarly in Java:
- Child class **gets** all parent's methods and variables automatically
- Child can **add** its own new methods
- Child can **override** (change) parent's methods

---

### 📝 3. Syntax
\`\`\`java
// Parent class
class Animal {
    String name;
    void eat() {
        System.out.println(name + " is eating");
    }
}

// Child class — uses 'extends' keyword
class Dog extends Animal {
    void bark() {
        System.out.println(name + " says Woof!");
    }
}
\`\`\`

**Keyword:** \`extends\` — used to inherit from a class
**super keyword:** used to call parent's constructor or methods

---

### 📊 4. Types of Inheritance in Java (Each Explained)

---

#### 🔹 Type 1: Single Inheritance
**Definition:** In Single Inheritance, **one child class inherits from one parent class**. It is the simplest and most common form of inheritance. There is exactly one parent and one child.

**Analogy:** Like a son inheriting property from his father only — one-to-one relationship.

\`\`\`java
// Single: Animal → Dog
class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}
// Dog has BOTH eat() and bark()
\`\`\`

---

#### 🔹 Type 2: Multilevel Inheritance
**Definition:** In Multilevel Inheritance, a class is derived from a class **which is also derived from another class** — forming a **chain** like grandparent → parent → child. Each level inherits from the one above it.

**Analogy:** Grandfather → Father → Son. The son gets features from both father AND grandfather.

\`\`\`java
// Multilevel: Animal → Dog → Puppy
class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}
class Puppy extends Dog {
    void play() { System.out.println("Playing..."); }
}
// Puppy has eat() + bark() + play()
\`\`\`

---

#### 🔹 Type 3: Hierarchical Inheritance
**Definition:** In Hierarchical Inheritance, **multiple child classes inherit from the SAME parent class**. One parent has many children. Each child gets the parent's features but can also have its own unique features.

**Analogy:** One teacher teaches many students — all students learn the same basics but develop different skills.

\`\`\`java
// Hierarchical: Animal → Dog, Cat, Bird
class Animal {
    void eat() { System.out.println("Eating..."); }
}
class Dog extends Animal {
    void bark() { System.out.println("Barking..."); }
}
class Cat extends Animal {
    void meow() { System.out.println("Meowing..."); }
}
class Bird extends Animal {
    void fly() { System.out.println("Flying..."); }
}
// All have eat(), but each has its own method too
\`\`\`

---

#### 🔹 Type 4: Multiple Inheritance (❌ Not supported with classes!)
**Definition:** In Multiple Inheritance, **one child class tries to inherit from TWO OR MORE parent classes** at the same time. Java does **NOT** support this with classes because of the **Diamond Problem** (ambiguity if both parents have the same method). However, you CAN achieve it using **interfaces**!

**Why not supported?** If class C extends both A and B, and both have a method \`display()\`, which one should C use? This confusion is called the **Diamond Problem**.

\`\`\`java
// ❌ WRONG — Not allowed in Java!
// class C extends A, B { }  // Compilation ERROR!

// ✅ CORRECT — Use interfaces instead!
interface Printable {
    void print();
}
interface Showable {
    void show();
}
class MyClass implements Printable, Showable {
    public void print() { System.out.println("Printing..."); }
    public void show() { System.out.println("Showing..."); }
}
\`\`\`

---

#### 🔹 Type 5: Hybrid Inheritance
**Definition:** Hybrid Inheritance is a **combination of two or more types** of inheritance (e.g., single + multiple, or hierarchical + multilevel). Like multiple inheritance, it is **NOT directly supported** with classes in Java but can be achieved using **interfaces combined with classes**.

\`\`\`
Diagram:

Single:          Multilevel:       Hierarchical:
  Animal            Animal            Animal
    │                 │              ┌───┼───┐
   Dog              Dog             Dog  Cat  Bird
                      │
                   Puppy
\`\`\`

**Summary Table:**
| Type | Definition | Supported with Classes? |
|------|-----------|------------------------|
| **Single** | One parent → One child | ✅ Yes |
| **Multilevel** | Chain: Grandparent → Parent → Child | ✅ Yes |
| **Hierarchical** | One parent → Many children | ✅ Yes |
| **Multiple** | Many parents → One child | ❌ No (use interfaces) |
| **Hybrid** | Combination of above types | ❌ No (use interfaces) |

---

### 💻 5. Complete Example Program

\`\`\`java
// ═══ SINGLE INHERITANCE ═══
class Animal {
    String name;
    int age;
    
    Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    void eat() {
        System.out.println(name + " is eating 🍽️");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping 💤");
    }
    
    void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
}

class Dog extends Animal {
    String breed;
    
    Dog(String name, int age, String breed) {
        super(name, age);     // Call parent constructor using 'super'
        this.breed = breed;
    }
    
    void bark() {             // Dog's OWN method
        System.out.println(name + " says: Woof! Woof! 🐕");
    }
    
    @Override                 // Override parent's method
    void eat() {
        System.out.println(name + " is eating bones 🦴");
    }
}

// ═══ MULTILEVEL INHERITANCE ═══
class Puppy extends Dog {
    Puppy(String name, int age, String breed) {
        super(name, age, breed);
    }
    
    void play() {
        System.out.println(name + " is playing with a ball! ⚽");
    }
}

// ═══ HIERARCHICAL INHERITANCE ═══
class Cat extends Animal {
    Cat(String name, int age) {
        super(name, age);
    }
    
    void purr() {
        System.out.println(name + " purrs: Purrrr 🐱");
    }
    
    @Override
    void eat() {
        System.out.println(name + " is eating fish 🐟");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        // Single Inheritance
        Dog d = new Dog("Buddy", 3, "Golden Retriever");
        d.display();    // Inherited from Animal ✅
        d.eat();        // Overridden: "eating bones" ✅
        d.sleep();      // Inherited from Animal ✅
        d.bark();       // Dog's own method ✅
        
        System.out.println("────────────────────");
        
        // Multilevel Inheritance
        Puppy p = new Puppy("Max", 1, "Labrador");
        p.display();    // From Animal (grandparent) ✅
        p.bark();       // From Dog (parent) ✅
        p.play();       // Puppy's own ✅
        
        System.out.println("────────────────────");
        
        // Hierarchical Inheritance
        Cat c = new Cat("Whiskers", 2);
        c.eat();        // Cat's version ✅
        c.purr();       // Cat's own ✅
        
        System.out.println("────────────────────");
        
        // Runtime Polymorphism
        Animal a = new Dog("Rex", 5, "German Shepherd");
        a.eat();        // Calls DOG's eat() — decided at runtime!
    }
}
\`\`\`

**Output:**
\`\`\`
Name: Buddy, Age: 3
Buddy is eating bones 🦴
Buddy is sleeping 💤
Buddy says: Woof! Woof! 🐕
────────────────────
Name: Max, Age: 1
Max says: Woof! Woof! 🐕
Max is playing with a ball! ⚽
────────────────────
Whiskers is eating fish 🐟
Whiskers purrs: Purrrr 🐱
────────────────────
Rex is eating bones 🦴
\`\`\`

---

### ⚖️ 6. Comparison — Inheritance vs Interface

| Feature | Inheritance (\`extends\`) | Interface (\`implements\`) |
|---------|------------------------|--------------------------|
| **Keyword** | \`extends\` | \`implements\` |
| **Multiple** | ❌ Only one class | ✅ Multiple interfaces |
| **Methods** | Can be abstract + concrete | Abstract (+ default in Java 8) |
| **Variables** | Any type | Only \`public static final\` |
| **Constructor** | ✅ Yes | ❌ No |
| **Relationship** | IS-A | CAN-DO |
| **Use when** | Related classes share code | Unrelated classes share behavior |

---

### 💡 7. Key Points for Exams
- \`extends\` keyword for inheritance
- \`super()\` calls parent constructor (must be first line)
- \`super.method()\` calls parent's method
- Java does NOT support multiple inheritance with classes (use interfaces)
- \`@Override\` annotation when redefining parent's method
- Constructor is NOT inherited (but called via super)
- \`private\` members are NOT inherited
- \`final\` class CANNOT be inherited`
  },

  // ── POLYMORPHISM ──
  {
    patterns: ['polymorphism', 'poly', 'many forms', 'overloading', 'overriding', 'method overloading', 'method overriding', 'runtime polymorphism', 'compile time polymorphism'],
    quick: `**Polymorphism** means "many forms" — the same method name behaves differently depending on context.
Two types: **Overloading** (same class, different params — compile-time) and **Overriding** (parent-child, same params — runtime).
\`add(2,3)\` vs \`add(2.5, 3.5)\` = overloading. \`animal.sound()\` calling Dog's or Cat's version = overriding.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🎭 Polymorphism in Java

**Analogy:** The word "open" 🚪 — open a door (push), open a book (flip), open a file (double-click). Same word, different action based on context!

**Polymorphism** = same method name, different behavior. Java has two types:

**1. Compile-time (Overloading):** Same method name, different parameters, in the SAME class.
**2. Runtime (Overriding):** Same method name and params, in parent-child classes. Child redefines the method.

\`\`\`java
// OVERLOADING — same class, different parameters
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }  // Different param types
}

// OVERRIDING — parent-child, same signature
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Woof!"); }  // Child redefines
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));       // calls int version: 5
        System.out.println(calc.add(2.5, 3.5));   // calls double version: 6.0
        
        Animal a = new Dog();  // Parent ref, child obj = runtime polymorphism
        a.sound();             // "Woof!" — Dog's version called at runtime!
    }
}
/* Output:
   5
   6.0
   Woof! */
\`\`\`

⚠️ **Common Mistake:** Thinking changing ONLY the return type counts as overloading — it doesn't! Parameters must differ.

💡 **Key Takeaway:** Over**LOAD** = LOAD more methods (different params). Over**RIDE** = RIDE over parent's method (same params).

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Polymorphism

**Problem:** Create a shape calculator system:
1. Create a class \`AreaCalculator\` with overloaded \`area()\` methods for:
   - Circle: \`area(double radius)\` → π × r²
   - Rectangle: \`area(double length, double width)\` → l × w
   - Triangle: \`area(double base, double height, boolean isTriangle)\` → 0.5 × b × h
2. Create a \`Shape\` class with a \`draw()\` method
3. Create \`Circle\`, \`Rectangle\`, \`Triangle\` subclasses that override \`draw()\`
4. In \`main()\`, use a \`Shape[]\` array with all 3 shapes and loop through calling \`draw()\`

**Hint:** The array loop demonstrates runtime polymorphism — same method call, different behavior!

Try it yourself first! 💪`,
    response: `## 🎭 Polymorphism in Java — Complete Guide

---

### 📖 1. Definition
**Polymorphism** means **"many forms"** (Poly = many, Morph = forms). It's the ability of an object to take on **different forms** — the same method name behaves differently based on how it's called.

---

### 🎯 2. Real-Life Analogy
Think of the word **"open"** 🚪:
- **Open** a door → push/pull
- **Open** a book → flip the cover
- **Open** a file → double click
- **Open** a gift → tear the wrapper

Same word, **different action** depending on the context! That's polymorphism!

---

### 📊 3. Two Types of Polymorphism

| Type | Also Called | When Decided | How |
|------|-----------|-------------|-----|
| **Compile-time** | Static / Early Binding | During compilation | **Method Overloading** |
| **Runtime** | Dynamic / Late Binding | During execution | **Method Overriding** |

---

### 📝 4. Type 1: Method Overloading (Compile-Time)

**Definition:** Same method name, **different parameters** (number, type, or order), in the **SAME class**.

**Syntax:**
\`\`\`java
class Calculator {
    // Same name "add" — but different parameter lists
    int add(int a, int b)           { return a + b; }
    int add(int a, int b, int c)    { return a + b + c; }
    double add(double a, double b)  { return a + b; }
    String add(String a, String b)  { return a + b; }
}
\`\`\`

**Rules for Overloading:**
- ✅ Different number of parameters
- ✅ Different types of parameters
- ✅ Different order of parameter types
- ❌ Return type alone is NOT enough
- ❌ Access modifier change is NOT overloading

---

### 📝 5. Type 2: Method Overriding (Runtime)

**Definition:** Same method name, **same parameters**, in **parent-child classes**. Child provides its own implementation.

**Syntax:**
\`\`\`java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override  // Override annotation
    void sound() { System.out.println("Woof!"); }
}
\`\`\`

**Rules for Overriding:**
- ✅ Must have same method name and parameters
- ✅ Must be in parent-child (IS-A) relationship
- ❌ Cannot override \`static\` methods
- ❌ Cannot override \`final\` methods
- ❌ Cannot override \`private\` methods
- ⚠️ Access modifier cannot be MORE restrictive (can be same or wider)
- ⚠️ Return type must be same or covariant (subtype)

---

### 💻 6. Complete Example Program

\`\`\`java
// ═══════════════════════════════════════════════
// METHOD OVERLOADING — Compile-time Polymorphism
// ═══════════════════════════════════════════════
class MathOperations {
    // Version 1: Two integers
    int multiply(int a, int b) {
        System.out.println("int × int called");
        return a * b;
    }
    
    // Version 2: Three integers (different NUMBER of params)
    int multiply(int a, int b, int c) {
        System.out.println("int × int × int called");
        return a * b * c;
    }
    
    // Version 3: Two doubles (different TYPE of params)
    double multiply(double a, double b) {
        System.out.println("double × double called");
        return a * b;
    }
    
    // Version 4: int and double (different ORDER)
    double multiply(int a, double b) {
        System.out.println("int × double called");
        return a * b;
    }
}

// ═══════════════════════════════════════════════
// METHOD OVERRIDING — Runtime Polymorphism
// ═══════════════════════════════════════════════
class Shape {
    void draw() {
        System.out.println("Drawing a generic shape ⬜");
    }
    
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    void draw() {
        System.out.println("Drawing a Circle ⭕ with radius " + radius);
    }
    
    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    double width, height;
    
    Rectangle(double w, double h) {
        this.width = w;
        this.height = h;
    }
    
    @Override
    void draw() {
        System.out.println("Drawing a Rectangle 🟦 (" + width + " × " + height + ")");
    }
    
    @Override
    double area() {
        return width * height;
    }
}

class Triangle extends Shape {
    double base, height;
    
    Triangle(double b, double h) {
        this.base = b;
        this.height = h;
    }
    
    @Override
    void draw() {
        System.out.println("Drawing a Triangle 🔺 (base=" + base + ", h=" + height + ")");
    }
    
    @Override
    double area() {
        return 0.5 * base * height;
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // ── Compile-time (Overloading) ──
        MathOperations math = new MathOperations();
        System.out.println("2 × 3 = " + math.multiply(2, 3));
        System.out.println("2 × 3 × 4 = " + math.multiply(2, 3, 4));
        System.out.println("2.5 × 3.5 = " + math.multiply(2.5, 3.5));
        System.out.println("2 × 3.5 = " + math.multiply(2, 3.5));
        
        System.out.println("═══════════════════════════════");
        
        // ── Runtime (Overriding) ──
        // Parent reference, child objects — polymorphism!
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };
        
        for (Shape s : shapes) {
            s.draw();     // Calls the CHILD's draw() at runtime!
            System.out.printf("Area = %.2f%n%n", s.area());
        }
    }
}
\`\`\`

**Output:**
\`\`\`
int × int called
2 × 3 = 6
int × int × int called
2 × 3 × 4 = 24
double × double called
2.5 × 3.5 = 8.75
int × double called
2 × 3.5 = 7.0
═══════════════════════════════
Drawing a Circle ⭕ with radius 5.0
Area = 78.54

Drawing a Rectangle 🟦 (4.0 × 6.0)
Area = 24.00

Drawing a Triangle 🔺 (base=3.0, h=8.0)
Area = 12.00
\`\`\`

---

### ⚖️ 7. Comparison — Overloading vs Overriding

| Feature | Overloading | Overriding |
|---------|------------|------------|
| **Where** | Same class | Parent-child classes |
| **Parameters** | Must be different | Must be same |
| **Return type** | Can vary | Must be same or covariant (subtype since Java 5) |
| **Binding** | Compile-time (static) | Runtime (dynamic) |
| **static** | Can overload | Cannot override |
| **final** | Can overload | Cannot override |
| **private** | Can overload | Cannot override |
| **\`@Override\`** | Not needed | Recommended |
| **Polymorphism** | Compile-time | Runtime |

---

### 💡 8. Key Points
- Over**LOAD** = LOAD more methods in SAME class (different params)
- Over**RIDE** = RIDE over parent's method in child class (same params)
- Runtime polymorphism needs inheritance + method overriding
- \`Shape s = new Circle();\` → parent ref, child obj = runtime polymorphism
- JVM decides which method to call at RUNTIME (dynamic dispatch)`
  },

  // ── ENCAPSULATION ──
  {
    patterns: ['encapsulation', 'getter', 'setter', 'get set', 'private variable', 'data hiding', 'access modifier'],
    quick: `**Encapsulation** is wrapping data (variables) and methods together in a class, and hiding internal data using \`private\`. Access is given through \`public\` getter/setter methods.
Think of an ATM 🏧 — you can't touch the money vault directly, only through buttons (methods).

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📦 Encapsulation in Java

**Analogy:** Like an ATM machine 🏧 — your money (data) is locked inside a vault (\`private\`), and you access it only through buttons (getter/setter methods).

**Encapsulation** = make variables \`private\` + provide \`public\` getter (read) and setter (write with validation) methods. This protects data from invalid changes.

\`\`\`java
class Student {
    private String name;     // Hidden from outside
    private int age;         // Hidden from outside
    
    public String getName() { return name; }           // Getter — read access
    public void setAge(int age) {                      // Setter — write with validation!
        if (age >= 5 && age <= 100) this.age = age;
        else System.out.println("Invalid age!");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        // s.age = -5;          // ❌ ERROR! age is private
        s.setAge(-5);           // ❌ Rejected: "Invalid age!"
        s.setAge(20);           // ✅ Accepted
    }
}
\`\`\`

⚠️ **Common Mistake:** Making a setter without validation — defeats the whole purpose of encapsulation!

💡 **Key Takeaway:** Variables = \`private\`, Methods = \`public\`. Getter = read, Setter = write + validate.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Encapsulation

**Problem:** Create an encapsulated \`BankAccount\` class:
1. Private fields: \`accountNumber\`, \`holderName\`, \`balance\`
2. Constructor to set accountNumber and holderName (balance starts at 0)
3. \`deposit(double amount)\` — only accept positive amounts
4. \`withdraw(double amount)\` — only if sufficient balance AND amount > 0
5. \`getBalance()\` — returns balance (no setBalance — balance can't be set directly!)
6. In \`main()\`, test: deposit 5000, withdraw 2000, try withdrawing 10000 (should fail)

**Hint:** The key insight is that \`balance\` has NO setter — it can only change through \`deposit()\` and \`withdraw()\` with validation!

Try it yourself first! 💪`,
    response: `## 📦 Encapsulation in Java — Complete Guide

---

### 📖 1. Definition
**Encapsulation** is the process of **wrapping data (variables) and code (methods) together** into a single unit (class), and **hiding the internal details** from outside access. Access is controlled through **getter and setter methods**.

---

### 🎯 2. Real-Life Analogy
Think of a **medicine capsule** 💊:
- The medicine (data) is **wrapped inside** a protective shell (class)
- You can't touch the powder directly — you just **swallow the capsule** (use methods)
- The shell **protects** the medicine from contamination (data protection)

Another analogy — **ATM Machine** 🏧:
- Your money (data) is inside the bank vault (private)
- You access it through ATM buttons (getter/setter methods)
- You can't go directly to the vault (can't touch private variables)

---

### 📝 3. Syntax — How to Implement

\`\`\`java
class ClassName {
    // Step 1: Make variables PRIVATE (hide them)
    private dataType variableName;
    
    // Step 2: Create PUBLIC getter (read access)
    public dataType getVariableName() {
        return variableName;
    }
    
    // Step 3: Create PUBLIC setter (write access with VALIDATION)
    public void setVariableName(dataType value) {
        if (/* validation check */) {
            this.variableName = value;
        }
    }
}
\`\`\`

---

### 📊 4. Access Modifiers — 4 Types (Each Explained)

---

#### 🔒 Type 1: \`private\`
**Definition:** A \`private\` member can be accessed **ONLY within the SAME class** where it is declared. No other class — not even a child class — can access it. This is the **most restrictive** modifier and is the backbone of encapsulation.

\`\`\`java
class Account {
    private double balance = 1000;  // ONLY accessible inside Account class
    
    public double getBalance() {    // Others access through this method
        return balance;
    }
}
// Outside: account.balance → ❌ ERROR! private!
// Outside: account.getBalance() → ✅ Works!
\`\`\`

---

#### 📦 Type 2: \`default\` (Package-Private — no keyword)
**Definition:** When you write NO access modifier, Java uses **default** access. A default member can be accessed by **any class within the SAME package** only. Classes from other packages CANNOT access it. It is also called **package-private**.

\`\`\`java
class Helper {             // default class — accessible in same package only
    int count = 10;        // default variable — same package only
    void display() { }     // default method — same package only
}
// Same package: helper.count → ✅
// Different package: helper.count → ❌
\`\`\`

---

#### 🛡️ Type 3: \`protected\`
**Definition:** A \`protected\` member can be accessed within the **same package** (like default) AND also by **child classes (subclasses) in other packages** through inheritance. It is commonly used when you want child classes to use or modify a field.

\`\`\`java
// In package: animals
class Animal {
    protected String name;   // Accessible in same package + child classes
}

// In package: pets (different package!)
class Dog extends Animal {
    void display() {
        System.out.println(name);  // ✅ Works! Dog is a child of Animal
    }
}
\`\`\`

---

#### 🌍 Type 4: \`public\`
**Definition:** A \`public\` member can be accessed from **ANY class, ANY package, ANYWHERE in the program**. There are no restrictions at all. This is the **least restrictive** modifier. Main methods and getter/setter methods are usually public.

\`\`\`java
public class Calculator {           // Accessible from everywhere
    public int add(int a, int b) {  // Accessible from everywhere
        return a + b;
    }
}
// Any class, any package: calc.add(2, 3) → ✅ Works!
\`\`\`

---

**Summary Table:**
| Modifier | Same Class | Same Package | Child Class (Other Pkg) | Other Package |
|----------|-----------|-------------|------------------------|---------------|
| **private** 🔒 | ✅ | ❌ | ❌ | ❌ |
| **default** 📦 | ✅ | ✅ | ❌ | ❌ |
| **protected** 🛡️ | ✅ | ✅ | ✅ | ❌ |
| **public** 🌍 | ✅ | ✅ | ✅ | ✅ |

**For encapsulation:** Variables → \`private\`, Methods → \`public\`

---

### 💻 5. Complete Example Program

\`\`\`java
class Student {
    // ── Private variables (HIDDEN from outside) ──
    private String name;
    private int age;
    private double marks;
    private String grade;
    
    // ── Constructor ──
    public Student(String name, int age, double marks) {
        this.name = name;
        setAge(age);        // Use setter for validation!
        setMarks(marks);    // Use setter for validation!
    }
    
    // ── Getter for name (read-only — no setter means name can't be changed!) ──
    public String getName() {
        return name;
    }
    
    // ── Getter & Setter for age (with validation) ──
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 5 && age <= 100) {
            this.age = age;
        } else {
            System.out.println("❌ Invalid age! Must be 5-100. Got: " + age);
        }
    }
    
    // ── Getter & Setter for marks (with validation + auto-grade) ──
    public double getMarks() {
        return marks;
    }
    
    public void setMarks(double marks) {
        if (marks >= 0 && marks <= 100) {
            this.marks = marks;
            calculateGrade();    // Auto-calculate grade when marks change
        } else {
            System.out.println("❌ Invalid marks! Must be 0-100. Got: " + marks);
        }
    }
    
    // ── Private helper method (hidden — only used inside this class) ──
    private void calculateGrade() {
        if (marks >= 90) grade = "A+";
        else if (marks >= 80) grade = "A";
        else if (marks >= 70) grade = "B";
        else if (marks >= 60) grade = "C";
        else if (marks >= 50) grade = "D";
        else grade = "F";
    }
    
    public String getGrade() {
        return grade;
    }
    
    // ── Display method ──
    public void display() {
        System.out.println("┌─────────────────────────────┐");
        System.out.println("│ Name  : " + name);
        System.out.println("│ Age   : " + age);
        System.out.println("│ Marks : " + marks);
        System.out.println("│ Grade : " + grade);
        System.out.println("└─────────────────────────────┘");
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Student s = new Student("Rahul", 20, 95.5);
        s.display();
        
        // s.marks = 100;     ❌ ERROR! marks is private
        // s.name = "Hack";   ❌ ERROR! name is private
        
        s.setMarks(85);       // ✅ Uses setter → validates → updates grade
        s.display();
        
        s.setAge(-5);         // ❌ Rejected! "Invalid age!"
        s.setMarks(150);      // ❌ Rejected! "Invalid marks!"
        
        s.display();          // Values unchanged — validation WORKED!
        
        System.out.println("Name: " + s.getName());    // ✅ Read via getter
        System.out.println("Grade: " + s.getGrade());  // ✅ Read via getter
    }
}
\`\`\`

**Output:**
\`\`\`
┌─────────────────────────────┐
│ Name  : Rahul
│ Age   : 20
│ Marks : 95.5
│ Grade : A+
└─────────────────────────────┘
┌─────────────────────────────┐
│ Name  : Rahul
│ Age   : 20
│ Marks : 85.0
│ Grade : A
└─────────────────────────────┘
❌ Invalid age! Must be 5-100. Got: -5
❌ Invalid marks! Must be 0-100. Got: 150
┌─────────────────────────────┐
│ Name  : Rahul
│ Age   : 20
│ Marks : 85.0
│ Grade : A
└─────────────────────────────┘
Name: Rahul
Grade: A
\`\`\`

---

### ⚖️ 6. Comparison — Encapsulation vs Abstraction

| Feature | Encapsulation | Abstraction |
|---------|--------------|-------------|
| **What** | Hides **data** (variables) | Hides **implementation** (how it works) |
| **How** | \`private\` + getters/setters | \`abstract\` classes / interfaces |
| **Purpose** | **Data protection** | **Simplify complexity** |
| **Analogy** | ATM hides money vault 🏧 | Car hides engine details 🚗 |
| **Level** | Variable level | Method/class level |

---

### 💡 7. Key Points
- Variables = \`private\`, Methods = \`public\`
- Getter = read, Setter = write (with validation!)
- Encapsulation = Data Hiding + Controlled Access
- Benefits: Security, Validation, Maintainability, Flexibility
- A class with ALL private variables + public getters/setters = **JavaBean** / **POJO**`
  },

  // ── ABSTRACTION ──
  {
    patterns: ['abstraction', 'abstract class', 'abstract method', 'abstract keyword'],
    quick: `**Abstraction** hides complex implementation details and shows only essential features. Achieved via \`abstract class\` (partial abstraction) or \`interface\` (full abstraction).
Like driving a car 🚗 — you press the accelerator, the car moves. You don't need to know how the engine works internally.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🎭 Abstraction in Java

**Analogy:** A **coffee machine** ☕ — you press a button and coffee comes out. You don't know the internal process (heating, filtering, mixing). The complexity is hidden!

**Abstraction** = hiding HOW something works, showing only WHAT it does. Two ways to achieve it:

**1. Abstract Class** — can have abstract methods (no body) AND concrete methods (with body). Child MUST implement abstract methods.
**2. Interface** — 100% abstraction (before Java 8). All methods are abstract by default.

\`\`\`java
abstract class Shape {
    String color;
    
    abstract double area();       // WHAT — child decides HOW
    
    void display() {              // Concrete method — shared by all
        System.out.println(color + " shape, area = " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(String c, double r) { color = c; radius = r; }
    
    @Override
    double area() { return Math.PI * radius * radius; }  // HOW to calculate
}

public class Main {
    public static void main(String[] args) {
        // Shape s = new Shape();  // ❌ Can't instantiate abstract class!
        Shape s = new Circle("Red", 5);
        s.display();  // "Red shape, area = 78.54"
    }
}
/* Output: Red shape, area = 78.53981633974483 */
\`\`\`

⚠️ **Common Mistake:** Forgetting that a class with even ONE abstract method MUST be declared \`abstract\`.

💡 **Key Takeaway:** Abstract class = IS-A with shared code. Interface = CAN-DO capability. Can't create objects of abstract classes.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Abstraction

**Problem:** Design a payment system:
1. Create an \`abstract class Payment\` with:
   - Field: \`double amount\`
   - Abstract method: \`void processPayment()\`
   - Concrete method: \`void showReceipt()\` that prints amount
2. Create 3 subclasses: \`CreditCardPayment\`, \`UPIPayment\`, \`CashPayment\`
3. Each subclass implements \`processPayment()\` differently
4. Create an interface \`Refundable\` with method \`void refund()\`
5. Only \`CreditCardPayment\` and \`UPIPayment\` implement \`Refundable\` (cash can't be refunded digitally!)

**Hint:** This shows when to use abstract class (shared code) vs interface (capability not all classes have)!

Try it yourself first! 💪`,
    response: `## 🎭 Abstraction in Java — Complete Guide

---

### 📖 1. Definition
**Abstraction** is the process of **hiding complex implementation details** and showing only the **essential features** to the user. It answers **WHAT** an object does, not **HOW** it does it.

---

### 🎯 2. Real-Life Analogy
**Car Driving** 🚗:
- You know: Press accelerator → car moves, Press brake → car stops
- You DON'T know: How fuel injection works, how pistons move, how gears shift
- The **complexity is hidden** — you only see what you NEED!

**Coffee Machine** ☕:
- You press a button → coffee comes out
- You DON'T know the internal process (heating, filtering, mixing)

---

### 📊 3. Two Ways to Achieve Abstraction

| | Abstract Class | Interface |
|---|---------------|-----------|
| **Keyword** | \`abstract class\` | \`interface\` |
| **Abstraction** | Partial (0-100%) | Full (100% before Java 8) |
| **Methods** | Abstract + concrete | Abstract (+ default in Java 8+) |
| **Variables** | Any type | Only \`public static final\` |
| **Constructor** | ✅ Has | ❌ No |
| **Child keyword** | \`extends\` | \`implements\` |
| **Multiple Inheritance** | ❌ No | ✅ Yes |

---

### 📝 4. Syntax

**Abstract Class:**
\`\`\`java
abstract class ClassName {
    // Concrete method (has body)
    void normalMethod() { /* code */ }
    
    // Abstract method (NO body — child MUST implement)
    abstract void mustImplement();
}
\`\`\`

**Interface:**
\`\`\`java
interface InterfaceName {
    void method1();              // abstract by default
    default void method2() { }   // default method (Java 8+)
    static void method3() { }    // static method (Java 8+)
}
\`\`\`

---

### 💻 5. Complete Example Program

\`\`\`java
// ═══ ABSTRACT CLASS ═══
abstract class Vehicle {
    String brand;
    int speed;
    
    Vehicle(String brand) {
        this.brand = brand;
        this.speed = 0;
    }
    
    // Concrete method — same for all vehicles
    void start() {
        System.out.println(brand + " engine started! 🔑");
    }
    
    void displaySpeed() {
        System.out.println(brand + " speed: " + speed + " km/h");
    }
    
    // Abstract methods — each vehicle implements differently
    abstract void accelerate();
    abstract void brake();
    abstract String getType();
}

// ═══ INTERFACE ═══
interface Electric {
    void charge();
    int getBatteryLevel();
}

interface GPS {
    void navigate(String destination);
}

// ═══ CONCRETE CLASS 1 — Car ═══
class Car extends Vehicle {
    Car(String brand) { super(brand); }
    
    @Override
    void accelerate() {
        speed += 20;
        System.out.println(brand + " car accelerates! 🏎️ Speed: " + speed);
    }
    
    @Override
    void brake() {
        speed = Math.max(0, speed - 15);
        System.out.println(brand + " car brakes! Speed: " + speed);
    }
    
    @Override
    String getType() { return "Car"; }
}

// ═══ CONCRETE CLASS 2 — Implements abstract class + interfaces ═══
class ElectricCar extends Vehicle implements Electric, GPS {
    int battery = 100;
    
    ElectricCar(String brand) { super(brand); }
    
    @Override
    void accelerate() {
        speed += 25;
        battery -= 5;
        System.out.println(brand + " electric car zooms! ⚡ Speed: " + speed);
    }
    
    @Override
    void brake() {
        speed = Math.max(0, speed - 10);
        battery += 2;  // Regenerative braking!
        System.out.println(brand + " regenerative braking! Speed: " + speed);
    }
    
    @Override
    String getType() { return "Electric Car"; }
    
    @Override
    public void charge() {
        battery = 100;
        System.out.println(brand + " fully charged! 🔋 " + battery + "%");
    }
    
    @Override
    public int getBatteryLevel() { return battery; }
    
    @Override
    public void navigate(String dest) {
        System.out.println("🗺️ Navigating " + brand + " to " + dest);
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        // Cannot do: Vehicle v = new Vehicle("X"); ❌ Abstract!
        
        Vehicle car = new Car("Toyota");
        car.start();
        car.accelerate();
        car.accelerate();
        car.brake();
        
        System.out.println("═══════════════════════");
        
        ElectricCar tesla = new ElectricCar("Tesla");
        tesla.start();
        tesla.accelerate();
        tesla.navigate("Mumbai");
        tesla.brake();
        System.out.println("Battery: " + tesla.getBatteryLevel() + "%");
        tesla.charge();
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| **Keyword** | \`abstract class\` | \`interface\` |
| **Methods** | Abstract + concrete | All abstract (Java 7), + default/static (Java 8+) |
| **Variables** | Any type | Only \`public static final\` constants |
| **Constructor** | ✅ Yes | ❌ No |
| **Multiple Inheritance** | ❌ One class only | ✅ Many interfaces |
| **Access Modifiers** | Any | \`public\` only (methods) |
| **Use When** | Related classes sharing code | Unrelated classes sharing capability |

---

### 💡 7. Key Points
- \`abstract\` keyword → cannot create objects of abstract class
- Abstract method has NO body → child MUST implement
- A class with even ONE abstract method MUST be declared abstract
- Interface = 100% abstraction (before Java 8)
- Use abstract class for IS-A with shared code
- Use interface for CAN-DO capability (Flyable, Serializable, Runnable)`
  },

  // ── INTERFACE ──
  {
    patterns: ['interface', 'implements', 'multiple inheritance java', 'functional interface', 'default method interface'],
    quick: `An **interface** is a contract that defines WHAT a class must do, but not HOW. All methods are \`public abstract\` by default. A class uses \`implements\` to follow the contract.
\`interface Drawable { void draw(); }\` — any class that implements Drawable MUST provide a \`draw()\` method.
Java 8 added \`default\` and \`static\` methods to interfaces.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📋 Interface in Java

**Analogy:** A **job contract** 📋 — it says "you MUST work 8 hours, attend meetings, submit reports" but doesn't say HOW. You can sign MULTIPLE contracts (multiple interfaces)!

**Interface** = a contract specifying methods a class must implement. Unlike abstract classes, a class can implement MULTIPLE interfaces (solving multiple inheritance!).

\`\`\`java
interface Drawable {
    void draw();                        // Abstract by default
    default void erase() {              // Default method (Java 8+)
        System.out.println("Erasing...");
    }
}

interface Resizable {
    void resize(double factor);
}

class Circle implements Drawable, Resizable {   // Multiple interfaces!
    double radius;
    Circle(double r) { radius = r; }
    
    @Override
    public void draw() { System.out.println("Drawing circle, r=" + radius); }
    
    @Override
    public void resize(double factor) { radius *= factor; }
}

public class Main {
    public static void main(String[] args) {
        Circle c = new Circle(5);
        c.draw();           // "Drawing circle, r=5.0"
        c.resize(2);
        c.draw();           // "Drawing circle, r=10.0"
        c.erase();          // Default method!
    }
}
/* Output:
   Drawing circle, r=5.0
   Drawing circle, r=10.0
   Erasing... */
\`\`\`

⚠️ **Common Mistake:** Forgetting to make implemented methods \`public\` — interface methods are \`public\` by default, so implementations must also be \`public\`.

💡 **Key Takeaway:** Interface = CAN-DO capability. Abstract class = IS-A relationship. Use interfaces for multiple inheritance.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Interface

**Problem:** Create a media player system:
1. Create interface \`Playable\` with methods: \`play()\`, \`pause()\`, \`stop()\`
2. Create interface \`Downloadable\` with method: \`download(String quality)\`
3. Create class \`Song\` that implements BOTH \`Playable\` and \`Downloadable\`
4. Create class \`LiveStream\` that implements ONLY \`Playable\` (you can't download live!)
5. In \`main()\`, use a \`Playable[]\` array to demonstrate polymorphism

**Bonus:** Add a \`default\` method \`getInfo()\` in \`Playable\` that prints "Media player v2.0"

**Hint:** This shows the power of interfaces — unrelated classes sharing behavior!

Try it yourself first! 💪`,
    response: `## 📋 Interface in Java — Complete Guide

---

### 📖 1. Definition
An **interface** is a **contract** (set of rules) that a class agrees to follow. It specifies **WHAT** a class must do, but not **HOW**. All methods are abstract by default (before Java 8).

---

### 🎯 2. Real-Life Analogy
Think of a **Job Contract** 📋:
- Contract says: "You MUST work 8 hours, attend meetings, submit reports"
- It doesn't say HOW you do it — that's your choice!
- You can sign MULTIPLE contracts (multiple interfaces!)

Another analogy — **Electrical Socket** 🔌:
- Any device (phone, laptop, TV) can plug in if it follows the socket standard
- The socket doesn't care what device you are — just follow the interface!

---

### 📝 3. Syntax

\`\`\`java
// Declaring an interface
interface InterfaceName {
    // Constant (automatically public static final)
    int MAX_VALUE = 100;
    
    // Abstract method (automatically public abstract)
    void method1();
    String method2(int x);
    
    // Default method (Java 8+) — has a body
    default void method3() {
        System.out.println("Default implementation");
    }
    
    // Static method (Java 8+) — belongs to interface
    static void method4() {
        System.out.println("Static in interface");
    }
}

// Implementing an interface
class MyClass implements InterfaceName {
    @Override
    public void method1() { /* MUST implement */ }
    
    @Override
    public String method2(int x) { return "value"; }
    
    // method3 — optional to override (has default body)
}
\`\`\`

---

### 📊 4. Types & Features

| Feature | Before Java 8 | Java 8+ | Java 9+ |
|---------|-------------|---------|---------|
| Abstract methods | ✅ | ✅ | ✅ |
| Default methods | ❌ | ✅ \`default\` | ✅ |
| Static methods | ❌ | ✅ \`static\` | ✅ |
| Private methods | ❌ | ❌ | ✅ \`private\` |

---

### 💻 5. Complete Example Program

\`\`\`java
// ═══ INTERFACES ═══
interface Drawable {
    void draw();
    default void erase() {
        System.out.println("Erasing shape...");
    }
}

interface Resizable {
    void resize(double factor);
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

// ═══ CLASS implementing MULTIPLE interfaces ═══
class Circle implements Drawable, Resizable, Colorable {
    double radius;
    String color = "Black";
    
    Circle(double r) { this.radius = r; }
    
    @Override
    public void draw() {
        System.out.println("Drawing " + color + " circle ⭕ (r=" + radius + ")");
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("Resized circle to radius " + radius);
    }
    
    @Override
    public void setColor(String color) { this.color = color; }
    
    @Override
    public String getColor() { return color; }
}

class Square implements Drawable, Resizable, Colorable {
    double side;
    String color = "Black";
    
    Square(double s) { this.side = s; }
    
    @Override
    public void draw() {
        System.out.println("Drawing " + color + " square 🟦 (side=" + side + ")");
    }
    
    @Override
    public void resize(double factor) {
        side *= factor;
        System.out.println("Resized square to side " + side);
    }
    
    @Override
    public void setColor(String color) { this.color = color; }
    
    @Override
    public String getColor() { return color; }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        // Interface reference — polymorphism!
        Drawable[] shapes = { new Circle(5), new Square(4) };
        
        for (Drawable shape : shapes) {
            shape.draw();
            shape.erase();    // default method!
            
            // Cast to access other interface methods
            if (shape instanceof Colorable) {
                ((Colorable) shape).setColor("Red");
            }
            if (shape instanceof Resizable) {
                ((Resizable) shape).resize(2);
            }
            
            shape.draw();     // Draw again with new color & size
            System.out.println("───────────────────");
        }
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — Interface vs Abstract Class

| Feature | Interface | Abstract Class |
|---------|-----------|---------------|
| **Keyword** | \`interface\` / \`implements\` | \`abstract class\` / \`extends\` |
| **Multiple** | ✅ Implement many | ❌ Extend only one |
| **Methods** | Abstract + default (Java 8+) | Abstract + concrete |
| **Variables** | Constants only (\`public static final\`) | Any type |
| **Constructor** | ❌ No | ✅ Yes |
| **Use case** | CAN-DO (capability) | IS-A (relationship) |

---

### 💡 7. Key Points
- Interface = contract/capability
- All variables are \`public static final\` (constants)
- All methods are \`public abstract\` by default
- A class can implement MULTIPLE interfaces (solves multiple inheritance!)
- Java 8 added \`default\` and \`static\` methods
- \`Runnable\`, \`Serializable\`, \`Comparable\` are common built-in interfaces
- Functional interface = exactly ONE abstract method (for lambda expressions)`
  },

  // ── EXCEPTION HANDLING ──
  {
    patterns: ['exception', 'try catch', 'try-catch', 'finally', 'throw', 'throws', 'exception handling', 'error handling', 'checked exception', 'unchecked exception', 'custom exception'],
    quick: `**Exception Handling** is a mechanism to handle runtime errors using \`try-catch-finally\` so your program doesn't crash.
\`try\` = risky code, \`catch\` = handle error, \`finally\` = cleanup (always runs). \`throw\` = throw manually, \`throws\` = declare method might throw.
**Checked** (compiler forces handling) vs **Unchecked** (runtime errors like NullPointerException).

Want a deeper explanation? Just ask! 💡`,
    standard: `## ⚠️ Exception Handling in Java

**Analogy:** Driving a car 🚗 — a pothole (exception) appears. Without handling: you crash! With try-catch: you steer around it and keep driving!

**5 Keywords:** \`try\` (risky code), \`catch\` (handle error), \`finally\` (always runs), \`throw\` (throw manually), \`throws\` (declare in method signature).

**3 Types:** Checked (must handle — IOException), Unchecked (runtime bugs — NullPointerException), Errors (system-level — OutOfMemoryError, don't catch).

\`\`\`java
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;                    // ArithmeticException!
            System.out.println("Result: " + result); // Never reached
        } catch (ArithmeticException e) {
            System.out.println("❌ Cannot divide by zero: " + e.getMessage());
        } finally {
            System.out.println("✅ Finally ALWAYS runs!");  // Cleanup code
        }
        
        // throw — manually throw an exception
        try {
            int age = -5;
            if (age < 0) throw new IllegalArgumentException("Age can't be negative!");
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
    }
}
/* Output:
   ❌ Cannot divide by zero: / by zero
   ✅ Finally ALWAYS runs!
   ❌ Age can't be negative! */
\`\`\`

⚠️ **Common Mistake:** Catching general \`Exception\` before specific ones — always catch specific exceptions FIRST, then general.

💡 **Key Takeaway:** \`try-catch\` = handle errors gracefully. \`finally\` = cleanup. Always use specific exceptions.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Exception Handling

**Problem:** Build a safe calculator:
1. Create a method \`divide(int a, int b)\` that:
   - Throws \`ArithmeticException\` if b is 0
   - Returns the result otherwise
2. Create a method \`parseNumber(String s)\` that:
   - Converts string to int using \`Integer.parseInt()\`
   - Catches \`NumberFormatException\` if string is not a valid number
3. Create a **custom exception** \`NegativeNumberException\` for negative inputs
4. In \`main()\`, test all scenarios: valid division, divide by zero, invalid string, negative number

**Hint:** Use \`throws\` in method signature for checked exceptions, \`throw new\` to throw them!

Try it yourself first! 💪`,
    response: `## ⚠️ Exception Handling in Java — Complete Guide

---

### 📖 1. Definition
**Exception Handling** is a mechanism to **handle runtime errors** so that the normal flow of the program is maintained. An **exception** is an **unexpected event** that disrupts the program during execution.

---

### 🎯 2. Real-Life Analogy
Think of **driving a car** 🚗:
- Normal driving = program running fine
- Pothole on road = exception occurs!
- **Without handling:** You crash! (program terminates) 💥
- **With handling (try-catch):** You see the pothole, steer around it, and keep driving! ✅

Another analogy — **Cooking** 🍳:
- \`try\` = Try cooking a recipe
- \`catch\` = If something goes wrong (burned, spilled), handle it
- \`finally\` = ALWAYS clean the kitchen, whether food came out good or bad!

---

### 📊 3. Exception Types (Each Explained with Definition)

\`\`\`
                    Object
                      │
                  Throwable
                 ┌────┴────┐
              Error      Exception
             (Don't       ┌────┴─────────────┐
              catch!)     │                   │
                   RuntimeException     Checked Exceptions
                  (Unchecked)          (Must handle!)
                   │                   │
        ┌──────────┼──────────┐      IOException
   NullPointer  ArrayIndex  Arithmetic  FileNotFound
   Exception    OutOfBounds  Exception   SQLException
                Exception
\`\`\`

---

#### 🔹 Type 1: Checked Exceptions ✅
**Definition:** Checked exceptions are exceptions that are **checked by the compiler at compile-time**. If your code might throw a checked exception, you MUST handle it using \`try-catch\` or declare it using \`throws\` — otherwise the program **won't compile**.

**When they occur:** When dealing with **external resources** — files, databases, networks.

**Common Examples:**
- \`IOException\` — Error reading/writing a file
- \`FileNotFoundException\` — File doesn't exist
- \`SQLException\` — Database error
- \`ClassNotFoundException\` — Class not found at runtime

\`\`\`java
// Must handle — compiler forces you!
try {
    FileReader fr = new FileReader("data.txt");  // FileNotFoundException
} catch (FileNotFoundException e) {
    System.out.println("File not found!");
}
\`\`\`

---

#### 🔹 Type 2: Unchecked Exceptions ⚡ (Runtime Exceptions)
**Definition:** Unchecked exceptions are exceptions that occur **at runtime** and are **NOT checked by the compiler**. They are usually caused by **programming mistakes** (bugs in logic). You CAN handle them, but the compiler doesn't force you.

**When they occur:** Due to **programming errors** — null references, wrong index, divide by zero.

**Common Examples:**
- \`NullPointerException\` — Calling a method on \`null\`
- \`ArithmeticException\` — Division by zero
- \`ArrayIndexOutOfBoundsException\` — Invalid array index
- \`NumberFormatException\` — Invalid string-to-number conversion
- \`ClassCastException\` — Invalid type casting

\`\`\`java
// Compiler doesn't complain — but crashes at runtime!
String s = null;
s.length();    // NullPointerException!

int[] arr = {1, 2, 3};
arr[10] = 5;   // ArrayIndexOutOfBoundsException!

int x = 10 / 0;  // ArithmeticException!
\`\`\`

---

#### 🔹 Type 3: Errors 💀
**Definition:** Errors are **serious problems** that are NOT meant to be caught or handled by the programmer. They represent issues in the **JVM or system level** — things your program CANNOT fix.

**When they occur:** System-level failures — out of memory, stack overflow.

**Common Examples:**
- \`OutOfMemoryError\` — JVM has no memory left
- \`StackOverflowError\` — Infinite recursion (method calling itself forever)
- \`VirtualMachineError\` — JVM crashes

\`\`\`java
// Causes StackOverflowError — infinite recursion!
void infinite() {
    infinite();  // Keeps calling itself forever → stack overflow!
}
\`\`\`

---

**Summary Table:**
| Type | Definition | Must Handle? | Cause | Examples |
|------|-----------|-------------|-------|----------|
| **Checked** ✅ | Checked at compile-time, MUST handle | YES | External: file, DB, network | IOException, SQLException |
| **Unchecked** ⚡ | Occurs at runtime, NOT checked by compiler | Optional | Programming bugs | NullPointer, ArithmeticException |
| **Error** 💀 | Serious system-level failure | Don't catch! | JVM/system problems | OutOfMemoryError, StackOverflow |

---

### 📝 4. Syntax — 5 Keywords

\`\`\`java
try {
    // Code that MIGHT throw an exception
} catch (ExceptionType1 e) {
    // Handle exception type 1
} catch (ExceptionType2 e) {
    // Handle exception type 2
} finally {
    // ALWAYS executes (cleanup code)
}

// throw — manually throw an exception
throw new ExceptionType("message");

// throws — declare that method might throw
void method() throws ExceptionType { }
\`\`\`

---

### 💻 5. Complete Example Program

\`\`\`java
import java.io.*;

public class ExceptionDemo {
    
    // ═══ BASIC TRY-CATCH-FINALLY ═══
    static void basicExample() {
        System.out.println("═══ Basic Try-Catch-Finally ═══");
        try {
            int result = 10 / 0;  // ArithmeticException!
            System.out.println("Result: " + result);  // Never reaches here
        } catch (ArithmeticException e) {
            System.out.println("❌ Error: Cannot divide by zero!");
            System.out.println("   Message: " + e.getMessage());
        } finally {
            System.out.println("✅ Finally block ALWAYS runs!");
        }
    }
    
    // ═══ MULTIPLE CATCH BLOCKS ═══
    static void multipleCatch() {
        System.out.println("\\n═══ Multiple Catch ═══");
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);     // ArrayIndexOutOfBoundsException
            
            String s = null;
            s.length();                       // NullPointerException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("❌ Array index out of bounds: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("❌ Null pointer: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("❌ Some other error: " + e.getMessage());
        }
    }
    
    // ═══ THROW — Manually throw exception ═══
    static void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException(
                "Age must be 0-150, got: " + age
            );
        }
        System.out.println("Age set to: " + age + " ✅");
    }
    
    // ═══ THROWS — Declare method might throw ═══
    static void readFile(String path) throws FileNotFoundException {
        File file = new File(path);
        if (!file.exists()) {
            throw new FileNotFoundException("File not found: " + path);
        }
        System.out.println("File found: " + path + " ✅");
    }
    
    // ═══ TRY-WITH-RESOURCES (auto-close) ═══
    static void tryWithResources() {
        System.out.println("\\n═══ Try-with-Resources ═══");
        try (BufferedReader br = new BufferedReader(
                new StringReader("Hello from try-with-resources!"))) {
            System.out.println(br.readLine());
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // br is automatically closed! No finally needed!
    }
    
    public static void main(String[] args) {
        basicExample();
        multipleCatch();
        
        // throw example
        System.out.println("\\n═══ Throw ═══");
        try {
            setAge(25);     // ✅ Valid
            setAge(-5);     // ❌ Throws exception
        } catch (IllegalArgumentException e) {
            System.out.println("❌ " + e.getMessage());
        }
        
        // throws example
        System.out.println("\\n═══ Throws ═══");
        try {
            readFile("nonexistent.txt");    // Must handle with try-catch!
        } catch (FileNotFoundException e) {
            System.out.println("❌ " + e.getMessage());
        }
        
        tryWithResources();
    }
}
\`\`\`

**Output:**
\`\`\`
═══ Basic Try-Catch-Finally ═══
❌ Error: Cannot divide by zero!
   Message: / by zero
✅ Finally block ALWAYS runs!

═══ Multiple Catch ═══
❌ Array index out of bounds: Index 10 out of bounds for length 3

═══ Throw ═══
Age set to: 25 ✅
❌ Age must be 0-150, got: -5

═══ Throws ═══
❌ File not found: nonexistent.txt

═══ Try-with-Resources ═══
Hello from try-with-resources!
\`\`\`

---

### 📊 Custom Exception

\`\`\`java
// Define your own exception
class InsufficientBalanceException extends Exception {
    double amount;
    
    InsufficientBalanceException(double amount) {
        super("Insufficient balance! Tried to withdraw: " + amount);
        this.amount = amount;
    }
}

class BankAccount {
    double balance = 1000;
    
    void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException(amount);
        }
        balance -= amount;
        System.out.println("Withdrawn: " + amount + ". Balance: " + balance);
    }
}
\`\`\`

---

### ⚖️ 6. Comparisons

**throw vs throws:**
| Feature | \`throw\` | \`throws\` |
|---------|---------|----------|
| **What** | Actually throws an exception | Declares method MIGHT throw |
| **Where** | Inside method body | In method signature |
| **Followed by** | Exception object | Exception class name(s) |
| **Example** | \`throw new Exception("msg");\` | \`void m() throws IOException\` |

**Checked vs Unchecked:**
| Feature | Checked | Unchecked |
|---------|---------|-----------|
| **When** | Compile-time | Runtime |
| **Must handle?** | ✅ Yes | ❌ Optional |
| **Parent class** | Exception | RuntimeException |
| **Cause** | External (file, network) | Programming bugs (null, divide/0) |

---

### 💡 7. Key Points
- \`try\` = risky code, \`catch\` = handle error, \`finally\` = cleanup (always runs)
- \`throw\` = create & throw exception, \`throws\` = declare method may throw
- Catch specific exceptions BEFORE general \`Exception\`
- \`finally\` runs even if there's a \`return\` in try/catch
- Try-with-resources (Java 7+) auto-closes resources
- Custom exceptions: extend \`Exception\` (checked) or \`RuntimeException\` (unchecked)`
  },

  // ── LOOPS / CONTROL STRUCTURES ──
  {
    patterns: ['loop', 'for loop', 'while loop', 'do while', 'for each', 'enhanced for', 'iteration', 'control structure', 'if else', 'switch case', 'break continue'],
    quick: `**Loops** repeat code: \`for\` (known count), \`while\` (unknown count, checks before), \`do-while\` (runs at least once, checks after), \`for-each\` (arrays/collections).
\`for (int i = 0; i < 5; i++) { }\` — runs 5 times. \`break\` exits loop, \`continue\` skips to next iteration.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🔄 Loops in Java

**Analogy:** \`for\` = running laps 🏃 ("run 10 laps"). \`while\` = eating until full 🍽️ ("eat while hungry"). \`do-while\` = fire drill 🚨 ("do drill first, then check").

**4 Types:** \`for\` (known count), \`while\` (condition-based), \`do-while\` (at least once), \`for-each\` (iterate arrays).

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // for — print 1 to 5
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");  // 1 2 3 4 5
        }
        System.out.println();
        
        // while — halve until < 1
        double num = 100;
        while (num >= 1) {
            System.out.printf("%.0f ", num);  // 100 50 25 12 6 3 1
            num /= 2;
        }
        System.out.println();
        
        // for-each — iterate array
        String[] fruits = {"Apple", "Banana", "Cherry"};
        for (String f : fruits) {
            System.out.println("🍎 " + f);
        }
    }
}
/* Output:
   1 2 3 4 5
   100 50 25 12 6 3 1
   🍎 Apple
   🍎 Banana
   🍎 Cherry */
\`\`\`

⚠️ **Common Mistake:** Using \`=\` instead of \`==\` in loop conditions, or forgetting to update the counter (infinite loop!).

💡 **Key Takeaway:** \`for\` = known count, \`while\` = unknown count, \`do-while\` = at least once, \`for-each\` = arrays.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Loops

**Problem:** Write a Java program that:
1. Prints a **multiplication table** for a number (1 to 10) using \`for\` loop
2. Uses a \`while\` loop to find the **sum of digits** of a number (e.g., 1234 → 1+2+3+4 = 10)
3. Uses a \`do-while\` loop to simulate a **menu system**:
   - 1. Add  2. Subtract  3. Exit
   - Keep showing menu until user picks Exit
4. Uses \`for-each\` to find the **maximum** value in an array

**Bonus:** Print a right-angle triangle pattern of \`*\` for n rows using nested loops.

**Hint:** For sum of digits, use \`% 10\` to get last digit and \`/ 10\` to remove it!

Try it yourself first! 💪`,
    response: `## 🔄 Control Structures & Loops in Java — Complete Guide

---

### 📖 1. Definition
**Control structures** determine the **flow of execution** in a program. Instead of running line by line, they let you make **decisions** (if-else), **repeat** code (loops), and **choose** between options (switch).

---

### 🎯 2. Real-Life Analogy
- **if-else** = Fork in the road 🔀 — take left OR right based on condition
- **for loop** = Running laps 🏃 — "Run 10 laps around the ground" (known count)
- **while loop** = Eating until full 🍽️ — "Keep eating WHILE you're hungry" (unknown count)
- **do-while** = Fire drill 🚨 — "Do the drill first, THEN check if door is locked" (at least once)
- **switch** = Remote control 🎮 — Press button 1, 2, 3, or 4 for different channels

---

### 📊 3. All Control Structure Types

#### A. Decision-Making (Conditional)
\`\`\`java
// ── if-else ──
int marks = 85;
if (marks >= 90) {
    System.out.println("Grade A+ ⭐");
} else if (marks >= 80) {
    System.out.println("Grade A ✅");     // This prints!
} else if (marks >= 70) {
    System.out.println("Grade B");
} else if (marks >= 60) {
    System.out.println("Grade C");
} else {
    System.out.println("Grade F ❌");
}

// ── Ternary operator (short if-else) ──
String result = (marks >= 50) ? "Pass ✅" : "Fail ❌";

// ── switch-case ──
int day = 3;
switch (day) {
    case 1:  System.out.println("Monday");    break;
    case 2:  System.out.println("Tuesday");   break;
    case 3:  System.out.println("Wednesday"); break;  // This prints!
    case 4:  System.out.println("Thursday");  break;
    case 5:  System.out.println("Friday");    break;
    default: System.out.println("Weekend!");  break;
}
\`\`\`

#### B. 4 Types of Loops (Each Explained with Definition)

---

##### 🔹 Type 1: for Loop
**Definition:** A \`for\` loop is used when you **know in advance how many times** you want to repeat a block of code. It has 3 parts in one line: **initialization, condition, and update**.

**When to use:** When the number of repetitions is KNOWN — "Print 1 to 10", "Run 5 times", etc.

**Syntax:** \`for (initialization; condition; update) { body }\`

\`\`\`java
// "Print numbers 1 to 5"
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");   // Output: 1 2 3 4 5
}
// How it works:
// Step 1: int i = 1      (initialization — runs ONCE)
// Step 2: i <= 5?         (condition — checked BEFORE each loop)
// Step 3: execute body    (prints i)
// Step 4: i++             (update — runs AFTER each loop)
// Repeat steps 2-4 until condition is false
\`\`\`

---

##### 🔹 Type 2: while Loop
**Definition:** A \`while\` loop repeats a block of code **as long as the condition is true**. The condition is checked **BEFORE** each iteration. If the condition is false the very first time, the loop body **never executes** (0 iterations possible).

**When to use:** When you DON'T know how many times to repeat — "Keep reading until end of file", "Keep searching until found".

**Syntax:** \`while (condition) { body }\`

\`\`\`java
// "Keep halving until less than 1"
double num = 100;
while (num >= 1) {       // Check BEFORE executing
    System.out.printf("%.2f → ", num);
    num /= 2;
}
// Condition checked FIRST — if num < 1 initially, loop never runs
\`\`\`

---

##### 🔹 Type 3: do-while Loop
**Definition:** A \`do-while\` loop is similar to \`while\`, but the condition is checked **AFTER** the body executes. This means the body is **guaranteed to execute at least once** — even if the condition is false from the start.

**When to use:** When the task MUST happen at least once — "Ask password at least once", "Show menu at least once".

**Syntax:** \`do { body } while (condition);\` (note the semicolon at the end!)

\`\`\`java
// "Ask for password — run at least once"
String password = "java123";
String input;
do {
    input = getUserInput();        // Runs AT LEAST ONCE
    System.out.println("Trying: " + input);
} while (!input.equals(password));  // Check AFTER
System.out.println("Access granted! ✅");
\`\`\`

---

##### 🔹 Type 4: for-each Loop (Enhanced for Loop)
**Definition:** The \`for-each\` loop (also called **enhanced for loop**) is a simplified version of the for loop designed for **iterating through arrays and collections**. You don't need an index variable — it automatically gives you each element one by one.

**When to use:** When you want to traverse ALL elements of an array or collection — "Print all names", "Sum all marks".

**Syntax:** \`for (Type variable : arrayOrCollection) { body }\`

\`\`\`java
// Iterate through a String array
String[] fruits = {"Apple", "Banana", "Cherry"};
for (String fruit : fruits) {
    System.out.println("🍎 " + fruit);
}

// Sum all numbers in an array
int[] numbers = {10, 20, 30, 40, 50};
int sum = 0;
for (int n : numbers) {
    sum += n;
}
System.out.println("Sum = " + sum);  // 150
\`\`\`

---

**Summary Table:**
| Loop | Definition | When to Use | Condition Check | Min Runs |
|------|-----------|-------------|----------------|----------|
| **for** | Known count, 3 parts in one line | "Repeat 10 times" | Before | 0 |
| **while** | Repeat while condition true | "Keep going until done" | Before | 0 |
| **do-while** | Runs at least once, checks after | "Do once, check then" | **After** | **1** |
| **for-each** | Simplified iteration over arrays | "Print all elements" | Before | 0 |

---

### 💻 5. Complete Example — All Loops + break/continue

\`\`\`java
public class LoopDemo {
    public static void main(String[] args) {
        // ── Multiplication table using for loop ──
        int num = 7;
        System.out.println("📊 Multiplication Table of " + num + ":");
        for (int i = 1; i <= 10; i++) {
            System.out.printf("%d × %d = %d%n", num, i, num * i);
        }
        
        // ── Star pattern using nested for loop ──
        System.out.println("\\n⭐ Star Pattern:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
        // Output:
        // *
        // * *
        // * * *
        // * * * *
        // * * * * *
        
        // ── BREAK — exit the loop early ──
        System.out.println("\\n🛑 Break example:");
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                System.out.println("Stopped at " + i + "!");
                break;      // EXIT the loop immediately
            }
            System.out.print(i + " ");
        }
        // Output: 1 2 3 4 5 Stopped at 6!
        
        // ── CONTINUE — skip current iteration ──
        System.out.println("\\n\\n⏭️ Continue example (skip even numbers):");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue;   // SKIP this iteration, go to next
            }
            System.out.print(i + " ");
        }
        // Output: 1 3 5 7 9
        
        // ── Infinite loop (with break condition) ──
        System.out.println("\\n\\n♾️ Controlled infinite loop:");
        int counter = 0;
        while (true) {     // Infinite loop!
            counter++;
            if (counter > 3) break;   // Safety break!
            System.out.println("Iteration " + counter);
        }
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — All Loops

| Feature | for | while | do-while | for-each |
|---------|-----|-------|----------|----------|
| **Count known?** | ✅ Yes | ❌ No | ❌ No | ✅ Yes (collection) |
| **Checks condition** | Before | Before | **After** | Before |
| **Min executions** | 0 | 0 | **1** (always!) | 0 |
| **Use for** | Counted loops | Conditional loops | "At least once" loops | Arrays/Collections |
| **Can modify index?** | ✅ | ✅ | ✅ | ❌ (read-only) |

**break vs continue:**
| | break | continue |
|---|-------|----------|
| **Action** | EXIT the entire loop | SKIP current iteration |
| **After** | Code after loop runs | Next iteration starts |

---

### 💡 7. Key Points
- \`for\` → known iterations ("repeat 10 times")
- \`while\` → unknown iterations, pre-condition ("while hungry, eat")
- \`do-while\` → at least once, post-condition ("do drill, then check")
- \`for-each\` → traverse arrays/collections easily
- \`break\` = stop the loop, \`continue\` = skip to next iteration
- Nested loops = loop inside a loop (for patterns, 2D arrays)`
  },

  // ── CONSTRUCTORS ──
  {
    patterns: ['constructor', 'default constructor', 'parameterized constructor', 'constructor overloading', 'copy constructor', 'constructor chaining', 'this\\(\\)', 'super\\(\\)'],
    quick: `A **constructor** is a special method called automatically when you create an object with \`new\`. It has the SAME name as the class and NO return type.
Types: Default (no params), Parameterized (with params), Copy (duplicates object). \`this()\` chains constructors, \`super()\` calls parent's.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🏗️ Constructors in Java

**Analogy:** Like a **birth certificate** 👶 — when a baby is born, the hospital fills out name, weight, date AUTOMATICALLY. Constructor runs automatically when an object is "born" (created).

**3 Types:** Default (no params — sets defaults), Parameterized (accepts values), Copy (clones another object).

\`\`\`java
class Student {
    String name;
    int age;
    
    // Default constructor
    Student() {
        this.name = "Unknown";
        this.age = 0;
    }
    
    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;     // this.name = field, name = parameter
        this.age = age;
    }
    
    // Copy constructor
    Student(Student other) {
        this.name = other.name;
        this.age = other.age;
    }
    
    void display() {
        System.out.println(name + " (" + age + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();              // Default: Unknown (0)
        Student s2 = new Student("Rahul", 20);   // Parameterized: Rahul (20)
        Student s3 = new Student(s2);            // Copy of s2: Rahul (20)
        s1.display(); s2.display(); s3.display();
    }
}
/* Output:
   Unknown (0)
   Rahul (20)
   Rahul (20) */
\`\`\`

⚠️ **Common Mistake:** If you write ANY constructor, Java stops providing the default one. You must write it yourself if you still need it!

💡 **Key Takeaway:** Constructor = auto-init on \`new\`. Same name as class, no return type. Use \`this()\` for chaining, \`super()\` for parent.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Constructors

**Problem:** Create a \`Book\` class:
1. Fields: \`title\`, \`author\`, \`price\`, \`pages\`
2. **Default constructor** — sets title = "Untitled", price = 0
3. **Parameterized constructor** — takes all 4 values
4. **Constructor chaining** — default calls parameterized with \`this("Untitled", "Unknown", 0, 0)\`
5. **Copy constructor** — takes another Book and copies it
6. Add a \`display()\` method
7. In \`main()\`: create one book each way, display all 3

**Hint:** Remember, \`this()\` must be the FIRST line in a constructor!

Try it yourself first! 💪`,
    response: `## 🏗️ Constructors in Java — Complete Guide

---

### 📖 1. Definition
A **constructor** is a **special method** that is called **automatically** when an object is created using \`new\`. It initializes the object's state (sets initial values for variables).

**Rules:**
- Name MUST match the class name exactly
- Has NO return type (not even void!)
- Called automatically by \`new\` keyword

---

### 🎯 2. Real-Life Analogy
**Birth Certificate** 👶📋:
- When a baby is born, the hospital fills out a birth certificate (name, weight, date)
- This happens **automatically at birth** (not later)
- Similarly, constructor runs **automatically at object creation**

---

### 📊 3. Types of Constructors (Each Explained with Definition)

---

#### 🔹 Type 1: Default Constructor
**Definition:** A Default Constructor is a constructor that takes **NO parameters**. It sets all instance variables to their **default values** (0, null, false, etc.). If you don't write ANY constructor in your class, Java **automatically provides** a default constructor. But if you write ANY constructor (even a parameterized one), Java does NOT provide the default one — you must write it yourself.

**When to use:** When you want to create an object with default/empty values first, and set them later.

\`\`\`java
class Student {
    String name;
    int age;
    
    // Default Constructor — no parameters
    Student() {
        this.name = "Unknown";
        this.age = 0;
        System.out.println("Default constructor called");
    }
}
// Usage: Student s = new Student();
// Result: name = "Unknown", age = 0
\`\`\`

---

#### 🔹 Type 2: Parameterized Constructor
**Definition:** A Parameterized Constructor is a constructor that **accepts one or more parameters** (arguments) so you can pass specific values when creating the object. It allows you to create objects with **custom initial values** right at the time of creation.

**When to use:** When you want to set specific values while creating the object — "Create a student named Rahul with age 20".

\`\`\`java
class Student {
    String name;
    int age;
    
    // Parameterized Constructor — takes values as input
    Student(String name, int age) {
        this.name = name;     // this.name = object's field
        this.age = age;       //       name = parameter passed
    }
}
// Usage: Student s = new Student("Rahul", 20);
// Result: name = "Rahul", age = 20
\`\`\`

---

#### 🔹 Type 3: Copy Constructor
**Definition:** A Copy Constructor creates a **new object by copying the values from an existing object** of the same class. It takes another object of the SAME class as its parameter and copies all the field values. This is useful when you want a **duplicate** of an existing object.

**When to use:** When you want to create an exact copy/clone of an existing object.

\`\`\`java
class Student {
    String name;
    int age;
    
    // Copy Constructor — takes another Student as input
    Student(Student other) {
        this.name = other.name;     // Copy name from other
        this.age = other.age;       // Copy age from other
    }
}
// Usage:
// Student original = new Student("Rahul", 20);
// Student copy = new Student(original);  // copy of Rahul
\`\`\`

---

#### 🔹 Constructor Overloading (Multiple Constructors)
**Definition:** Constructor Overloading means having **multiple constructors in the same class**, each with a **different parameter list**. Java determines which constructor to call based on the arguments you pass during object creation. This allows flexible object creation!

\`\`\`java
class Student {
    Student() { }                              // Default
    Student(String name) { }                   // 1 param
    Student(String name, int age) { }          // 2 params
    Student(Student other) { }                 // Copy
}
// All 4 constructors coexist — Java picks the right one!
\`\`\`

---

#### 🔹 Constructor Chaining (\`this()\` and \`super()\`)
**Definition:** Constructor Chaining is when **one constructor calls another constructor** within the same class (using \`this()\`) or in the parent class (using \`super()\`). This avoids code duplication — the base constructor does the work, and others just redirect to it.

\`\`\`java
class Employee {
    String name;
    int id;
    double salary;
    
    Employee() {
        this("Unknown", 0);    // Calls 2-param constructor
    }
    Employee(String name, int id) {
        this(name, id, 30000); // Calls 3-param constructor
    }
    Employee(String name, int id, double salary) {
        // Base constructor — does the actual work
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
}
\`\`\`

---

**Summary Table:**
| Type | Definition | Parameters | Example |
|------|-----------|-----------|---------|
| **Default** | No params, sets defaults; auto-provided if no constructors exist | None | \`Student()\` |
| **Parameterized** | Accepts values to initialize with specific data | Yes | \`Student("Rahul", 20)\` |
| **Copy** | Creates duplicate by copying another object's values | Object of same class | \`Student(existingStudent)\` |
| **Overloading** | Multiple constructors in same class with different params | Various | Different parameter lists |
| **Chaining** | One constructor calls another using this()/super() | N/A | \`this("name", 0)\` |

---

### 💻 5. Complete Example Program

\`\`\`java
class Student {
    String name;
    int age;
    double marks;
    
    // ── 1. DEFAULT Constructor ──
    Student() {
        this.name = "Unknown";
        this.age = 0;
        this.marks = 0.0;
        System.out.println("📝 Default constructor called");
    }
    
    // ── 2. PARAMETERIZED Constructor ──
    Student(String name, int age, double marks) {
        this.name = name;       // this.name = object's field
        this.age = age;         //       name = parameter
        this.marks = marks;
        System.out.println("📝 Parameterized constructor called for " + name);
    }
    
    // ── 3. COPY Constructor ──
    Student(Student other) {
        this.name = other.name;
        this.age = other.age;
        this.marks = other.marks;
        System.out.println("📝 Copy constructor called, copied from " + other.name);
    }
    
    void display() {
        System.out.printf("  Name: %s, Age: %d, Marks: %.1f%n", name, age, marks);
    }
}

// ── CONSTRUCTOR CHAINING ──
class Employee {
    String name;
    int id;
    double salary;
    
    Employee() {
        this("Unknown", 0);   // Calls the 2-param constructor
        System.out.println("  → Default constructor");
    }
    
    Employee(String name, int id) {
        this(name, id, 30000);  // Calls the 3-param constructor
        System.out.println("  → Two-param constructor");
    }
    
    Employee(String name, int id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
        System.out.println("  → Three-param constructor (base)");
    }
    
    void display() {
        System.out.printf("  %s (ID: %d) — Salary: %.0f%n", name, id, salary);
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        // Default constructor
        Student s1 = new Student();
        s1.display();
        
        System.out.println();
        
        // Parameterized constructor
        Student s2 = new Student("Rahul", 20, 95.5);
        s2.display();
        
        System.out.println();
        
        // Copy constructor
        Student s3 = new Student(s2);
        s3.display();
        
        System.out.println("\\n═══ Constructor Chaining ═══");
        Employee e1 = new Employee();
        e1.display();
        
        System.out.println();
        
        Employee e2 = new Employee("Priya", 101);
        e2.display();
        
        System.out.println();
        
        Employee e3 = new Employee("Amit", 102, 50000);
        e3.display();
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — Constructor vs Method

| Feature | Constructor | Method |
|---------|------------|--------|
| **Name** | Must match class name | Any name |
| **Return type** | No return type | Has return type (or void) |
| **Called by** | \`new\` keyword (automatic) | Explicitly by name |
| **Purpose** | Initialize object | Perform actions |
| **Inherited?** | ❌ No | ✅ Yes |
| **Can use \`this()\`** | ✅ (call another constructor) | ❌ No |

**this() vs super():**
| | \`this()\` | \`super()\` |
|---|----------|-----------|
| Calls | Another constructor in SAME class | Parent class constructor |
| Must be | First line in constructor | First line in constructor |
| Purpose | Constructor chaining | Initialize parent |

---

### 💡 7. Key Points
- Constructor name = class name, no return type
- If you don't write any constructor → Java provides a default one automatically
- If you write ANY constructor → Java does NOT provide default (write it yourself!)
- \`this()\` = call another constructor in same class (chaining)
- \`super()\` = call parent's constructor (must be first line)
- Constructors can be overloaded (multiple with different params)
- Constructors are NOT inherited`
  },

  // ── MULTITHREADING ──
  {
    patterns: ['thread', 'multithreading', 'multi-threading', 'runnable', 'thread lifecycle', 'thread class', 'synchronization', 'synchronized', 'deadlock', 'thread priority', 'daemon thread', 'concurrent'],
    quick: `**Multithreading** = executing multiple tasks simultaneously. A **thread** is the smallest unit of execution.
Create threads by extending \`Thread\` or implementing \`Runnable\` (preferred). Use \`start()\` not \`run()\`!
\`synchronized\` prevents race conditions. Thread states: New → Runnable → Running → Blocked/Waiting → Terminated.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🧵 Multithreading in Java

**Analogy:** A restaurant kitchen 🍳 — 1 chef = slow (single thread). 3 chefs cooking simultaneously = fast (multithreading)! Same kitchen (process), multiple workers (threads).

**Two ways to create:** Extend \`Thread\` class OR implement \`Runnable\` interface (preferred — allows extending another class).

\`\`\`java
// Way 1: Extend Thread
class Downloader extends Thread {
    String file;
    Downloader(String f) { file = f; }
    
    @Override
    public void run() {
        System.out.println("📥 Downloading " + file + "...");
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
        System.out.println("✅ " + file + " done!");
    }
}

// Way 2: Implement Runnable (PREFERRED)
class Printer implements Runnable {
    @Override
    public void run() {
        System.out.println("🖨️ Printing in background...");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Downloader d1 = new Downloader("Movie.mp4");
        Downloader d2 = new Downloader("Song.mp3");
        d1.start();  // start(), NOT run()! run() won't create new thread
        d2.start();  // Both run SIMULTANEOUSLY!
        d1.join();   // Wait for d1 to finish
        d2.join();
        
        Thread t = new Thread(new Printer());
        t.start();
    }
}
/* Output (order may vary):
   📥 Downloading Movie.mp4...
   📥 Downloading Song.mp3...
   ✅ Movie.mp4 done!
   ✅ Song.mp3 done!
   🖨️ Printing in background... */
\`\`\`

⚠️ **Common Mistake:** Calling \`run()\` instead of \`start()\` — \`run()\` executes in the SAME thread (no new thread created)!

💡 **Key Takeaway:** \`Runnable\` is preferred. Always use \`start()\`. Use \`synchronized\` to prevent race conditions.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Multithreading

**Problem:** Simulate a bank with two users:
1. Create a \`BankAccount\` class with a \`synchronized withdraw()\` method
2. Balance starts at 1000
3. Create two threads (Alice and Bob), each trying to withdraw 300 three times
4. Without \`synchronized\`: they might both withdraw when only 300 is left (race condition!)
5. With \`synchronized\`: only one can access at a time (safe!)

**Requirements:**
- Use \`implements Runnable\`
- Print who is withdrawing and the remaining balance
- Test with and without \`synchronized\` to see the difference

**Hint:** The total withdrawals (6 × 300 = 1800) exceed the balance (1000). Only some should succeed!

Try it yourself first! 💪`,
    response: `## 🧵 Multithreading in Java — Complete Guide

---

### 📖 1. Definition
**Multithreading** is the ability of a program to execute **multiple threads (tasks) simultaneously**. A **thread** is the **smallest unit of execution** within a process.

---

### 🎯 2. Real-Life Analogy
**Restaurant Kitchen** 🍳:
- **Single thread** = 1 chef doing everything (cook → serve → clean → repeat) — SLOW!
- **Multithreading** = 3 chefs working simultaneously:
  - Chef 1: Cooking 👨‍🍳
  - Chef 2: Preparing ingredients 🥗
  - Chef 3: Cleaning dishes 🧽
- Same kitchen (process), multiple workers (threads)!

---

### 📊 3. Thread Lifecycle (5 States)

\`\`\`
         ┌─────────┐
         │   NEW   │ ← Thread created, not started
         └────┬────┘
              │ start()
         ┌────▼─────┐
         │ RUNNABLE │ ← Ready to run / actually running
         └────┬─────┘
              │ (scheduler picks)
         ┌────▼─────┐
    ┌───►│ RUNNING  │ ← Executing run() method
    │    └────┬─────┘
    │         │ sleep() / wait() / blocked
    │    ┌────▼──────┐
    │    │ BLOCKED / │ ← Waiting for resource/time
    └────│ WAITING   │
         └────┬──────┘
              │ run() completes
         ┌────▼──────────┐
         │  TERMINATED   │ ← Thread finished
         └───────────────┘
\`\`\`

---

### 📝 4. Ways to Create Threads (Each Defined)

---

#### 🔹 Way 1: Extending \`Thread\` Class
**Definition:** In this approach, we create a **new class that extends** the built-in \`Thread\` class and **override its \`run()\` method**. The \`run()\` method contains the code that will execute in a separate thread. We create an object of our class and call \`start()\` (NOT \`run()\`!) to begin execution.

**When to use:** When the thread class does NOT need to extend any other class. Simpler for small, one-off tasks.

\`\`\`java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + getName());
    }
}
// Usage:
MyThread t = new MyThread();
t.start();  // start(), NOT run()! run() won't create new thread
\`\`\`

---

#### 🔹 Way 2: Implementing \`Runnable\` Interface (PREFERRED ✅)
**Definition:** In this approach, we create a class that **implements the \`Runnable\` interface** and provides the \`run()\` method. Then we pass an instance of this class to a \`Thread\` object. This is **preferred** because Java doesn't support multiple inheritance — if your class already extends another class, you can still implement Runnable.

**When to use:** ALWAYS prefer this! Especially when the class needs to extend another class, or when you want better code reusability and separation of concerns.

\`\`\`java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running!");
    }
}
// Usage:
Thread t = new Thread(new MyRunnable());
t.start();
\`\`\`

---

#### 🔹 Way 3: Using Lambda Expression (Java 8+)
**Definition:** Since \`Runnable\` is a **functional interface** (has only one abstract method), we can use a **lambda expression** to create a thread in a single line. This is the most concise way to create simple threads.

\`\`\`java
Thread t = new Thread(() -> {
    System.out.println("Lambda thread running!");
});
t.start();
\`\`\`

---

**Comparison Table:**
| Feature | extends Thread | implements Runnable ✅ | Lambda (Java 8+) |
|---------|---------------|----------------------|------------------|
| Inheritance | Can't extend another class | Can extend another class | Can extend another class |
| Reusability | Less reusable | More reusable | Inline, no reuse |
| Flexibility | Limited | Better (preferred!) | Most concise |
| Use Case | Simple standalone threads | Production code | Quick one-off tasks |

---

### 💻 5. Complete Example Program

\`\`\`java
// ═══ WAY 1: Extending Thread ═══
class DownloadThread extends Thread {
    String fileName;
    
    DownloadThread(String name) {
        this.fileName = name;
    }
    
    @Override
    public void run() {
        for (int i = 0; i <= 100; i += 25) {
            System.out.println("📥 " + fileName + ": " + i + "% downloaded");
            try {
                Thread.sleep(500);   // Pause for 500ms
            } catch (InterruptedException e) {
                System.out.println("Download interrupted!");
            }
        }
        System.out.println("✅ " + fileName + " COMPLETE!");
    }
}

// ═══ WAY 2: Implementing Runnable ═══
class PrintTask implements Runnable {
    String taskName;
    
    PrintTask(String name) {
        this.taskName = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("📋 " + taskName + " — Step " + i);
            try { Thread.sleep(300); } catch (InterruptedException e) {}
        }
        System.out.println("✅ " + taskName + " done!");
    }
}

// ═══ SYNCHRONIZATION ═══
class BankAccount {
    private int balance = 1000;
    
    // synchronized = only ONE thread at a time
    synchronized void withdraw(String person, int amount) {
        if (balance >= amount) {
            System.out.println(person + " withdrawing " + amount);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            balance -= amount;
            System.out.println(person + " done. Balance: " + balance);
        } else {
            System.out.println(person + " — insufficient balance! ❌");
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("═══ Multiple Downloads (Thread) ═══");
        DownloadThread t1 = new DownloadThread("Movie.mp4");
        DownloadThread t2 = new DownloadThread("Song.mp3");
        
        t1.start();   // Both run SIMULTANEOUSLY!
        t2.start();
        t1.join();    // Wait for t1 to finish
        t2.join();    // Wait for t2 to finish
        
        System.out.println("\\n═══ Tasks (Runnable) ═══");
        Thread r1 = new Thread(new PrintTask("Backup"));
        Thread r2 = new Thread(new PrintTask("Scan"));
        r1.start();
        r2.start();
        r1.join();
        r2.join();
        
        System.out.println("\\n═══ Synchronization ═══");
        BankAccount account = new BankAccount();
        
        Thread user1 = new Thread(() -> {
            for (int i = 0; i < 3; i++) account.withdraw("Alice", 300);
        });
        Thread user2 = new Thread(() -> {
            for (int i = 0; i < 3; i++) account.withdraw("Bob", 300);
        });
        
        user1.start();
        user2.start();
    }
}
\`\`\`

---

### ⚖️ 6. Key Comparisons

**Thread vs Runnable:**
| Feature | Thread (extends) | Runnable (implements) ✅ |
|---------|-----------------|------------------------|
| Inheritance | Blocks other inheritance | Free to extend |
| Flexibility | Less | More |
| Best practice | Simple cases | **Preferred!** |

**synchronized vs volatile:**
| Feature | synchronized | volatile |
|---------|-------------|----------|
| Scope | Block of code | Single variable |
| Blocking | Yes | No |
| Use for | Multiple operations | Simple read/write |

---

### 💡 7. Key Points
- Thread = smallest unit of execution
- \`start()\` begins a thread (NOT \`run()\` — run doesn't create new thread!)
- \`sleep(ms)\` — pauses thread for milliseconds
- \`join()\` — wait for thread to complete
- \`synchronized\` — only one thread accesses at a time (prevents race condition)
- Deadlock = two threads waiting for each other forever
- Implement Runnable is PREFERRED over extending Thread
- Thread priorities: MIN(1), NORM(5), MAX(10)`
  },

  // ── DATA TYPES ──
  {
    patterns: ['data type', 'primitive', 'int float double', 'char boolean', 'byte short long', 'type casting', 'widening', 'narrowing', 'wrapper class'],
    quick: `Java has **8 primitive types**: \`byte\`(1B), \`short\`(2B), \`int\`(4B), \`long\`(8B), \`float\`(4B), \`double\`(8B), \`char\`(2B), \`boolean\`(1b).
Most common: \`int\` for whole numbers, \`double\` for decimals, \`boolean\` for true/false.
Widening (small→big) = automatic. Narrowing (big→small) = needs explicit cast \`(int)\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📦 Data Types in Java

**Analogy:** Kitchen containers 🍳 — small cup (\`byte\`), medium jar (\`int\`), large bucket (\`long\`). Choose the right container for what you're storing!

Java has **8 primitive types** that store values directly, and **reference types** (String, arrays, objects) that store memory addresses.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // Integer types
        byte age = 25;                          // 1 byte: -128 to 127
        int salary = 75000;                     // 4 bytes: most common!
        long population = 8000000000L;          // 8 bytes: needs L suffix
        
        // Decimal types
        float temp = 36.6f;                     // 4 bytes: needs f suffix
        double pi = 3.141592653589793;          // 8 bytes: default decimal
        
        // Other
        char grade = 'A';                       // 2 bytes: single quotes!
        boolean passed = true;                  // true or false only
        
        // Type casting
        int marks = 95;
        double marksD = marks;                  // Widening: automatic! (95.0)
        double price = 99.99;
        int priceI = (int) price;               // Narrowing: manual cast! (99)
        
        System.out.println("Salary: " + salary);
        System.out.println("Pi: " + pi);
        System.out.println("Widening: " + marks + " → " + marksD);
        System.out.println("Narrowing: " + price + " → " + priceI);
    }
}
/* Output:
   Salary: 75000
   Pi: 3.141592653589793
   Widening: 95 → 95.0
   Narrowing: 99.99 → 99 */
\`\`\`

⚠️ **Common Mistake:** Forgetting \`L\` suffix for \`long\` and \`f\` suffix for \`float\` — without them, the compiler treats the values as \`int\` and \`double\`.

💡 **Key Takeaway:** Use \`int\` for whole numbers, \`double\` for decimals. Widening = safe (automatic). Narrowing = risky (manual cast needed).

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Data Types

**Problem:** Create a student report card system:
1. Declare variables for: name (String), rollNo (int), marks in 5 subjects (double array), grade (char), passed (boolean)
2. Calculate total marks and average
3. Determine grade: A (>=90), B (>=80), C (>=70), D (>=60), F (<60)
4. Set \`passed = (average >= 50)\`
5. Display everything formatted nicely

**Bonus:** Demonstrate type casting by converting the double average to int and showing what data is lost.

**Hint:** Use a \`for-each\` loop to sum the marks array!

Try it yourself first! 💪`,
    response: `## 📦 Data Types in Java — Complete Guide

---

### 📖 1. Definition
A **data type** specifies the **type and size** of data that a variable can hold. Java is **strongly typed** — every variable MUST have a declared type.

---

### 🎯 2. Real-Life Analogy
Think of **containers in a kitchen** 🍳:
- Small cup (byte) → holds a little
- Medium jar (int) → holds moderate amount
- Large bucket (long) → holds a lot
- You MUST choose the right container for what you're storing!

---

### 📊 3. All 8 Primitive Data Types (Each Explained)

Java has **two categories** of data types:

**A. Primitive Types (8 types):** Store actual values directly in memory.
**B. Non-Primitive (Reference) Types:** Store memory ADDRESSES (references to objects) — String, Array, Class, Interface.

---

#### 🔢 Integer Types (4 types — store whole numbers)

##### 🔹 \`byte\` — Smallest integer type
**Definition:** \`byte\` stores whole numbers from **-128 to 127**. Uses only **1 byte (8 bits)** of memory. Best for saving memory in large arrays when the values are small.
\`\`\`java
byte age = 25;         // Valid (-128 to 127)
byte value = 130;      // ❌ ERROR! Out of range
\`\`\`

##### 🔹 \`short\` — Short-range integer
**Definition:** \`short\` stores whole numbers from **-32,768 to 32,767**. Uses **2 bytes (16 bits)**. Rarely used — only when memory savings matter and values fit this range.
\`\`\`java
short year = 2025;     // Valid
short pincode = 12345; // Valid
\`\`\`

##### 🔹 \`int\` — Most commonly used integer ⭐
**Definition:** \`int\` stores whole numbers from **-2,147,483,648 to 2,147,483,647** (approximately ±2.1 billion). Uses **4 bytes (32 bits)**. This is the **default and most commonly used** integer type in Java. Use \`int\` for most whole number needs.
\`\`\`java
int salary = 75000;      // ✅ Most common choice!
int count = 0;
int distance = -500;
\`\`\`

##### 🔹 \`long\` — Very large integers
**Definition:** \`long\` stores very large whole numbers. Uses **8 bytes (64 bits)**. The value **must end with \`L\`** suffix. Use when \`int\` is too small — like population counts, file sizes, timestamps.
\`\`\`java
long worldPopulation = 8000000000L;  // Must add L suffix!
long fileSize = 10485760L;           // 10 MB in bytes
\`\`\`

---

#### 🔢 Floating-Point Types (2 types — store decimal numbers)

##### 🔹 \`float\` — Single precision decimals
**Definition:** \`float\` stores decimal numbers with up to **7 digits of precision**. Uses **4 bytes (32 bits)**. The value **must end with \`f\`** suffix. Use when you need decimals but don't need high precision.
\`\`\`java
float temperature = 36.6f;   // Must add f suffix!
float pi = 3.14f;
\`\`\`

##### 🔹 \`double\` — Double precision decimals ⭐
**Definition:** \`double\` stores decimal numbers with up to **15 digits of precision**. Uses **8 bytes (64 bits)**. This is the **default decimal type** in Java — use \`double\` for most decimal calculations.
\`\`\`java
double price = 99.99;              // Default decimal type
double pi = 3.141592653589793;     // More precise than float
\`\`\`

---

#### 🔤 Character & Boolean Types

##### 🔹 \`char\` — Single character
**Definition:** \`char\` stores a **single character** using Unicode encoding. Uses **2 bytes (16 bits)**. Value must be enclosed in **single quotes** (\`'A'\`, not \`"A"\`). Can also store Unicode values (emojis, symbols, other languages).
\`\`\`java
char grade = 'A';           // Single character in single quotes
char symbol = '\\u0041';     // Unicode for 'A'
char digit = '9';           // This is CHARACTER '9', not number 9!
\`\`\`

##### 🔹 \`boolean\` — True or False
**Definition:** \`boolean\` stores only **two possible values: \`true\` or \`false\`**. It represents **1 bit of information**, but the JVM typically uses **1 byte** of memory internally. Used for conditions, flags, and logical operations.
\`\`\`java
boolean isPassed = true;
boolean hasLicense = false;
boolean isAdult = (age >= 18);   // Stores result of condition
\`\`\`

---

**Summary Table:**
| Type | Size | Range | Default | Use Case |
|------|------|-------|---------|----------|
| **byte** | 1 byte | -128 to 127 | 0 | Memory-saving, small values |
| **short** | 2 bytes | -32,768 to 32,767 | 0 | Rarely used |
| **int** ⭐ | 4 bytes | ±2.1 billion | 0 | **Most common for whole numbers** |
| **long** | 8 bytes | Very large | 0L | Population, timestamps |
| **float** | 4 bytes | 7 decimal digits | 0.0f | Low-precision decimals |
| **double** ⭐ | 8 bytes | 15 decimal digits | 0.0 | **Most common for decimals** |
| **char** | 2 bytes | 0-65,535 (Unicode) | '\\u0000' | Single character |
| **boolean** | 1 bit* | true / false | false | Conditions, flags |

> *boolean represents 1 bit of information (true/false), but JVM uses 1 byte internally.

---

### 📝 4. Type Casting (2 Types — Each Explained)

---

#### 🔹 Type 1: Widening Casting (Implicit / Automatic)
**Definition:** Widening casting is when a **smaller data type is automatically converted to a larger data type** by the Java compiler. It is **safe** because no data is lost — the bigger container can always hold the smaller value. Java does this **automatically** without any special syntax.

**Direction:** \`byte → short → int → long → float → double\`

\`\`\`java
int num = 100;
double d = num;      // Automatic! int → double (100.0)
System.out.println(d);  // 100.0 — no data lost!

byte b = 25;
int i = b;           // Automatic! byte → int
long l = i;          // Automatic! int → long
\`\`\`

---

#### 🔹 Type 2: Narrowing Casting (Explicit / Manual)
**Definition:** Narrowing casting is when a **larger data type is manually converted to a smaller data type** by the programmer. It is **risky** because data may be lost (decimal part cut off, or value too big for small container). You MUST write the cast operator \`(type)\` explicitly.

**Direction:** \`double → float → long → int → short → byte\`

\`\`\`java
double price = 99.99;
int rounded = (int) price;   // Manual cast with (int)!
System.out.println(rounded); // 99 — decimal .99 is LOST!

long bigNum = 100000;
int smaller = (int) bigNum;  // Manual cast with (int)!
\`\`\`

**Summary:**
| Type | Direction | Automatic? | Data Loss? | Syntax |
|------|----------|-----------|-----------|--------|
| **Widening** | Small → Big | ✅ Yes | ❌ No | \`double d = myInt;\` |
| **Narrowing** | Big → Small | ❌ No (must cast) | ⚠️ Possible | \`int i = (int) myDouble;\` |

---

### 💻 5. Complete Example Program

\`\`\`java
public class DataTypeDemo {
    public static void main(String[] args) {
        // ═══ All 8 Primitive Types ═══
        byte   studentAge = 20;
        short  pinCode = 12345;
        int    salary = 75000;
        long   worldPopulation = 8000000000L;  // L suffix for long!
        float  temperature = 36.6f;            // f suffix for float!
        double pi = 3.141592653589793;
        char   grade = 'A';
        boolean isPassed = true;
        
        System.out.println("byte   : " + studentAge);
        System.out.println("short  : " + pinCode);
        System.out.println("int    : " + salary);
        System.out.println("long   : " + worldPopulation);
        System.out.println("float  : " + temperature);
        System.out.println("double : " + pi);
        System.out.println("char   : " + grade);
        System.out.println("boolean: " + isPassed);
        
        // ═══ Type Casting ═══
        // Widening (automatic)
        int marks = 95;
        double marksDouble = marks;  // int → double automatically
        System.out.println("\\nWidening: " + marks + " → " + marksDouble);
        
        // Narrowing (manual)
        double price = 99.99;
        int priceInt = (int) price;  // Must cast! Loses .99
        System.out.println("Narrowing: " + price + " → " + priceInt);
        
        // char ↔ int conversion
        char letter = 'A';
        int ascii = letter;          // char → int (ASCII value)
        System.out.println("\\n'" + letter + "' = ASCII " + ascii);  // 65
        
        char fromInt = (char) 66;    // int → char
        System.out.println("66 = '" + fromInt + "'");  // B
        
        // ═══ Wrapper Classes ═══
        Integer intObj = Integer.valueOf(42);     // Boxing
        int intVal = intObj.intValue();           // Unboxing
        int autoUnbox = intObj;                   // Auto-unboxing
        Integer autoBox = 42;                     // Auto-boxing
        
        // Parsing strings to numbers
        int parsed = Integer.parseInt("123");
        double parsedD = Double.parseDouble("3.14");
        System.out.println("\\nParsed: " + parsed + ", " + parsedD);
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — Primitive vs Wrapper

| Feature | Primitive | Wrapper Class |
|---------|-----------|--------------|
| **Type** | \`int\`, \`double\`, \`char\`... | \`Integer\`, \`Double\`, \`Character\`... |
| **Stored** | Actual value | Object reference |
| **Null** | ❌ Cannot be null | ✅ Can be null |
| **Collections** | ❌ Can't use | ✅ ArrayList<Integer> |
| **Performance** | Faster | Slightly slower |
| **Default** | 0, 0.0, false, '\\u0000' | null |

---

### 💡 7. Key Points
- Java has 8 primitive types: byte, short, int, long, float, double, char, boolean
- \`int\` is the most commonly used (4 bytes)
- \`long\` needs \`L\` suffix, \`float\` needs \`f\` suffix
- Widening = automatic (small→big), Narrowing = manual cast (big→small)
- Wrapper classes: \`Integer\`, \`Double\`, \`Boolean\` etc. (for collections)
- Auto-boxing/unboxing converts between primitive ↔ wrapper automatically`
  },

  // ── ARRAYS ──
  {
    patterns: ['array', 'arrays', '1d array', '2d array', 'multidimensional array', 'array declaration', 'array initialization', 'string array'],
    quick: `An **array** is a fixed-size container storing multiple values of the SAME type. Index starts at **0**.
\`int[] marks = {90, 85, 78};\` — access with \`marks[0]\` (90). Length: \`marks.length\`. 2D: \`int[][] matrix = new int[3][3];\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📊 Arrays in Java

**Analogy:** School lockers 🔢 — a row of numbered lockers (0 to 9), each holding one item of the same type. Access by number: "Give me locker #3."

An **array** stores multiple values of the SAME type in contiguous memory. Size is FIXED after creation.

\`\`\`java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // 1D Array
        int[] marks = {90, 85, 78, 92, 88};
        System.out.println("First: " + marks[0]);     // 90 (index starts at 0!)
        System.out.println("Length: " + marks.length); // 5
        
        // Sum using for-each
        int sum = 0;
        for (int m : marks) sum += m;
        System.out.println("Average: " + (double) sum / marks.length);
        
        // Sort
        Arrays.sort(marks);
        System.out.println("Sorted: " + Arrays.toString(marks));
        
        // 2D Array
        int[][] matrix = {{1,2,3}, {4,5,6}, {7,8,9}};
        System.out.println("matrix[1][2] = " + matrix[1][2]);  // 6
    }
}
/* Output:
   First: 90
   Length: 5
   Average: 86.6
   Sorted: [78, 85, 88, 90, 92]
   matrix[1][2] = 6 */
\`\`\`

⚠️ **Common Mistake:** Accessing \`arr[arr.length]\` instead of \`arr[arr.length - 1]\` — causes \`ArrayIndexOutOfBoundsException\`!

💡 **Key Takeaway:** Index starts at 0. Size is fixed. Use \`Arrays.sort()\` and \`Arrays.toString()\` for common operations.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Arrays

**Problem:** Write a program that:
1. Creates an array of 10 student marks (hardcoded or user input)
2. Finds the **maximum**, **minimum**, and **average**
3. Counts how many students **passed** (marks >= 50) and **failed**
4. Creates a **2D array** (3×3 matrix) and prints it in matrix format
5. Finds the **sum of diagonal elements** of the matrix

**Bonus:** Reverse the 1D array without using a second array (swap in-place)!

**Hint:** For the diagonal, elements are at \`matrix[i][i]\` where i goes from 0 to length-1.

Try it yourself first! 💪`,
    response: `## 📊 Arrays in Java — Complete Guide

---

### 📖 1. Definition
An **array** is a **fixed-size container** that stores **multiple values of the SAME type** in contiguous memory. Each element is accessed by its **index** (position number starting from 0).

---

### 🎯 2. Real-Life Analogy
**School Lockers** 🔢:
- A row of 10 lockers, numbered 0 to 9
- Each locker holds ONE item (same type)
- You access a locker by its NUMBER: "Give me locker #3"

---

### 📝 3. Syntax — Declaration & Initialization

\`\`\`java
// Method 1: Declare then initialize
int[] marks = new int[5];       // Creates array of 5 integers
marks[0] = 90;                  // Set first element (index 0)
marks[1] = 85;
marks[2] = 78;

// Method 2: Declare + Initialize together
int[] scores = {90, 85, 78, 92, 88};  // Size = 5 automatically

// Method 3: Using new with values
String[] names = new String[]{"Alice", "Bob", "Charlie"};

// 2D Array (matrix / table)
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
\`\`\`

---

### 💻 4. Complete Example Program

\`\`\`java
import java.util.Arrays;

public class ArrayDemo {
    public static void main(String[] args) {
        // ═══ 1D Array ═══
        int[] marks = {90, 85, 78, 92, 88};
        
        System.out.println("═══ 1D Array ═══");
        System.out.println("Length: " + marks.length);
        System.out.println("Element at index 0: " + marks[0]);  // 90
        System.out.println("Element at index 4: " + marks[4]);  // 88
        
        // Print all elements
        System.out.print("All marks: ");
        for (int i = 0; i < marks.length; i++) {
            System.out.print(marks[i] + " ");
        }
        
        // For-each (simpler)
        System.out.print("\\nUsing for-each: ");
        for (int m : marks) {
            System.out.print(m + " ");
        }
        
        // Find sum and average
        int sum = 0;
        int max = marks[0], min = marks[0];
        for (int m : marks) {
            sum += m;
            if (m > max) max = m;
            if (m < min) min = m;
        }
        System.out.println("\\nSum: " + sum);
        System.out.println("Average: " + (double)sum / marks.length);
        System.out.println("Max: " + max + ", Min: " + min);
        
        // Sort array
        Arrays.sort(marks);
        System.out.println("Sorted: " + Arrays.toString(marks));
        
        // ═══ 2D Array (Matrix) ═══
        System.out.println("\\n═══ 2D Array ═══");
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%3d", matrix[i][j]);
            }
            System.out.println();
        }
        
        System.out.println("Element [1][2] = " + matrix[1][2]); // 6
        
        // ═══ String Array ═══
        System.out.println("\\n═══ String Array ═══");
        String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry"};
        for (String fruit : fruits) {
            System.out.println("  🍎 " + fruit);
        }
    }
}
\`\`\`

---

### ⚖️ 5. Comparison — Array vs ArrayList

| Feature | Array | ArrayList |
|---------|-------|-----------|
| **Size** | Fixed (cannot change) | Dynamic (grows/shrinks) |
| **Type** | Primitive + Objects | Objects only (use wrappers) |
| **Syntax** | \`int[] arr = new int[5];\` | \`ArrayList<Integer> list = new ArrayList<>();\` |
| **Length** | \`arr.length\` (property) | \`list.size()\` (method) |
| **Add element** | \`arr[i] = value;\` | \`list.add(value);\` |
| **Performance** | Faster | Slightly slower |

---

### 💡 6. Key Points
- Index starts at **0** (not 1!)
- \`array.length\` gives the size (property, no parentheses)
- Array size is FIXED after creation
- \`ArrayIndexOutOfBoundsException\` if you access invalid index
- Use \`Arrays.sort()\` to sort, \`Arrays.toString()\` to print
- 2D array = array of arrays (\`int[][]\`)`
  },

  // ── JDBC ──
  {
    patterns: ['jdbc', 'database connection', 'sql query java', 'statement java', 'preparedstatement', 'resultset', 'driver manager', 'connect to database', 'mysql java'],
    quick: `**JDBC** (Java Database Connectivity) connects Java programs to databases (MySQL, Oracle, etc.).
7 steps: Import → Load driver → Connect → Create Statement → Execute SQL → Process ResultSet → Close.
Always use \`PreparedStatement\` (prevents SQL injection!), not plain \`Statement\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🗄️ JDBC in Java

**Analogy:** Restaurant ordering 🍽️ — You (Java) want food (data) from the kitchen (database). The waiter (JDBC driver) takes your order (SQL) and brings food back (ResultSet).

**7 Steps:** Import → Load driver → \`DriverManager.getConnection()\` → Create Statement → Execute SQL → Process ResultSet → Close.

\`\`\`java
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        
        try (Connection conn = DriverManager.getConnection(url, "root", "password")) {
            System.out.println("✅ Connected!");
            
            // INSERT using PreparedStatement (SAFE — prevents SQL injection!)
            String sql = "INSERT INTO students (name, marks) VALUES (?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, "Rahul");   // ? #1 = name
            pstmt.setDouble(2, 95.5);      // ? #2 = marks
            pstmt.executeUpdate();
            
            // SELECT
            ResultSet rs = conn.createStatement()
                .executeQuery("SELECT * FROM students");
            while (rs.next()) {
                System.out.println(rs.getString("name") + ": " + rs.getDouble("marks"));
            }
        } catch (SQLException e) {
            System.out.println("❌ Error: " + e.getMessage());
        }
    }
}
\`\`\`

⚠️ **Common Mistake:** Using \`Statement\` with string concatenation (\`"WHERE name='" + name + "'"\`) — vulnerable to SQL injection! Always use \`PreparedStatement\` with \`?\` placeholders.

💡 **Key Takeaway:** Use \`PreparedStatement\` always. \`executeQuery()\` for SELECT, \`executeUpdate()\` for INSERT/UPDATE/DELETE. Close connections!

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — JDBC

**Problem:** Create a Student Management System:
1. Create a table \`students(id INT AUTO_INCREMENT, name VARCHAR, age INT, marks DOUBLE)\`
2. Write methods for:
   - \`insertStudent(name, age, marks)\` using PreparedStatement
   - \`getAllStudents()\` that prints all records
   - \`updateMarks(name, newMarks)\` that updates a student's marks
   - \`deleteStudent(name)\` that removes a student
3. In \`main()\`: insert 3 students, display all, update one, delete one, display again

**Requirements:**
- Use \`PreparedStatement\` for ALL operations (not Statement)
- Use try-with-resources for auto-closing
- Handle \`SQLException\` properly

**Hint:** \`executeUpdate()\` returns the number of affected rows — check if it's > 0!

Try it yourself first! 💪`,
    response: `## 🗄️ JDBC in Java — Complete Guide

---

### 📖 1. Definition
**JDBC (Java Database Connectivity)** is a Java API that allows Java programs to **connect to any database** (MySQL, Oracle, PostgreSQL), **send SQL queries**, and **process results**.

---

### 🎯 2. Real-Life Analogy
**Restaurant Ordering** 🍽️:
- You (Java Program) want food (data) from the kitchen (database)
- The Waiter (JDBC Driver) takes your order and brings food back
- The Menu (SQL) is the language you use to order

---

### 📊 3. 4 Types of JDBC Drivers

| Type | Name | How It Works | Used Today? |
|------|------|-------------|-------------|
| Type 1 | JDBC-ODBC Bridge | Java → ODBC → DB | ❌ Removed in Java 8 |
| Type 2 | Native API | Java → C lib → DB | ❌ Rarely |
| Type 3 | Network Protocol | Java → Middleware → DB | ⚠️ Sometimes |
| **Type 4** | **Thin Driver** ⭐ | **Java → DB (direct!)** | **✅ Always!** |

---

### 📝 4. 7 Steps of JDBC

\`\`\`
Step 1: Import java.sql package
Step 2: Load the JDBC driver
Step 3: Establish connection
Step 4: Create Statement object
Step 5: Execute SQL query
Step 6: Process ResultSet
Step 7: Close connection
\`\`\`

---

### 💻 5. Complete Example Program

\`\`\`java
import java.sql.*;

public class JDBCDemo {
    public static void main(String[] args) {
        // Connection details
        String url = "jdbc:mysql://localhost:3306/schoolDB";
        String user = "root";
        String pass = "password";
        
        // Try-with-resources — auto-closes everything!
        try (
            // Step 2 & 3: Load driver + Connect
            Connection conn = DriverManager.getConnection(url, user, pass);
        ) {
            System.out.println("✅ Connected to database!");
            
            // ═══ CREATE TABLE ═══
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(
                "CREATE TABLE IF NOT EXISTS students (" +
                "id INT PRIMARY KEY AUTO_INCREMENT, " +
                "name VARCHAR(100) NOT NULL, " +
                "age INT, " +
                "marks DOUBLE)"
            );
            System.out.println("✅ Table created!");
            
            // ═══ INSERT — Using PreparedStatement (SAFE!) ═══
            String insertSQL = "INSERT INTO students (name, age, marks) VALUES (?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(insertSQL);
            
            // Student 1
            pstmt.setString(1, "Rahul");    // ? #1
            pstmt.setInt(2, 20);            // ? #2
            pstmt.setDouble(3, 95.5);       // ? #3
            pstmt.executeUpdate();
            
            // Student 2 (reuse!)
            pstmt.setString(1, "Priya");
            pstmt.setInt(2, 19);
            pstmt.setDouble(3, 88.0);
            pstmt.executeUpdate();
            System.out.println("✅ Students inserted!");
            
            // ═══ SELECT — Query data ═══
            ResultSet rs = stmt.executeQuery("SELECT * FROM students ORDER BY marks DESC");
            
            System.out.println("\\n📋 Student Records:");
            System.out.println("─────────────────────────────────");
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                double marks = rs.getDouble("marks");
                System.out.printf("ID: %d | %s (Age: %d) | Marks: %.1f%n",
                                  id, name, age, marks);
            }
            
            // ═══ UPDATE ═══
            PreparedStatement updateStmt = conn.prepareStatement(
                "UPDATE students SET marks = ? WHERE name = ?"
            );
            updateStmt.setDouble(1, 100.0);
            updateStmt.setString(2, "Rahul");
            int updated = updateStmt.executeUpdate();
            System.out.println("\\n✅ " + updated + " row(s) updated!");
            
            // ═══ DELETE ═══
            PreparedStatement deleteStmt = conn.prepareStatement(
                "DELETE FROM students WHERE marks < ?"
            );
            deleteStmt.setDouble(1, 50.0);
            int deleted = deleteStmt.executeUpdate();
            System.out.println("✅ " + deleted + " row(s) deleted!");
            
        } catch (SQLException e) {
            System.out.println("❌ Database error: " + e.getMessage());
        }
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — Statement vs PreparedStatement

| Feature | Statement | PreparedStatement ⭐ |
|---------|-----------|---------------------|
| **SQL** | String concatenation | \`?\` placeholders |
| **Compiled** | Every time 🐌 | Once (pre-compiled) 🚀 |
| **Speed** | Slow | **Fast** |
| **SQL Injection** | ❌ Vulnerable! | ✅ **Safe!** |
| **Reusable** | No | Yes |
| **Use for** | Simple one-time | **Everything!** ⭐ |

**executeQuery() vs executeUpdate():**
| Method | Used For | Returns |
|--------|----------|---------|
| \`executeQuery()\` | SELECT | ResultSet |
| \`executeUpdate()\` | INSERT, UPDATE, DELETE | int (row count) |

---

### 💡 7. Key Points
- JDBC = Java to Database bridge (\`java.sql\` package)
- Type 4 (Thin Driver) is what everyone uses — pure Java, fastest
- 7 steps: Import → Load → Connect → Statement → Execute → Process → Close
- ALWAYS use PreparedStatement (prevents SQL injection!)
- \`?\` placeholders, setXxx(index, value) — index starts at **1** not 0
- Use try-with-resources for auto-closing connections
- ResultSet getter methods: getInt(), getString(), getDouble() etc.`
  },

  // ── STRING ──
  {
    patterns: ['string', 'string class', 'string methods', 'string pool', 'immutable string', 'string comparison', 'string concatenation', 'stringbuilder', 'stringbuffer'],
    quick: `**String** is an **immutable** object in Java (once created, can't be changed). Stored in **String Pool** for memory efficiency.
\`==\` compares references, \`.equals()\` compares content — always use \`.equals()\` for Strings!
Key methods: \`length()\`, \`charAt()\`, \`substring()\`, \`toUpperCase()\`, \`indexOf()\`, \`trim()\`, \`split()\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📝 String in Java

**Analogy:** Stone carving vs whiteboard 🪨 — A \`String\` is like writing on stone (can't change it, immutable). A \`StringBuilder\` is like a whiteboard (erase and rewrite freely).

Strings are **immutable** — every modification creates a NEW object. Java uses a **String Pool** to reuse identical strings.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        // String Pool
        String s1 = "Hello";
        String s2 = "Hello";          // Same reference from pool!
        String s3 = new String("Hello"); // Different object on heap
        
        System.out.println(s1 == s2);        // true  (same pool reference)
        System.out.println(s1 == s3);        // false (different objects)
        System.out.println(s1.equals(s3));   // true  (same content ✅)
        
        // Common methods
        String name = "  Java Programming  ";
        System.out.println(name.trim());                // "Java Programming"
        System.out.println(name.trim().toUpperCase());  // "JAVA PROGRAMMING"
        System.out.println(name.trim().substring(0,4)); // "Java"
        System.out.println(name.trim().contains("Pro")); // true
        
        // StringBuilder (mutable — efficient for loops!)
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.append(i).append(" ");
        System.out.println(sb.toString());  // "1 2 3 4 5 "
    }
}
\`\`\`

⚠️ **Common Mistake:** Using \`==\` to compare String content — it compares references, not values! Always use \`.equals()\`.

💡 **Key Takeaway:** Strings are immutable. Use \`StringBuilder\` for frequent concatenation (e.g., in loops). \`.equals()\` for content comparison.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — String

**Problem:** Create a string utility program:
1. Take a sentence: "Java is a powerful programming language"
2. Count the **number of words** and **vowels**
3. **Reverse** the string without \`StringBuilder.reverse()\`
4. Check if a given word is a **palindrome** (e.g., "madam")
5. Replace all spaces with hyphens: "Java-is-a-powerful-programming-language"
6. **Extract** and print all words longer than 4 characters

**Bonus:** Compare performance — concatenate "Hello" 10000 times using String \`+=\` vs StringBuilder. Print time taken by each!

**Hint:** Use \`split(" ")\` to get words array, \`charAt(i)\` to access characters.

Try it yourself first! 💪`,
    response: `## 📝 String in Java — Complete Guide

---

### 📖 1. Definition
A **String** is a sequence of characters. In Java, String is an **object** (not a primitive) of the \`java.lang.String\` class. Strings are **immutable** — once created, they **cannot be changed**.

---

### 🎯 2. Real-Life Analogy
**Stone Carving** 🪨:
- Once you carve text on stone, you CAN'T erase/change it
- Want different text? You need a NEW stone!
- That's why String is called **immutable**

**Whiteboard** (StringBuilder) 📝:
- You can erase and rewrite freely — **mutable**

---

### 📝 3. Syntax — Creating Strings

\`\`\`java
// Way 1: String literal (uses String Pool)
String s1 = "Hello";

// Way 2: Using new keyword (creates in Heap)
String s2 = new String("Hello");

// Way 3: From char array
char[] chars = {'J', 'a', 'v', 'a'};
String s3 = new String(chars);   // "Java"
\`\`\`

---

### 📊 4. Important String Methods

| Method | What It Does | Example | Result |
|--------|-------------|---------|--------|
| \`length()\` | Returns length | \`"Hello".length()\` | 5 |
| \`charAt(i)\` | Character at index | \`"Hello".charAt(1)\` | 'e' |
| \`substring(a,b)\` | Extract portion | \`"Hello".substring(1,4)\` | "ell" |
| \`toUpperCase()\` | All uppercase | \`"hello".toUpperCase()\` | "HELLO" |
| \`toLowerCase()\` | All lowercase | \`"HELLO".toLowerCase()\` | "hello" |
| \`trim()\` | Remove spaces | \`"  hi  ".trim()\` | "hi" |
| \`equals()\` | Compare content | \`"abc".equals("abc")\` | true |
| \`equalsIgnoreCase()\` | Compare (no case) | \`"ABC".equalsIgnoreCase("abc")\` | true |
| \`contains()\` | Check substring | \`"Hello".contains("ell")\` | true |
| \`indexOf()\` | Find position | \`"Hello".indexOf("l")\` | 2 |
| \`replace()\` | Replace chars | \`"Hello".replace('l','r')\` | "Herro" |
| \`split()\` | Split by delimiter | \`"A,B,C".split(",")\` | ["A","B","C"] |
| \`isEmpty()\` | Check if empty | \`"".isEmpty()\` | true |
| \`startsWith()\` | Check start | \`"Hello".startsWith("He")\` | true |
| \`compareTo()\` | Lexicographic compare | \`"A".compareTo("B")\` | -1 |

---

### 💻 5. Complete Example Program

\`\`\`java
public class StringDemo {
    public static void main(String[] args) {
        // ═══ String Creation ═══
        String s1 = "Hello";
        String s2 = "Hello";     // Same pool reference as s1!
        String s3 = new String("Hello");  // Different object in heap
        
        System.out.println("s1 == s2: " + (s1 == s2));     // true (same pool ref)
        System.out.println("s1 == s3: " + (s1 == s3));     // false (diff objects!)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (same content!)
        // ALWAYS use .equals() to compare String CONTENT!
        
        // ═══ String Methods ═══
        String name = "  Java Programming  ";
        System.out.println("Original : '" + name + "'");
        System.out.println("Trimmed  : '" + name.trim() + "'");
        System.out.println("Upper    : " + name.trim().toUpperCase());
        System.out.println("Length   : " + name.trim().length());
        System.out.println("Char [0] : " + name.trim().charAt(0));
        System.out.println("Substring: " + name.trim().substring(0,4));
        System.out.println("Replace  : " + name.trim().replace("Java","Python"));
        System.out.println("Contains : " + name.contains("Java"));
        System.out.println("Index of : " + name.trim().indexOf("Program"));
        
        // ═══ String Split ═══
        String csv = "Rahul,20,95.5,Chennai";
        String[] parts = csv.split(",");
        System.out.println("\\nSplit CSV:");
        for (String part : parts) {
            System.out.println("  → " + part);
        }
        
        // ═══ WHY String is Immutable ═══
        String original = "Hello";
        String modified = original.concat(" World");
        System.out.println("\\nOriginal: " + original);   // Still "Hello"!
        System.out.println("Modified: " + modified);  // "Hello World"
        // original is UNCHANGED — immutable!
        
        // ═══ StringBuilder (Mutable — for modifications) ═══
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");     // Modifies SAME object
        sb.insert(5, ",");       // "Hello, World"
        sb.replace(0, 5, "Hi");  // "Hi, World"
        sb.reverse();            // "dlroW ,iH"
        sb.reverse();            // Back to "Hi, World"
        sb.delete(0, 4);         // "World"
        System.out.println("\\nStringBuilder: " + sb.toString());
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — String vs StringBuilder vs StringBuffer

| Feature | String | StringBuilder | StringBuffer |
|---------|--------|--------------|-------------|
| **Mutability** | ❌ Immutable | ✅ Mutable | ✅ Mutable |
| **Thread-Safe** | ✅ (immutable) | ❌ No | ✅ Yes (synchronized) |
| **Performance** | Slow (new object each time) | **Fastest** 🚀 | Medium |
| **Use When** | Few/no changes | Many changes, 1 thread | Many changes, multi-thread |

**== vs .equals():**
| | \`==\` | \`.equals()\` |
|---|------|-------------|
| Compares | **Reference** (memory address) | **Content** (actual text) |
| Use for | Primitives | **Strings! Always!** ✅ |

---

### 💡 7. Key Points
- String is immutable → every modification creates a NEW object
- Use \`.equals()\` for comparison (NOT ==)
- String Pool: \`"Hello"\` reuses same object, \`new String("Hello")\` creates new
- Use StringBuilder for frequent modifications (faster than String concat)
- Use StringBuffer only when multiple threads modify the same string
- \`+\` operator on Strings internally uses StringBuilder`
  },

  // ── OOP CONCEPTS ──
  {
    patterns: ['oop', 'object oriented', 'four pillars', 'oops concept', 'class and object', 'class object'],
    quick: `**OOP** = Object-Oriented Programming. Java is built on **4 pillars**:
1. **Encapsulation** — Data hiding (private + getters/setters)
2. **Inheritance** — Reuse code (extends keyword)
3. **Polymorphism** — One method, many forms (overloading/overriding)
4. **Abstraction** — Hide implementation (abstract class/interface)

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🎯 OOP Concepts in Java

**Analogy:** Building a car factory 🏭 — A **class** is the blueprint, an **object** is the actual car. **Encapsulation** = sealed engine (hidden internals). **Inheritance** = sedan inherits from base car design. **Polymorphism** = same "start" button works differently in electric vs petrol. **Abstraction** = you press accelerator without knowing engine mechanics.

\`\`\`java
// Class = Blueprint
class Student {
    private String name;      // Encapsulation: private data
    private int marks;
    
    public Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }
    
    public void display() {   // Behavior
        System.out.println(name + ": " + marks);
    }
    
    public String getName() { return name; }   // Getter
}

public class Main {
    public static void main(String[] args) {
        // Object = Instance of class
        Student s1 = new Student("Rahul", 90);
        Student s2 = new Student("Priya", 95);
        s1.display();  // Rahul: 90
        s2.display();  // Priya: 95
    }
}
\`\`\`

⚠️ **Common Mistake:** Confusing class with object. A class is the template; an object is the actual thing created from it. You can create many objects from one class.

💡 **Key Takeaway:** OOP = organizing code into classes (blueprints) and objects (instances). The 4 pillars — Encapsulation, Inheritance, Polymorphism, Abstraction — make code secure, reusable, flexible, and simple.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — OOP Concepts

**Problem:** Build a Library Management System using all 4 OOP pillars:
1. **Abstraction:** Create an abstract class \`LibraryItem\` with abstract method \`calculateFine(int daysLate)\`
2. **Inheritance:** Create \`Book\` and \`Magazine\` classes extending \`LibraryItem\` (Book fine: ₹5/day, Magazine: ₹2/day)
3. **Encapsulation:** Private fields (title, author, isAvailable) with getters/setters
4. **Polymorphism:** Override \`calculateFine()\` differently in each subclass. Create an array of \`LibraryItem[]\` and call \`calculateFine(3)\` on each.

**Bonus:** Add an interface \`Renewable\` with method \`renew()\`. Only \`Book\` should implement it.

Try it yourself first! 💪`,
    response: `## 🎯 OOP Concepts in Java — Complete Guide

---

### 📖 1. Definition
**OOP (Object-Oriented Programming)** is a programming paradigm that organizes code into **objects** — bundles of data (variables) and behavior (methods). Java is a fully object-oriented language.

---

### 🎯 2. Real-Life Analogy
Everything in the real world is an **object**!
- **Class** = Blueprint of a house 📐 (design plan)
- **Object** = Actual built house 🏠 (real thing from the plan)
- You can build MANY houses (objects) from ONE blueprint (class)

---

### 📊 3. Class vs Object

| | Class | Object |
|---|-------|--------|
| **What** | Blueprint / Template | Real instance |
| **Memory** | No memory allocated | Memory allocated on \`new\` |
| **Created** | Using \`class\` keyword | Using \`new\` keyword |
| **Example** | \`class Car { }\` | \`Car myCar = new Car();\` |
| **Analogy** | Cookie cutter 🍪 | Actual cookie |

---

### 📊 4. The 4 Pillars of OOP

| Pillar | Meaning | Analogy | Keyword/Tool |
|--------|---------|---------|-------------|
| **Encapsulation** | Wrap data + hide internals | ATM machine 🏧 | \`private\` + getters/setters |
| **Inheritance** | Child gets parent's features | Family traits 👨‍👩‍👧 | \`extends\` |
| **Polymorphism** | Same action, different forms | "Draw" a circle/square ✏️ | Overloading/Overriding |
| **Abstraction** | Show only essentials | Car dashboard 🚗 | \`abstract\` / \`interface\` |

---

### 💻 5. Complete Example — All 4 Pillars

\`\`\`java
// ═══ ENCAPSULATION: private data + public methods ═══
class BankAccount {
    private double balance;      // HIDDEN
    
    public BankAccount(double initial) {
        this.balance = initial;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        }
    }
    
    public double getBalance() {
        return balance;
    }
}

// ═══ ABSTRACTION: abstract class — WHAT, not HOW ═══
abstract class Shape {
    String color;
    
    Shape(String color) {
        this.color = color;
    }
    
    abstract double area();         // WHAT (child decides HOW)
    abstract void draw();           // WHAT (child decides HOW)
    
    void displayInfo() {            // Concrete — shared by all shapes
        System.out.printf("%s shape, area = %.2f%n", color, area());
    }
}

// ═══ INHERITANCE: Circle IS-A Shape ═══
class Circle extends Shape {
    double radius;
    
    Circle(String color, double radius) {
        super(color);               // Call parent constructor
        this.radius = radius;
    }
    
    @Override
    double area() { return Math.PI * radius * radius; }
    
    @Override
    void draw() { System.out.println("Drawing " + color + " Circle ⭕"); }
}

class Rectangle extends Shape {
    double width, height;
    
    Rectangle(String color, double w, double h) {
        super(color);
        this.width = w;
        this.height = h;
    }
    
    @Override
    double area() { return width * height; }
    
    @Override
    void draw() { System.out.println("Drawing " + color + " Rectangle 🟦"); }
}

// ═══ POLYMORPHISM: Same method, different behavior ═══
public class OOPDemo {
    public static void main(String[] args) {
        // Encapsulation
        BankAccount acc = new BankAccount(1000);
        acc.deposit(500);
        System.out.println("Balance: " + acc.getBalance());
        
        System.out.println("───────────────────");
        
        // Polymorphism — parent reference, child objects
        Shape[] shapes = {
            new Circle("Red", 5),
            new Rectangle("Blue", 4, 6),
            new Circle("Green", 3)
        };
        
        for (Shape s : shapes) {
            s.draw();          // Each shape draws differently!
            s.displayInfo();   // Inherited method
            System.out.println();
        }
    }
}
\`\`\`

---

### ⚖️ 6. Comparison — 4 Pillars Summary

| Pillar | What It Hides | How | Example |
|--------|-------------|-----|---------|
| **Encapsulation** | Data (variables) | private + getters/setters | Bank hides your balance |
| **Abstraction** | Implementation details | abstract class / interface | ATM hides internal workings |
| **Inheritance** | Code duplication | extends (child gets parent code) | Dog inherits from Animal |
| **Polymorphism** | Which method runs | Overloading / Overriding | "draw" acts differently per shape |

---

### 💡 7. Key Points
- Class = blueprint, Object = real instance created with \`new\`
- Encapsulation = private variables + public getters/setters
- Inheritance = \`extends\` keyword, IS-A relationship
- Polymorphism = same method name, different behavior (overloading/overriding)
- Abstraction = \`abstract\` class or \`interface\`, hide HOW, show WHAT
- Java supports ALL 4 pillars — it's a fully OOP language!`
  },

  // ── JAVA FEATURES / WHAT IS JAVA ──
  {
    patterns: ['features of java', 'java features', 'what is java', 'why java', 'java overview', 'java introduction', 'java programming language', 'james gosling', 'wora', 'platform independent'],
    quick: `**Java** is a high-level, OOP, platform-independent language created by **James Gosling** at Sun Microsystems (1995).
Key features: **WORA** (Write Once, Run Anywhere via JVM), OOP, automatic **garbage collection**, multithreading, robust, secure.
Compilation: \`.java\` → \`javac\` → \`.class\` (bytecode) → **JVM** runs it on any OS.

Want a deeper explanation? Just ask! 💡`,
    standard: `## ☕ Java — Overview

**Analogy:** Universal translator 🌍 — Write your speech once (\`.java\`), the translator (\`javac\`) converts it to a universal language (bytecode), and any audience (JVM on Windows/Mac/Linux) can understand it. That's WORA!

\`\`\`
+----------+     javac      +-----------+     JVM      +----------+
| Main.java| ------------> | Main.class| -----------> |  Output  |
| (source) |  (compiler)   | (bytecode)|  (any OS)   | (runs!)  |
+----------+               +-----------+              +----------+
\`\`\`

**Top 8 Features:**
| # | Feature | Meaning |
|---|---------|--------|
| 1 | Platform Independent | Bytecode runs on any OS with JVM |
| 2 | Object-Oriented | Everything is inside classes/objects |
| 3 | Robust | Strong type checking + exception handling |
| 4 | Secure | No pointers, runs in JVM sandbox |
| 5 | Multithreaded | Run multiple tasks simultaneously |
| 6 | Garbage Collection | Auto memory cleanup |
| 7 | Simple | No pointers, no operator overloading |
| 8 | Distributed | Supports RMI, sockets for networking |

⚠️ **Common Mistake:** Saying "Java is compiled" or "Java is interpreted" — it's actually **BOTH**! \`javac\` compiles to bytecode, then JVM interprets/JIT-compiles it.

💡 **Key Takeaway:** Java = OOP + Platform Independent + Secure + Robust. Code compiles to bytecode that runs on any JVM.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — Java Basics

**Problem:** Create a Java showcaser program:
1. Print "Welcome to Java!" and Java version (\`System.getProperty("java.version")\`)
2. Demonstrate **5 key features** with code:
   - OOP: Create a simple class with object
   - Robust: Show exception handling (try-catch)
   - Multithreaded: Create 2 threads printing different messages
   - Automatic GC: Create objects and set to null, call \`System.gc()\`
   - Platform Independent: Print \`System.getProperty("os.name")\` to show it runs anywhere
3. Add comments explaining each feature

**Bonus:** Create a \`JavaQuiz\` class that asks 5 MCQ questions about Java features and scores the answers!

Try it yourself first! 💪`,
    response: `## ☕ Java Programming Language — Complete Guide

---

### 📖 1. Definition
**Java** is a **high-level, object-oriented, platform-independent** programming language developed by **James Gosling** at **Sun Microsystems** in **1995**. It follows the principle of **"Write Once, Run Anywhere" (WORA)**.

---

### 🎯 2. History
- **1991:** James Gosling's team creates "Oak" 🌳 for electronic devices
- **1995:** Renamed to "Java" ☕ (after Java coffee) and released
- **2010:** Oracle acquires Sun Microsystems (Oracle owns Java now)
- **Today:** One of the most popular languages in the world!

---

### 📊 3. All 12 Features of Java

| # | Feature | Meaning | Analogy |
|---|---------|---------|---------|
| 1 | **Simple** | Easy to learn (no pointers, auto garbage collection) | Automatic car 🚗 |
| 2 | **Object-Oriented** | Everything organized as objects | LEGO blocks 🧱 |
| 3 | **Platform Independent** | Write Once, Run Anywhere (WORA) | DVD plays on any player 📀 |
| 4 | **Secure** | No pointers, bytecode verifier, security manager | House with locks 🔒 |
| 5 | **Robust** | Strong type checking, exception handling, garbage collection | Seatbelt in car |
| 6 | **Architecture Neutral** | Bytecode works on any OS | Universal adapter 🔌 |
| 7 | **Portable** | Same behavior on all platforms | USB drive works everywhere |
| 8 | **High Performance** | JIT compiler optimizes bytecode | Tuned engine 🏎️ |
| 9 | **Multithreaded** | Execute multiple tasks simultaneously | Multiple chefs 👨‍🍳 |
| 10 | **Distributed** | Built-in networking (RMI, sockets) | Internet communication 🌐 |
| 11 | **Dynamic** | Loads classes at runtime | Plug-and-play |
| 12 | **Interpreted** | Bytecode interpreted by JVM | Translator 🗣️ |

---

### 📝 4. How Java Works — JDK / JRE / JVM

\`\`\`
Source Code (.java)
     │  javac (compiler)
     ▼
Bytecode (.class)
     │  JVM (interpreter + JIT)
     ▼
Machine Code → Runs on OS!

JDK = JRE + dev tools (javac, javadoc, jar)
JRE = JVM + standard libraries
JVM = Execution engine (runs bytecode)
\`\`\`

| | JDK | JRE | JVM |
|---|-----|-----|-----|
| **Purpose** | Develop + Run | Run only | Execute bytecode |
| **Contains** | JRE + tools | JVM + libraries | Engine only |
| **For whom** | Developers | End users | Embedded in JRE |

---

### 💻 5. Example — Hello World

\`\`\`java
// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World! ☕");
        System.out.println("Java was created by James Gosling in 1995");
        System.out.println("Write Once, Run Anywhere!");
    }
}
// Compile: javac HelloWorld.java
// Run:     java HelloWorld
\`\`\`

---

### ⚖️ 6. Comparison — Java vs Other Languages

| Feature | Java | C++ | Python |
|---------|------|-----|--------|
| **Platform** | Independent (JVM) | Dependent | Independent (interpreter) |
| **OOP** | Fully OOP | Partial (has global functions) | Multi-paradigm |
| **Memory** | Auto (garbage collector) | Manual (new/delete) | Auto |
| **Pointers** | ❌ No | ✅ Yes | ❌ No |
| **Speed** | Fast (JIT + JVM) | Fastest (native) | Slower (interpreted) |
| **Multiple Inheritance** | Via interfaces only | Yes (classes) | Yes |
| **Syntax** | Moderate | Complex | Simplest |

---

### 💡 7. Key Points
- Created by **James Gosling**, 1995, Sun Microsystems
- **WORA** = Write Once, Run Anywhere (platform independent via JVM)
- **JDK** ⊃ JRE ⊃ JVM (nesting relationship)
- \`.java\` → \`javac\` → \`.class\` (bytecode) → \`JVM\` → runs on any OS
- Key features: Simple, OOP, Platform Independent, Secure, Robust, Multithreaded
- Used in: Android apps, enterprise software, web servers, big data`
  },

  // ── AWT & SWING ──  
  {
    patterns: ['awt', 'swing', 'jframe', 'jbutton', 'gui', 'graphical user interface', 'layout manager', 'event handling', 'event listener', 'actionlistener', 'actionevent'],
    quick: `**AWT** = Java's original GUI (heavyweight, OS-native). **Swing** = improved GUI (lightweight, same look on all OS).
Swing classes start with \`J\`: \`JFrame\` (window), \`JButton\`, \`JLabel\`, \`JTextField\`.
Event handling: \`button.addActionListener(e -> { /* code */ });\`
Layouts: \`FlowLayout\`, \`BorderLayout\`, \`GridLayout\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 🖥️ AWT & Swing in Java

**Analogy:** AWT = renting furniture (looks different in every house/OS). Swing = buying your own furniture (looks the same everywhere = platform-independent look).

\`\`\`java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MyApp extends JFrame {
    private int count = 0;
    
    public MyApp() {
        setTitle("Click Counter");
        setSize(300, 200);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLayout(new FlowLayout());
        
        JLabel label = new JLabel("Count: 0");
        JButton button = new JButton("Click Me!");
        
        button.addActionListener(e -> {     // Event handling!
            count++;
            label.setText("Count: " + count);
        });
        
        add(label);
        add(button);
        setVisible(true);
    }
    
    public static void main(String[] args) {
        new MyApp();
    }
}
// Opens a window with a button that counts clicks!
\`\`\`

**Key Components:** \`JFrame\` (window), \`JPanel\` (container), \`JButton\`, \`JLabel\`, \`JTextField\`, \`JTextArea\`, \`JComboBox\`, \`JCheckBox\`.

⚠️ **Common Mistake:** Forgetting \`setVisible(true)\` — the frame exists but is invisible! Also, always set \`setDefaultCloseOperation(EXIT_ON_CLOSE)\` or the app keeps running after closing the window.

💡 **Key Takeaway:** Use Swing (not AWT) for modern apps. \`JFrame\` = window, add components, use \`addActionListener\` for events.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — AWT & Swing

**Problem:** Build a **Simple Calculator** GUI:
1. Create a \`JFrame\` window with title "Java Calculator"
2. Add a \`JTextField\` at top to display numbers/results
3. Add 16 \`JButton\`s in a 4×4 \`GridLayout\`: digits 0-9, +, -, *, /, =, C (clear)
4. Add \`ActionListener\` to each button:
   - Digit buttons: append to display
   - Operator buttons: store first number and operator
   - = button: calculate and show result
   - C button: clear display
5. Handle division by zero with a message dialog (\`JOptionPane\`)

**Bonus:** Add keyboard support (\`KeyListener\`) so users can type numbers too!

**Hint:** Use \`BorderLayout\` for main frame (TextField=NORTH, button panel=CENTER). Use \`GridLayout(4,4)\` for buttons.

Try it yourself first! 💪`,
    response: `## 🖥️ AWT & Swing (GUI Programming) — Complete Guide

---

### 📖 1. Definition
- **AWT (Abstract Window Toolkit):** Java's original GUI toolkit. Uses **OS-native** components (heavyweight).
- **Swing:** A newer, improved GUI toolkit. Uses **Java-drawn** components (lightweight). All Swing components start with **J** (JFrame, JButton, JLabel).

---

### 🎯 2. Analogy
- **AWT** = Basic LEGO set 🧱 — simple, looks different on each table (OS-dependent)
- **Swing** = Deluxe LEGO set ✨ — fancy pieces, looks SAME everywhere, more features!

---

### 📊 3. AWT Components vs Swing Components

| AWT Component | Swing Component | Purpose |
|--------------|----------------|---------|
| Frame | **JFrame** | Main window |
| Button | **JButton** | Clickable button |
| Label | **JLabel** | Display text |
| TextField | **JTextField** | Single line input |
| TextArea | **JTextArea** | Multi-line input |
| Panel | **JPanel** | Container for grouping |
| Checkbox | **JCheckBox** | Toggle selection |
| List | **JList** | List of items |
| MenuBar | **JMenuBar** | Menu bar |
| Dialog | **JDialog** | Dialog window |

---

### 📊 4. Layout Managers

| Layout | How It Arranges | Analogy |
|--------|----------------|---------|
| **FlowLayout** | Left to right, wraps | Words in a paragraph |
| **BorderLayout** | North, South, East, West, Center | Compass directions 🧭 |
| **GridLayout** | Equal-sized grid (rows × cols) | Calendar grid 📅 |
| **BoxLayout** | Stack vertically or horizontally | Stack of books 📚 |
| **CardLayout** | One panel at a time (like tabs) | Deck of cards 🃏 |

---

### 📊 5. Event Handling (3 Parts)

| Part | What | Analogy |
|------|------|---------|
| **Event Source** | The component (button, text field) | Doorbell 🔔 |
| **Event Object** | Info about what happened | "Button was clicked" |
| **Event Listener** | Code that responds to the event | You opening the door 🚪 |

---

### 💻 6. Complete Example Program

\`\`\`java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SwingDemo extends JFrame implements ActionListener {
    JLabel titleLabel, resultLabel;
    JTextField nameField, ageField;
    JButton submitBtn, clearBtn;
    JTextArea outputArea;
    
    SwingDemo() {
        // ── Window Setup ──
        setTitle("Student Registration 📝");
        setSize(450, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout(10, 10));
        
        // ── Top Panel (Title) ──
        titleLabel = new JLabel("Student Registration Form", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 18));
        add(titleLabel, BorderLayout.NORTH);
        
        // ── Center Panel (Form) ──
        JPanel formPanel = new JPanel(new GridLayout(3, 2, 10, 10));
        formPanel.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        
        formPanel.add(new JLabel("Name:"));
        nameField = new JTextField(20);
        formPanel.add(nameField);
        
        formPanel.add(new JLabel("Age:"));
        ageField = new JTextField(5);
        formPanel.add(ageField);
        
        submitBtn = new JButton("Submit ✅");
        clearBtn = new JButton("Clear 🗑️");
        formPanel.add(submitBtn);
        formPanel.add(clearBtn);
        
        add(formPanel, BorderLayout.CENTER);
        
        // ── Bottom Panel (Output) ──
        outputArea = new JTextArea(5, 30);
        outputArea.setEditable(false);
        JScrollPane scroll = new JScrollPane(outputArea);
        add(scroll, BorderLayout.SOUTH);
        
        // ── Event Handling — register listeners ──
        submitBtn.addActionListener(this);
        clearBtn.addActionListener(this);
        
        setVisible(true);
    }
    
    // ── Event Handler — responds to button clicks ──
    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == submitBtn) {
            String name = nameField.getText();
            String age = ageField.getText();
            
            if (name.isEmpty() || age.isEmpty()) {
                JOptionPane.showMessageDialog(this,
                    "Please fill all fields!", "Error",
                    JOptionPane.ERROR_MESSAGE);
            } else {
                outputArea.append("✅ Registered: " + name + 
                    " (Age: " + age + ")\\n");
            }
        } else if (e.getSource() == clearBtn) {
            nameField.setText("");
            ageField.setText("");
            outputArea.setText("");
        }
    }
    
    public static void main(String[] args) {
        new SwingDemo();
    }
}
\`\`\`

---

### ⚖️ 7. Comparison — AWT vs Swing

| Feature | AWT | Swing ⭐ |
|---------|-----|---------|
| **Package** | \`java.awt\` | \`javax.swing\` |
| **Components** | Button, Label | JButton, JLabel (**J prefix**) |
| **Weight** | Heavyweight (OS) | **Lightweight (Java)** |
| **Look & Feel** | OS-dependent | **Same on all platforms** |
| **MVC** | ❌ No | ✅ Yes |
| **Features** | Basic | Icons, tooltips, borders |
| **Preferred** | Old code | **Modern GUI ⭐** |

---

### 💡 8. Key Points
- Swing is preferred over AWT (lightweight, platform-independent, more features)
- All Swing components start with **J** (JFrame, JButton, JLabel, JPanel)
- Event handling: Source → Listener → Handler (\`ActionListener\` + \`actionPerformed()\`)
- \`setVisible(true)\` — MUST call to show the window
- Layout managers: FlowLayout (default for JPanel), BorderLayout (default for JFrame)
- Always call \`setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)\``
  },

  // ── I/O STREAMS ──
  {
    patterns: ['stream', 'i/o', 'input output', 'filereader', 'filewriter', 'bufferedreader', 'bufferedwriter', 'inputstream', 'outputstream', 'file handling', 'read file', 'write file', 'serialization', 'serialize', 'deserialize', 'objectinputstream', 'objectoutputstream'],
    quick: `**I/O Streams** = channels for reading/writing data. 3 types:
1. **Byte streams** (\`FileInputStream/FileOutputStream\`) — raw bytes, images/files
2. **Character streams** (\`FileReader/FileWriter\`) — text data
3. **Buffered streams** (\`BufferedReader/BufferedWriter\`) — efficient, reads chunks
Always close streams! Use **try-with-resources**: \`try (FileReader fr = new FileReader("f.txt")) { }\`.

Want a deeper explanation? Just ask! 💡`,
    standard: `## 📁 I/O Streams in Java

**Analogy:** Water pipes 🚰 — \`InputStream\` = faucet (data flows IN to your program). \`OutputStream\` = drain (data flows OUT). \`BufferedStream\` = tank (stores water in chunks for efficiency instead of drop by drop).

\`\`\`java
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // WRITE to file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter("notes.txt"))) {
            bw.write("Hello, Java I/O!");
            bw.newLine();
            bw.write("Streams are easy!");
            System.out.println("✅ File written!");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        // READ from file
        try (BufferedReader br = new BufferedReader(new FileReader("notes.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
/* Output:
   ✅ File written!
   Hello, Java I/O!
   Streams are easy! */
\`\`\`

⚠️ **Common Mistake:** Not closing streams — causes memory leaks and file locks! Always use **try-with-resources** (shown above) for auto-closing.

💡 **Key Takeaway:** Use \`BufferedReader/BufferedWriter\` for text files (efficient). Use try-with-resources for auto-closing. \`readLine()\` returns \`null\` at end of file.

Want me to go deeper or give you a practice problem? 🎯`,
    practice: `## 🎯 Practice Problem — I/O Streams

**Problem:** Create a Student File Manager:
1. **Write:** Create a file \`students.txt\` with 5 student records (Name, RollNo, Marks) — one per line, comma-separated
2. **Read:** Read the file and display all students in a formatted table
3. **Search:** Read the file and find a student by name (print their record or "Not found")
4. **Append:** Add a new student to the end of the file without overwriting existing data (\`new FileWriter("file", true)\`)
5. **Copy:** Copy \`students.txt\` to \`backup.txt\` using byte streams (\`FileInputStream/FileOutputStream\`)

**Bonus:** Implement **serialization** — Create a \`Student\` class implementing \`Serializable\`, write an ArrayList of Student objects to a binary file using \`ObjectOutputStream\`, then read them back.

**Hint:** For appending, pass \`true\` as second argument to \`FileWriter\` constructor!

Try it yourself first! 💪`,
    response: `## 📁 I/O Streams in Java — Complete Guide

---

### 📖 1. Definition
**I/O (Input/Output) Streams** are channels for reading input and writing output. A **stream** is a sequence of data flowing from source to destination. Java provides classes in \`java.io\` package for file operations.

---

### 🎯 2. Analogy
**Water Pipeline** 🚰:
- Input Stream = water coming INTO your house (reading data)
- Output Stream = water going OUT from your house (writing data)
- The bigger the pipe, the faster the flow (buffered = bigger pipe = faster!)

---

### 📊 3. Stream Types (Each Explained with Definition)

---

#### 🔹 Type 1: Byte Streams (Binary Data)
**Definition:** Byte Streams read and write data as **raw bytes (8-bit chunks)**. They are used for **binary data** like images, audio files, video, PDF, and any non-text file. They are the most fundamental stream type. The base classes are \`InputStream\` (reading) and \`OutputStream\` (writing).

**Key Classes:**
- \`FileInputStream\` — reads bytes from a file
- \`FileOutputStream\` — writes bytes to a file
- \`BufferedInputStream\` — buffered (faster) byte reading
- \`BufferedOutputStream\` — buffered (faster) byte writing

\`\`\`java
// Copy an image file using Byte Streams
FileInputStream fis = new FileInputStream("photo.jpg");
FileOutputStream fos = new FileOutputStream("copy.jpg");
int byteData;
while ((byteData = fis.read()) != -1) {
    fos.write(byteData);   // Write one byte at a time
}
fis.close(); fos.close();
\`\`\`

---

#### 🔹 Type 2: Character Streams (Text Data)
**Definition:** Character Streams read and write data as **characters (16-bit Unicode)**. They are specifically designed for **text files** — \`.txt\`, \`.csv\`, \`.html\`, \`.java\` etc. They automatically handle character encoding (UTF-8, etc.). The base classes are \`Reader\` (reading) and \`Writer\` (writing).

**Key Classes:**
- \`FileReader\` — reads characters from a text file
- \`FileWriter\` — writes characters to a text file
- \`BufferedReader\` — buffered (faster) character reading with \`readLine()\`
- \`BufferedWriter\` — buffered (faster) character writing with \`newLine()\`

\`\`\`java
// Read a text file line by line using Character Streams
BufferedReader br = new BufferedReader(new FileReader("data.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);   // Read one LINE at a time
}
br.close();
\`\`\`

---

#### 🔹 Type 3: Serialization Streams (Object Data)
**Definition:** Serialization is the process of **converting a Java object into a byte stream** so it can be saved to a file or sent over a network. Deserialization is the reverse — converting bytes back into an object. The class MUST implement the \`Serializable\` interface.

**Key Classes:**
- \`ObjectOutputStream\` — serialize (write) objects to file
- \`ObjectInputStream\` — deserialize (read) objects from file
- \`transient\` keyword — marks fields that should NOT be serialized (like passwords)

\`\`\`java
// Save object to file (Serialization)
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("data.ser"));
oos.writeObject(myStudent);

// Load object from file (Deserialization)
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("data.ser"));
Student s = (Student) ois.readObject();
\`\`\`

---

**Summary Table:**
| Stream Type | Unit | Used For | Base Classes | Key Subclasses |
|------------|------|----------|-------------|----------------|
| **Byte** | 1 byte (8 bits) | Images, audio, binary | InputStream / OutputStream | FileInputStream, BufferedInputStream |
| **Character** | 1 char (16 bits) | Text files, CSV, logs | Reader / Writer | FileReader, BufferedReader |
| **Object** | Whole objects | Save/load Java objects | ObjectInputStream / ObjectOutputStream | Serializable interface |

---

### 💻 4. Complete Example Program

\`\`\`java
import java.io.*;

public class IOStreamDemo {
    
    // ═══ WRITING TO A FILE ═══
    static void writeFile() throws IOException {
        // FileWriter — writes character by character
        // BufferedWriter — writes in chunks (FASTER!)
        try (BufferedWriter bw = new BufferedWriter(
                new FileWriter("students.txt"))) {
            bw.write("Name: Rahul, Marks: 95");
            bw.newLine();    // New line
            bw.write("Name: Priya, Marks: 88");
            bw.newLine();
            bw.write("Name: Amit, Marks: 76");
            System.out.println("✅ File written successfully!");
        }
    }
    
    // ═══ READING FROM A FILE ═══
    static void readFile() throws IOException {
        try (BufferedReader br = new BufferedReader(
                new FileReader("students.txt"))) {
            String line;
            System.out.println("\\n📄 File contents:");
            while ((line = br.readLine()) != null) {
                System.out.println("  " + line);
            }
        }
    }
    
    // ═══ SERIALIZATION — Save object to file ═══
    static void serializeObject() throws IOException {
        Student s = new Student("Rahul", 20, 95.5);
        try (ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("student.ser"))) {
            oos.writeObject(s);
            System.out.println("\\n✅ Object serialized (saved to file)!");
        }
    }
    
    // ═══ DESERIALIZATION — Load object from file ═══
    static void deserializeObject() throws IOException, ClassNotFoundException {
        try (ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("student.ser"))) {
            Student s = (Student) ois.readObject();
            System.out.println("✅ Object deserialized: " + s);
        }
    }
    
    public static void main(String[] args) {
        try {
            writeFile();
            readFile();
            serializeObject();
            deserializeObject();
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

// Must implement Serializable for serialization!
class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;
    double marks;
    transient String password;  // transient = NOT serialized!
    
    Student(String name, int age, double marks) {
        this.name = name;
        this.age = age;
        this.marks = marks;
    }
    
    public String toString() {
        return name + " (Age: " + age + ", Marks: " + marks + ")";
    }
}
\`\`\`

---

### ⚖️ 5. Comparisons

**Byte Stream vs Character Stream:**
| Feature | Byte Stream | Character Stream |
|---------|------------|-----------------|
| Unit | 1 byte (8 bits) | 1 char (16 bits) |
| For | Images, audio, binary | Text files ✅ |
| Classes | InputStream / OutputStream | Reader / Writer |
| File I/O | FileInputStream | FileReader |

**FileReader vs BufferedReader:**
| | FileReader | BufferedReader |
|---|-----------|---------------|
| Speed | Slow (char by char) | **Fast (chunk by chunk)** ✅ |
| Method | read() | **readLine()** ✅ |
| Use | Rarely alone | **Always wrap FileReader** |

**Serialization keywords:**
| Keyword | Meaning |
|---------|---------|
| \`Serializable\` | Interface — marks class as serializable |
| \`transient\` | Variable NOT saved during serialization |
| \`serialVersionUID\` | Version control for serialized objects |

---

### 💡 6. Key Points
- Always use BufferedReader/BufferedWriter (faster than unbuffered)
- Use try-with-resources for auto-closing streams
- Character streams for text, byte streams for binary data
- Serialization = Object → File, Deserialization = File → Object
- \`implements Serializable\` required for serialization
- \`transient\` variables are skipped during serialization`
  }
];

// ═══════════════════════════════════════════════════════════════
// MODE 4 — DEBUG HANDLER
// ═══════════════════════════════════════════════════════════════
function handleDebugMode(userMessage, queryLower) {
  // Common Java errors and their fixes
  const ERROR_PATTERNS = [
    {
      patterns: ['cannot find symbol', 'cannot resolve'],
      fix: `## 🔧 Debug: "Cannot find symbol"

**What it means:** The compiler can't find a variable, method, or class you used.

**Common Causes & Fixes:**

| # | Cause | Fix |
|---|-------|-----|
| 1 | Typo in variable/method name | Check spelling carefully! Java is case-sensitive |
| 2 | Variable not declared | Declare it before using: \`int x = 0;\` |
| 3 | Missing import | Add \`import java.util.Scanner;\` etc. at the top |
| 4 | Variable used outside its scope | Move declaration to a broader scope |
| 5 | Wrong class name in constructor | Class name and constructor must match exactly |

\`\`\`java
// ❌ WRONG
Scanner sc = new scanner(System.in);  // lowercase 's'!

// ✅ FIX
Scanner sc = new Scanner(System.in);  // Capital 'S'
\`\`\`

💡 **Tip:** Always read the error message carefully — it tells you the exact line and what symbol is missing!`
    },
    {
      patterns: ['nullpointerexception', 'null pointer', 'nullpointer'],
      fix: `## 🔧 Debug: NullPointerException

**What it means:** You're trying to use an object reference that is \`null\` (doesn't point to any object).

**Common Causes & Fixes:**

| # | Cause | Fix |
|---|-------|-----|
| 1 | Object never initialized | Initialize before use: \`String s = "";\` instead of \`String s = null;\` |
| 2 | Method returns null | Check null before use: \`if (obj != null)\` |
| 3 | Array element not initialized | Initialize elements: \`arr[0] = new Student();\` |
| 4 | Wrong index in ArrayList | Check \`.size()\` before accessing |

\`\`\`java
// ❌ WRONG — causes NullPointerException
String name = null;
System.out.println(name.length());  // 💥 BOOM!

// ✅ FIX — check null first
String name = null;
if (name != null) {
    System.out.println(name.length());
} else {
    System.out.println("Name is not set!");
}
\`\`\`

💡 **Tip:** Initialize variables when declaring them. Never assume a method won't return null!`
    },
    {
      patterns: ['arrayindexoutofbounds', 'array index out of bounds', 'index out of'],
      fix: `## 🔧 Debug: ArrayIndexOutOfBoundsException

**What it means:** You're trying to access an array index that doesn't exist.

**The Rule:** Valid indices are 0 to \`array.length - 1\`. Accessing \`array.length\` or negative indices crashes!

\`\`\`java
// ❌ WRONG
int[] arr = {10, 20, 30};        // indices: 0, 1, 2
System.out.println(arr[3]);       // 💥 Only 0-2 valid!
System.out.println(arr[arr.length]); // 💥 arr[3] doesn't exist!

// ✅ FIX
System.out.println(arr[arr.length - 1]); // ✅ Last element = arr[2] = 30
for (int i = 0; i < arr.length; i++) {   // ✅ < not <=
    System.out.println(arr[i]);
}
\`\`\`

💡 **Tip:** In loops, use \`i < arr.length\` (less than), NOT \`i <= arr.length\` (less than or equal)!`
    },
    {
      patterns: ['stackoverflowerror', 'stack overflow'],
      fix: `## 🔧 Debug: StackOverflowError

**What it means:** A method calls itself infinitely (infinite recursion) until the call stack runs out of memory.

\`\`\`java
// ❌ WRONG — infinite recursion!
public static int factorial(int n) {
    return n * factorial(n - 1);  // Never stops! No base case!
}

// ✅ FIX — add a base case
public static int factorial(int n) {
    if (n <= 1) return 1;         // BASE CASE: stops recursion!
    return n * factorial(n - 1);
}
\`\`\`

💡 **Tip:** Every recursive method MUST have a base case (a condition where it stops calling itself)!`
    },
    {
      patterns: ['classcastexception', 'class cast'],
      fix: `## 🔧 Debug: ClassCastException

**What it means:** You tried to cast an object to a type it doesn't belong to.

\`\`\`java
// ❌ WRONG
Object obj = "Hello";
Integer num = (Integer) obj;  // 💥 String is not Integer!

// ✅ FIX — check type first with instanceof
Object obj = "Hello";
if (obj instanceof Integer) {
    Integer num = (Integer) obj;
} else {
    System.out.println("Not an Integer! It's: " + obj.getClass().getSimpleName());
}
\`\`\`

💡 **Tip:** Always use \`instanceof\` before downcasting!`
    },
    {
      patterns: ['stringindexoutofbounds', 'string index out of'],
      fix: `## 🔧 Debug: StringIndexOutOfBoundsException

**What it means:** You're accessing a character position in a String that doesn't exist.

\`\`\`java
// ❌ WRONG
String s = "Java";               // indices: 0,1,2,3
char c = s.charAt(4);            // 💥 Only 0-3 valid!
String sub = s.substring(2, 10); // 💥 End index too large!

// ✅ FIX
char c = s.charAt(s.length() - 1);      // ✅ Last char = 'a'
String sub = s.substring(2, s.length()); // ✅ "va"
\`\`\`

💡 **Tip:** Valid indices are 0 to \`str.length() - 1\`. Use \`str.length()\` to check bounds first!`
    },
    {
      patterns: ['numberformatexception', 'number format'],
      fix: `## 🔧 Debug: NumberFormatException

**What it means:** You tried to convert a String to a number, but the String isn't a valid number.

\`\`\`java
// ❌ WRONG
int x = Integer.parseInt("abc");      // 💥 "abc" is not a number!
int y = Integer.parseInt("12.5");     // 💥 Has decimal, use parseDouble!
int z = Integer.parseInt("12 ");      // 💥 Has space!

// ✅ FIX — validate/trim before parsing
String input = "  42  ";
try {
    int num = Integer.parseInt(input.trim());  // ✅ trim() removes spaces
    System.out.println("Parsed: " + num);
} catch (NumberFormatException e) {
    System.out.println("Invalid number: " + input);
}
\`\`\`

💡 **Tip:** Always use \`trim()\` and wrap in try-catch when parsing user input!`
    },
    {
      patterns: ['concurrentmodificationexception', 'concurrent modification'],
      fix: `## 🔧 Debug: ConcurrentModificationException

**What it means:** You modified a collection (ArrayList, HashMap) while iterating over it with a for-each loop.

\`\`\`java
// ❌ WRONG — modifying list during for-each
ArrayList<String> list = new ArrayList<>(Arrays.asList("A","B","C"));
for (String s : list) {
    if (s.equals("B")) list.remove(s);  // 💥 BOOM!
}

// ✅ FIX — use Iterator.remove()
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) it.remove();  // ✅ Safe!
}

// ✅ FIX 2 — use removeIf (Java 8+)
list.removeIf(s -> s.equals("B"));  // ✅ Clean & safe!
\`\`\`

💡 **Tip:** Never add/remove from a collection inside a for-each loop. Use \`Iterator\` or \`removeIf()\`!`
    },
    {
      patterns: ['compilation error', 'compile error', 'syntax error', 'expected', 'illegal start', 'not a statement'],
      fix: `## 🔧 Debug: Compilation / Syntax Errors

**Common compilation errors and fixes:**

| Error | Cause | Fix |
|-------|-------|-----|
| \`';' expected\` | Missing semicolon | Add \`;\` at end of statement |
| \`')' expected\` | Unclosed parenthesis | Check matching \`(\` and \`)\` |
| \`illegal start of expression\` | Wrong syntax, often misplaced code | Check code structure, brackets |
| \`not a statement\` | Expression that does nothing | Likely a typo — did you mean \`=\` instead of \`==\`? |
| \`incompatible types\` | Assigning wrong type | Check variable type, add cast if needed |
| \`unreachable statement\` | Code after \`return\`/\`break\` | Remove or move the unreachable code |
| \`missing return statement\` | Method must return but doesn't | Add return for all code paths |

\`\`\`java
// ❌ Common mistakes
if (x = 5) { }          // Assignment, not comparison! Use ==
System.out.println("Hi") // Missing semicolon!
public void get() { }    // Non-void method missing return

// ✅ Fixes
if (x == 5) { }
System.out.println("Hi");
public int get() { return 0; }
\`\`\`

💡 **Tip:** Read the error message — it tells you the exact line number and what's wrong. Fix from the FIRST error down (later errors may be caused by earlier ones)!`
    },
    {
      patterns: ['not working', 'wrong output', 'incorrect output', 'unexpected output', 'logic error', 'gives different', 'doesn\'t work'],
      fix: `## 🔧 Debug: Logic Errors / Wrong Output

**Logic errors compile and run, but give wrong results. Debugging checklist:**

### Step 1: Add print statements
\`\`\`java
System.out.println("DEBUG: x = " + x);  // Track variable values
\`\`\`

### Step 2: Check these common logic errors:

| # | Common Bug | Fix |
|---|-----------|-----|
| 1 | \`=\` instead of \`==\` in conditions | \`if (x == 5)\` not \`if (x = 5)\` |
| 2 | Off-by-one: \`<=\` instead of \`<\` | Check loop bounds carefully |
| 3 | Integer division: \`5/2 = 2\` not 2.5 | Cast to double: \`(double)5/2\` |
| 4 | Comparing Strings with \`==\` | Use \`.equals()\` instead |
| 5 | Forgetting \`break\` in switch | Each case needs \`break;\` |
| 6 | Variable scope issue | Variable declared inside loop isn't available outside |
| 7 | Missing \`else\` causing both branches to run | Use \`else if\` for mutual exclusion |

### Step 3: Trace through manually
Write down variable values at each step on paper — you'll find the bug!

💡 **Tip:** Share your code and the wrong output, and I can help diagnose the issue!`
    }
  ];

  // Try to match specific error patterns
  for (const errorEntry of ERROR_PATTERNS) {
    for (const pattern of errorEntry.patterns) {
      if (queryLower.includes(pattern)) {
        return errorEntry.fix;
      }
    }
  }

  // Generic debug response if no specific error matched
  return `## 🔧 Debug Mode — Let Me Help Fix Your Code!

I can help debug common Java errors. Try describing your issue like:

| What to tell me | Example |
|----------------|---------|
| **Error name** | "I'm getting NullPointerException" |
| **Error message** | "Cannot find symbol error" |
| **Symptom** | "My code gives wrong output" |
| **Specific issue** | "ArrayIndexOutOfBoundsException in my loop" |

### 🐛 Common Java Errors I Can Help With:
1. **NullPointerException** — Using a null reference
2. **ArrayIndexOutOfBoundsException** — Wrong array index
3. **ClassCastException** — Invalid type cast
4. **NumberFormatException** — Bad string-to-number conversion
5. **StackOverflowError** — Infinite recursion
6. **ConcurrentModificationException** — Modifying collection during iteration
7. **Compilation errors** — Syntax mistakes
8. **Logic errors** — Wrong output

📝 **Tip:** Include the error message and I'll give you the exact fix!`;
}

// ═══════════════════════════════════════════════════════════════
// MAIN RESPONSE GENERATOR
// ═══════════════════════════════════════════════════════════════
export function generateResponse(userMessage, topicId = null) {
  if (!userMessage || userMessage.trim().length === 0) {
    return "Please type a question about Java programming! 😊";
  }

  const queryLower = userMessage.toLowerCase().trim();

  // 1. Check greetings / meta questions (word-boundary match to avoid
  //    'hi' matching inside 'this/which/while', 'hey' inside 'they', etc.)
  for (const [, data] of Object.entries(GENERAL_RESPONSES)) {
    for (const pattern of data.patterns) {
      const regex = new RegExp(`\\b${pattern}\\b`);
      if (regex.test(queryLower)) {
        return data.response;
      }
    }
  }

  // 2. Detect mode using classifyMode
  const mode = classifyMode(queryLower);

  // 2a. MODE 4 — Debug Mode: detect code/error in user message
    if (mode === 4) {
        return polishResponse(handleDebugMode(userMessage, queryLower), 'Debug');
    }

  // 2b. Check structured responses (comprehensive topic answers)
  // Score each structured response by how many patterns match
  let bestStructured = null;
  let bestScore = 0;

  for (const sr of STRUCTURED_RESPONSES) {
    let score = 0;
    for (const pattern of sr.patterns) {
      if (queryLower.includes(pattern.toLowerCase())) {
        score += pattern.length; // Longer matches = more specific = higher score
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestStructured = sr;
    }
  }

  // If a good structured match found, return mode-appropriate response
  if (bestStructured && bestScore >= 3) {
        const topicTitle = topicId ? findTopicById(topicId)?.title : null;
        if (mode === 1 && bestStructured.quick) return polishResponse(bestStructured.quick, 'Quick', topicTitle);
        if (mode === 2 && bestStructured.standard) return polishResponse(bestStructured.standard, 'Standard', topicTitle);
        if (mode === 5 && bestStructured.practice) return polishResponse(bestStructured.practice, 'Practice', topicTitle);
        // MODE 3 (deep) or fallback → full response
        return polishResponse(bestStructured.response, 'Deep', topicTitle);
  }

  // 3. If a specific topic is selected, check that topic's knowledge base
  if (topicId) {
    const topic = getTopicById(topicId);
    if (topic) {
      // Check common questions for this topic
            const specificAnswer = findMatchingQuestion(topic, userMessage);
            if (specificAnswer) {
                return polishResponse(specificAnswer, 'Focused', topic.title);
            }

            // Return the topic's full content
            return polishResponse(topic.content, 'Topic Overview', topic.title);
    }
  }

  // 4. Search common questions across all topics
    const globalMatch = searchAllQuestions(userMessage);
    if (globalMatch) {
        return polishResponse(globalMatch.answer, 'Answer');
    }

    // 5. Search by keywords — find most relevant topic
  const matchedTopics = searchTopics(userMessage);
  if (matchedTopics.length > 0) {
    const bestMatch = matchedTopics[0];

    // Check common questions
        const answer = findMatchingQuestion(bestMatch, userMessage);
        if (answer) return polishResponse(answer, 'Answer', bestMatch.title);

        // Return topic content
        return polishResponse(bestMatch.content, 'Topic Overview', bestMatch.title);
  }

    // 6. Fallback — No match in local knowledge base
    return polishResponse(null, 'Guide');  // Signal that localAI couldn't answer
}

/**
 * Main entry point — offline-only: uses local knowledge base
 * @param {string} userMessage - The user's question
 * @param {string|null} topicId - Current topic ID
 * @param {Array} chatHistory - Previous messages [{role, content}]
 * @param {string|null} topicName - Current topic name for context
 */
export async function getResponse(userMessage, topicId = null, chatHistory = [], topicName = null) {
  // Try offline engine first (instant, no network needed)
  const localAnswer = generateResponse(userMessage, topicId);
    if (localAnswer) return localAnswer;

    // Offline-only fallback if the local engine can't answer
    return `## 🤔 I couldn't find an answer for that.

Please try rephrasing your question, or ask about a specific Java topic like:
- "What is inheritance?"
- "Explain loops with example"
- "Write a factorial program"
- "What is JDBC?"

💡 I work best with Java programming questions!`;
}

export default getResponse;
