// Unit 1: Java Fundamentals - Complete Knowledge Base (Teacher-Style)
const unit1Knowledge = [
  {
    topicId: 'u1t1',
    title: 'Features of Java & OOP Concepts',
    keywords: ['features', 'java features', 'OOP', 'object oriented', 'class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'platform independent', 'simple', 'secure', 'portable', 'robust', 'multithreaded', 'WORA', 'write once run anywhere', 'james gosling', 'sun microsystems'],
    content: `## G�� Features of Java & OOP Concepts

### =��� Story Time: How Java Was Born

Imagine you're in the year **1991**. A brilliant engineer named **James Gosling** at **Sun Microsystems** (now owned by Oracle) had a big problem. He wanted to write a program that could run on **any device** G�� a TV remote, a washing machine, a computer, a phone G�� without rewriting it each time.

So he created a language called **"Oak"** (named after a tree outside his window! =��). Later, while drinking coffee at a caf+�, the team renamed it to **"Java"** G�� after Java coffee beans! G��

That's why Java's logo is a coffee cup!

---

### =�� Features of Java (Why Java is Special)

Think of Java like a **superhero** =��+ with many powers. Let's learn each power:

#### 1. =��� Simple
Java is **easy to learn**. If you know basic English and math, you can learn Java! It removed confusing things from older languages like C++ (no pointers, no goto statement).

**Think of it like:** Learning to ride a bicycle with training wheels G�� Java removes the hard parts so you can focus on coding.

#### 2. =��� Platform Independent (Write Once, Run Anywhere G�� WORA)
\`\`\`
+------------------------------+---------------------------+
|           JDK                |  For developers: includes |
| (Java Development Kit)       |  javac, javadoc, jar, etc.|
+------------------------------+---------------------------+
|           JRE                |  For users: JVM + libs    |
| (Java Runtime Environment)   |  to RUN programs          |
+------------------------------+---------------------------+
|           JVM                |  The execution engine that|
| (Java Virtual Machine)       |  runs bytecode            |
+------------------------------+---------------------------+
\`\`\`

| Component | What It Contains | Who Uses It | Analogy |
|-----------|------------------|-------------|---------|
| **JDK** | JRE + dev tools (compiler, debugger) | Developers who WRITE code | Complete toolbox |
| **JRE** | JVM + standard libraries | Users who RUN Java programs | Instruction manual |
| **JVM** | The execution engine only | Internal (not installed alone) | The brain |

**Simple Rule:**
- Want to **write** Java? Install **JDK**.
- Want to **run** Java? Install **JRE** (or JDK, which includes it).
- JVM comes inside both; you never install it separately.

---

### JVM Architecture (How Java Code Actually Runs)

When you write 'HelloWorld.java' and run it, here's what happens step by step:

\`\`\`
Step 1: Write code          -> HelloWorld.java
Step 2: Compile             -> HelloWorld.class (bytecode)
Step 3: Class Loader        -> Loads .class into memory
Step 4: Bytecode Verifier   -> Checks for errors/safety
Step 5: Execution Engine    -> Interpreter/JIT runs code
Step 6: Output              -> "Hello, World!" on screen
\`\`\`

Let's look inside the JVM—it has **3 main sections**:

#### Section 1: CLASS LOADER SUBSYSTEM

The **doorman** of the JVM—it loads your class files into memory.

**Three phases:**
1) **Loading** — reads the .class file from disk
2) **Linking** — verifies bytecode, prepares memory, resolves references
3) **Initialization** — runs static blocks and initializes static variables

Think of it like a librarian who (1) finds your book, (2) checks it's not damaged, and (3) opens it to the right page.

#### Section 2: RUNTIME DATA AREAS (Memory)

This is the JVM's **memory layout** where all your data lives while the program runs.

\`\`\`
+----------------+----------------+-----------------+
|   Method Area  |     Heap       |      Stack      |
| (class info,   | (objects,      | (per thread:    |
|  static vars,  |  arrays)       |  locals, calls, |
|  constants)    |                |  return addrs)  |
+----------------+----------------+-----------------+
|   PC Register  | Native Method Stack (for native code) |
+--------------------------------------------------------+
\`\`\`

| Memory Area | What It Stores |
|-------------|----------------|
| Method Area | Class info, static variables, constants |
| Heap | All objects and arrays |
| Stack | Local variables, method calls, return addresses (per thread) |
| PC Register | Address of current instruction |
| Native Method Stack | Info for native (C/C++) methods |

**Important distinction:**
\`\`\`java
Student s = new Student("Rahul");
// 's' lives in STACK (the reference)      | Student object lives in HEAP (the data)
\`\`\`

Think of it like: the **stack** holds a slip with an address, and the **heap** is the actual house at that address.

#### Section 3: EXECUTION ENGINE

**Think of it like:** You got your mom's eyes =��� and your dad's height =���. You didn't have to "create" these features G�� you **inherited** them! Similarly, a child class inherits code from its parent class.

\`\`\`java
// Parent class (like your parents)
class Animal {
    String name;
    
    void eat() {
        System.out.println(name + " is eating =���");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping =���");
    }
}

// Child class (like you G�� inheriting from parents)
class Dog extends Animal {    // 'extends' means "inherits from"
    void bark() {
        System.out.println(name + " says: Woof Woof! =���");
    }
}

// Child class
class Cat extends Animal {
    void meow() {
        System.out.println(name + " says: Meow! =�ɦ");
    }
}

// Usage:
Dog tommy = new Dog();
tommy.name = "Tommy";
tommy.eat();    // G�� Inherited from Animal! "Tommy is eating =���"
tommy.sleep();  // G�� Inherited from Animal! "Tommy is sleeping =���"
tommy.bark();   // G�� Dog's own method! "Tommy says: Woof Woof! =���"
\`\`\`

**Why is this important?** Without inheritance, you'd have to write \`eat()\` and \`sleep()\` in EVERY animal class G�� Dog, Cat, Bird, Fish... That's a lot of copy-pasting! =��� Inheritance lets you write it ONCE and reuse it everywhere.

#### =��� Pillar 3: POLYMORPHISM (Many Forms)

**Simple Explanation:** The same method can behave **differently** depending on which object calls it.

**Think of it like:** The word **"run"** means different things:
- A person **runs** =��� (using legs)
- A car **runs** =��� (using engine)  
- A computer program **runs** =��+ (using CPU)

Same word, **different behavior** G�� that's polymorphism!

\`\`\`java
class Animal {
    void sound() {
        System.out.println("Some animal sound...");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Woof Woof! =���");  // Dog's version
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Meow Meow! =�ɦ");  // Cat's version
    }
}

class Duck extends Animal {
    @Override
    void sound() {
        System.out.println("Quack Quack! =���"); // Duck's version
    }
}

// The magic of polymorphism:
Animal myPet;

myPet = new Dog();
myPet.sound();  // "Woof Woof! =���"

myPet = new Cat();
myPet.sound();  // "Meow Meow! =�ɦ"

myPet = new Duck();
myPet.sound();  // "Quack Quack! =���"

// Same method name (sound), DIFFERENT behavior!
\`\`\`

**Two types of Polymorphism:**
1. **Compile-time (Method Overloading):** Same method name, different parameters G�� decided at compile time
2. **Runtime (Method Overriding):** Child class rewrites parent's method G�� decided at runtime

#### =��� Pillar 4: ABSTRACTION (Showing Only What's Necessary)

**Simple Explanation:** Showing only the **essential features** and hiding the complex implementation details.

**Think of it like:** When you drive a car =���, you only need to know:
- Steering wheel (to turn)
- Accelerator (to go)
- Brake (to stop)

You DON'T need to know how the engine combustion works, how the transmission shifts gears, or how fuel injection happens. All that complexity is **abstracted** (hidden) away!

\`\`\`java
// Abstract class G�� like a blueprint, can't be used directly
abstract class Shape {
    String color;
    
    // Abstract method G�� no body, just a promise
    abstract double calculateArea();
    
    // Regular method G�� has a body
    void displayColor() {
        System.out.println("Color: " + color);
    }
}

// Concrete class G�� fills in the details
class Circle extends Shape {
    double radius;
    
    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    @Override
    double calculateArea() {
        return Math.PI * radius * radius;  // -�r-�
    }
}

class Rectangle extends Shape {
    double length, width;
    
    Rectangle(double length, double width, String color) {
        this.length = length;
        this.width = width;
        this.color = color;
    }
    
    @Override
    double calculateArea() {
        return length * width;
    }
}

// Usage:
Shape circle = new Circle(5, "Red");
System.out.println("Circle area: " + circle.calculateArea());  // 78.54
circle.displayColor();  // "Color: Red"
\`\`\`

---

### =��� Quick Summary Table

| Feature | What It Means | Real-World Example |
|---------|---------------|-------------------|
| **Encapsulation** | Hide data, show methods | TV remote (hidden wiring) |
| **Inheritance** | Child gets parent's features | Child inherits parent's traits |
| **Polymorphism** | Same action, different behavior | "Run" means different things |
| **Abstraction** | Hide complexity, show simplicity | Driving a car (hidden engine) |

### =��� Practice Questions
1. What does WORA stand for?
2. Name any 5 features of Java.
3. What is the difference between encapsulation and abstraction?
4. Give a real-life example of inheritance.
5. What are the two types of polymorphism?

=��� **Key Takeaway:** Java is a simple, secure, platform-independent, object-oriented language. OOP has 4 pillars: Encapsulation (hide data), Inheritance (reuse code), Polymorphism (many forms), Abstraction (hide complexity).`,
    commonQuestions: [
      {
        patterns: ['features of java', 'java features', 'why java', 'characteristics of java'],
        answer: `## =�� Features of Java G�� Explained Like a Story!

Imagine Java as a **superhero** =��+ with 10 amazing powers:

### 1. =��� Simple
Java removed the hard stuff from C++ (no pointers, no goto). It's like learning to ride a bike **with training wheels** G�� easier to start!

### 2. =��� Platform Independent (WORA)
Write your code ONCE G�� runs on ANY computer (Windows, Mac, Linux). 

**How?** Java compiles to **bytecode** G�� a universal language that the JVM understands on every platform.
\`\`\`
.java file G�� javac G�� .class file (bytecode) G�� JVM G�� Runs anywhere!
\`\`\`

### 3. =�Ţn+� Object-Oriented
Everything is organized as objects G�� like the real world (Car object, Student object, Dog object).

### 4. =��� Secure
- No pointers (can't access random memory)
- Runs inside JVM sandbox (protected area)
- Built-in security manager

### 5. =�Ƭ Robust
- Catches errors early (compile-time checking)
- Garbage collector cleans unused memory automatically
- Exception handling prevents crashes

### 6. =��� Multithreaded
Can do multiple tasks simultaneously G�� like a chef stirring soup while chopping vegetables!

### 7. =��� High Performance
JIT compiler makes frequently-used code super fast.

### 8. =��� Portable
Same bytecode works everywhere G�� no recompilation needed.

### 9. =��� Distributed
Can work with programs on different computers across the internet.

### 10. =��� Dynamic
Can load new classes while the program is already running.

=��� **Remember this:** Java = G�� Coffee + =��+ Superhero powers = Simple, Secure, Platform-independent, OOP, Robust, Multithreaded!`
      },
      {
        patterns: ['oop', 'object oriented', 'oops concept', 'pillars of oop', 'what is oop', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction'],
        answer: `## =�Ţn+� 4 Pillars of OOP G�� Explained with Real-Life Examples!

Think of OOP like **building with LEGO blocks** =��� G�� small, reusable pieces that combine into amazing things!

### =��� 1. ENCAPSULATION (Data Hiding)
**What:** Wrap data + methods together, hide the internals.
**Real life:** A **TV Remote** =��� G�� you press buttons (public methods) but don't see the wiring inside (private data).

\`\`\`java
class Student {
    private int marks;         // HIDDEN (private)
    
    public void setMarks(int m) {  // BUTTON (public)
        if (m >= 0 && m <= 100) marks = m;
    }
    public int getMarks() { return marks; }
}
\`\`\`

### =��� 2. INHERITANCE (Code Reuse)
**What:** Child class gets all features of parent class.
**Real life:** You **inherited** your eyes from mom, height from dad!

\`\`\`java
class Animal { void eat() { } }          // Parent
class Dog extends Animal { void bark() {} } // Child G�� gets eat() + own bark()
\`\`\`

### =��� 3. POLYMORPHISM (Many Forms)
**What:** Same method name, different behavior based on the object.
**Real life:** The word **"open"** G�� open a door =�ܬ, open a book =���, open a bottle =�� G�� same word, different actions!

\`\`\`java
class Dog { void sound() { System.out.println("Woof!"); } }
class Cat { void sound() { System.out.println("Meow!"); } }
\`\`\`

### =��� 4. ABSTRACTION (Hide Complexity)
**What:** Show only essential features, hide complex details.
**Real life:** **Driving a car** =��� G�� you use steering & pedals, but don't know how the engine works inside!

\`\`\`java
abstract class Shape {
    abstract double area();  // WHAT to do (no HOW)
}
class Circle extends Shape {
    double area() { return Math.PI * r * r; }  // HOW to do it
}
\`\`\`

### =��� Summary Table
| Pillar | Keyword | Analogy |
|--------|---------|---------|
| Encapsulation | **Hide** | TV Remote |
| Inheritance | **Reuse** | Parent G�� Child traits |
| Polymorphism | **Many forms** | "Open" means different things |
| Abstraction | **Simplify** | Driving a car |

=��� **Memory trick:** Think **E-I-P-A** = "**E**very **I**ntelligent **P**erson **A**bstracts!"
`
      }
    ]
  },
  {
    topicId: 'u1t2',
    title: 'Java Virtual Machine (JVM) & Architecture',
    keywords: ['JVM', 'Java Virtual Machine', 'architecture', 'class loader', 'bytecode', 'execution engine', 'JIT', 'heap', 'stack', 'method area', 'garbage collector', 'JDK', 'JRE', 'memory', 'runtime'],
    content: `## =���n+� Java Virtual Machine (JVM) & Architecture

### =��� Story Time: The Universal Translator

Imagine you wrote a beautiful poem in English. Now you want people in Japan, France, India, and Brazil to read it. You have two options:

1. G�� Rewrite the poem in Japanese, French, Hindi, Portuguese... (SO much work!)
2. G�� Give it to a **universal translator** who can read English and speak it in ANY language!

**JVM is that universal translator!** You write Java code once, and the JVM "translates" it so ANY computer can understand it.

---

### =��� JDK vs JRE vs JVM G�� The 3 Layers

Think of it like a **Russian nesting doll** =���:

\`\`\`
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
G��               JDK (Java Development Kit) G��  G�� For DEVELOPERS
G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��     (javac, javadoc, jar)
G��  G��          JRE (Java Runtime)      G��    G��  G�� For USERS
G��  G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��    G��
G��  G��  G��       JVM (Virtual Machine)G��   G��    G��  G�� The BRAIN
G��  G��  G��   (executes bytecode)     G��    G��    G��
G��  G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��    G��
G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
\`\`\`

| Component | What It Contains | Who Uses It | Analogy |
|-----------|-----------------|-------------|---------|
| **JDK** | JRE + development tools (compiler, debugger) | Developers who WRITE code | Complete toolbox =��� |
| **JRE** | JVM + standard libraries | Users who RUN Java programs | Instruction manual =��� |
| **JVM** | The execution engine only | Internal (nobody directly) | The brain =��� |

**Simple Rule:**
- Want to **write** Java? Install **JDK** G��n+�
- Want to **run** Java? Install **JRE** G��n+�
- JVM comes inside both G�� you never install it separately

---

### =���n+� JVM Architecture (How Java Code Actually Runs)

When you write \`HelloWorld.java\` and run it, here's what happens step by step:

\`\`\`
Step 1: You write code          G�� HelloWorld.java
Step 2: Compiler converts it    G�� HelloWorld.class (bytecode)
Step 3: JVM loads the bytecode  G�� Class Loader loads it into memory
Step 4: JVM verifies it         G�� Bytecode Verifier checks for errors
Step 5: JVM executes it         G�� Execution Engine runs the code
Step 6: Output appears!         G�� "Hello, World!" on screen
\`\`\`

Let's look inside the JVM G�� it has **3 main sections**:

#### =��+ Section 1: CLASS LOADER SUBSYSTEM

The **doorman** =�ܬ of the JVM G�� it loads your class files into memory.

**Three phases:**
1. **Loading** G�� Reads the .class file from disk
2. **Linking** G�� Verifies the code, prepares memory, connects references
3. **Initialization** G�� Runs static blocks and initializes static variables

**Think of it like:** A librarian =��� who (1) finds your book, (2) checks it's not damaged, and (3) opens it to the right page.

#### =��+ Section 2: RUNTIME DATA AREAS (Memory)

This is the JVM's **memory layout** G�� where all your data lives while the program runs.

\`\`\`
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
G��              JVM Memory Areas                G��
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
G��  Method     G��   Heap     G��   Stack          G��
G��  Area       G��            G��   (per thread)   G��
G��             G��            G��                  G��
G�� Class info  G�� Objects &  G�� Local variables  G��
G�� Static vars G�� Arrays     G�� Method calls     G��
G�� Constants   G��            G�� Return addresses G��
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
G��  PC Register G�� Native Method Stack           G��
G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
\`\`\`

| Memory Area | What It Stores | Analogy |
|-------------|---------------|---------|
| **Method Area** | Class info, static variables, constants | Library catalog =��� |
| **Heap** | All objects and arrays | Storage warehouse =��� |
| **Stack** | Local variables, method calls | Stack of plates =��+n+� |
| **PC Register** | Address of current instruction | Bookmark in a book =��� |
| **Native Method Stack** | Info for native (C/C++) methods | Translator booth =���n+� |

**Important distinction:**
\`\`\`java
Student s = new Student("Rahul");
//  G�� 's' lives in STACK        G�� Student object lives in HEAP
//  (the reference/address)     (the actual data)
\`\`\`

**Think of it like:** The **stack** holds a piece of paper with an address =���, and the **heap** is the actual house =��� at that address.

#### =��+ Section 3: EXECUTION ENGINE

The **worker** =��+ who actually runs your code!

- **Interpreter:** Reads bytecode line-by-line (slow but starts fast)
- **JIT Compiler:** Converts frequently-used bytecode to native machine code (fast but takes time to compile)
- **Garbage Collector:** Automatically deletes objects you no longer need (free memory!)

**Think of the Garbage Collector like:** A cleaning robot =��� in your house that automatically throws away things you're not using anymore G�� you never have to clean up manually!

\`\`\`java
Student s = new Student("Rahul");  // Object created in heap
s = null;  // s no longer points to the object
// The garbage collector will eventually remove the Student object
// because nobody is using it anymore! =���n+�
\`\`\`

---

### =��� How Java Program Executes G�� Complete Flow

\`\`\`
                    YOU WRITE
                HelloWorld.java
                      G��
                      G�+
              G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
              G��  javac        G��  G�� COMPILER
              G��  (compiler)   G��
              G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
                      G��
                      G�+
              HelloWorld.class
              (BYTECODE)
                      G��
                      G�+
        G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
        G��         J V M            G��
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��  G��   Class Loader     G��  G�� G�� Loads .class file
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��           G�+              G��
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��  G��  Bytecode Verifier G��  G�� G�� Checks for errors
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��           G�+              G��
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��  G�� Execution Engine   G��  G�� G�� Runs the code
        G��  G�� (Interpreter+JIT)  G��  G��
        G��  G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��  G��
        G��           G�+              G��
        G��     OUTPUT ON SCREEN     G��
        G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
\`\`\`

### =��� Practice Questions
1. What is the difference between JDK, JRE, and JVM?
2. What does the Class Loader do?
3. Where are objects stored in JVM memory G�� Stack or Heap?
4. What is the role of the Garbage Collector?
5. What is the difference between Interpreter and JIT Compiler?

=��� **Key Takeaway:** JVM is the brain of Java G�� it loads, verifies, and executes bytecode. JDK = JRE + tools, JRE = JVM + libraries. Objects live in Heap, local variables live in Stack. Garbage Collector auto-cleans unused objects.`,
    commonQuestions: [
      {
        patterns: ['what is jvm', 'jvm architecture', 'java virtual machine', 'how jvm works', 'explain jvm'],
        answer: `## =��� JVM (Java Virtual Machine) G�� The Brain of Java!

**Simple Explanation:** JVM is a **virtual computer** inside your real computer that runs Java bytecode. It's the reason Java is "Write Once, Run Anywhere"!

### How it works (step by step):
\`\`\`
Your Code (.java) G�� Compiler (javac) G�� Bytecode (.class) G�� JVM G�� Runs!
\`\`\`

### JVM has 3 main parts:

**1. Class Loader** =��� G�� Loads your .class files into memory (like a librarian finding your book)

**2. Memory Areas:**
- **Heap** = where objects live (like a storage warehouse =���)
- **Stack** = where local variables live (like a stack of plates =��+n+�)
- **Method Area** = where class info lives (like a library catalog =���)

**3. Execution Engine** G��n+�
- **Interpreter:** Reads code line by line (like a live translator =���n+�)
- **JIT Compiler:** Converts hot code to fast machine code (like pre-translating a book =���)
- **Garbage Collector:** Auto-deletes unused objects (like a cleaning robot =���)

\`\`\`java
Student s = new Student("Rahul");
//     G�� reference in STACK    G�� object in HEAP

s = null;  // Garbage collector will clean up the object!
\`\`\`

### Remember:
\`\`\`
JDK = JRE + Dev Tools =��� (for writing code)
JRE = JVM + Libraries =��� (for running code)
JVM = The engine =��� (that runs bytecode)
\`\`\`

=��� **Key Point:** JVM makes Java platform-independent. Same bytecode runs on Windows, Mac, and Linux!`
      },
      {
        patterns: ['jdk vs jre', 'jdk jre jvm', 'difference between jdk and jre', 'what is jdk', 'what is jre'],
        answer: `## JDK vs JRE vs JVM G�� Simple Explanation!

Think of it like **Russian nesting dolls** =���:

\`\`\`
JDK  (biggest)  = JRE + Development Tools
 G��G��G�� JRE (medium) = JVM + Standard Libraries
      G��G��G�� JVM (smallest) = The Engine
\`\`\`

| | JDK | JRE | JVM |
|---|---|---|---|
| **Full Name** | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| **For whom?** | Developers G��n+� | Users G��n+� | Internal =��� |
| **Contains** | Compiler (javac), Debugger, JRE | Libraries, JVM | Execution Engine |
| **Can compile?** | G�� Yes | G�� No | G�� No |
| **Can run?** | G�� Yes | G�� Yes | G�� Yes |

**Simple Rule:**
- **Writing** Java code? G�� Install **JDK**
- **Running** Java programs? G�� Install **JRE**
- JVM is **inside** both G�� never install separately

=��� **Analogy:** JDK is a **kitchen** =��� (has stove + ingredients + utensils). JRE is a **microwave** =��� (can only heat/run food). JVM is the **electricity** =��� that powers both!`
      }
    ]
  },
  {
    topicId: 'u1t3',
    title: 'Java Bytecode & Compilation Process',
    keywords: ['bytecode', 'compilation', 'javac', 'compiler', 'interpreter', 'class file', 'source code', 'machine code', 'JIT', 'compile', 'run', 'execute'],
    content: `## =��� Java Bytecode & Compilation Process

### =��� Story Time: The Magic Recipe Book

Imagine you're a chef who writes recipes in English. But your kitchen helpers speak different languages G�� one speaks Hindi, another Tamil, another French. 

Instead of writing the recipe in each language, you write it in a **special code** that a universal translator in each kitchen can read and convert to the local language.

In Java:
- **Your recipe** = Java source code (.java)
- **Special code** = Bytecode (.class)
- **Universal translator** = JVM (Java Virtual Machine)

---

### =��� The Complete Journey: From Code to Output

\`\`\`
  Step 1           Step 2              Step 3               Step 4
G��G��G��G��G��G��G��G��G��G��G��G��   G��G��G��G��G��G��G��G��G��G��G��G��      G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��G��G��G��G��G��G��G��G��G��G��G��
G�� You write G��   G�� javac     G��      G�� JVM reads      G��    G�� Output   G��
G�� .java     G��G��G��G��G�� compiles  G��G��G��G��   G�� bytecode &     G��G��G��G�� G�� appears  G��
G�� file      G��   G�� to .class G��      G�� executes it    G��    G�� on screenG��
G��G��G��G��G��G��G��G��G��G��G��G��   G��G��G��G��G��G��G��G��G��G��G��G��      G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��    G��G��G��G��G��G��G��G��G��G��G��G��
  (English)     (Universal          (Translated to        (Result!)
                 code)               machine language)
\`\`\`

### G�� Let's Walk Through an Example

#### Step 1: Write the Source Code

\`\`\`java
// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World! =���");
        System.out.println("Java is awesome!");
    }
}
\`\`\`

#### Step 2: Compile It

Open your terminal/command prompt and type:
\`\`\`bash
javac HelloWorld.java
\`\`\`

**What happens behind the scenes:**
1. The \`javac\` compiler reads your \`.java\` file
2. Checks for syntax errors (missing semicolons, wrong spellings, etc.)
3. If everything is correct G�� creates \`HelloWorld.class\` (bytecode file)
4. If there's an error G�� shows error message and STOPS

**The .class file contains BYTECODE** G�� it starts with the magic bytes **CA FE BA BE** (Caf+� Babe G�� a coffee reference! G��)

#### Step 3: Run It

\`\`\`bash
java HelloWorld
\`\`\`

**What happens:**
1. JVM's Class Loader loads \`HelloWorld.class\` into memory
2. Bytecode Verifier checks the code is safe
3. Execution Engine (Interpreter + JIT) runs it
4. Output appears on screen!

#### Step 4: See the Output
\`\`\`
Hello, World! =���
Java is awesome!
\`\`\`

---

### =��� What Exactly is Bytecode?

Bytecode is **intermediate code** G�� it's NOT human-readable and NOT machine code. It sits in between!

\`\`\`
Human Language           Intermediate          Machine Language
(you can read)           (bytecode)            (computer reads)
                              
Java Source Code    G��    Bytecode         G��    Machine Code
(.java file)             (.class file)          (0s and 1s)
     G��                       G��                       G��
You write this         javac creates this      JVM converts this
\`\`\`

### Why Bytecode is Brilliant:

| Without Bytecode G�� | With Bytecode G�� |
|---------------------|-------------------|
| Compile separately for Windows | Compile **once** |
| Compile separately for Mac | Run **anywhere** |
| Compile separately for Linux | JVM handles the rest |
| 3 compilations for 3 platforms | 1 compilation for ALL platforms |

---

### G�� Interpreter vs JIT Compiler

The JVM uses TWO ways to execute bytecode:

| Feature | Interpreter | JIT Compiler |
|---------|------------|-------------|
| **How** | Reads line-by-line | Converts blocks to machine code |
| **Speed** | Slow (translates every time) | Fast (translates once, reuses) |
| **Startup** | Fast (starts immediately) | Slow (needs time to compile) |
| **Used for** | Code that runs once | Code that runs many times (loops) |

**Think of it like:**
- **Interpreter** = A human translator at a meeting G�� translates each sentence as it's spoken (slow but immediate)
- **JIT Compiler** = Translating the entire book beforehand G�� takes time upfront but reading is fast afterward

The JVM is smart G�� it starts with the **interpreter** and switches to **JIT** for code that runs frequently (called "hot spots")!

---

### =��� Java vs C/C++ Compilation

| Feature | C/C++ | Java |
|---------|-------|------|
| Compiled to | Machine code directly | Bytecode first |
| Platform dependent? | G�� Yes (recompile for each OS) | G�� No (WORA) |
| Intermediate step? | No | Yes (bytecode) |
| Runs on | Specific hardware | Any JVM |

### =��� Practice Questions
1. What is bytecode?
2. What is the difference between a compiler and an interpreter?
3. What command compiles a Java program?
4. What does "CAFE BABE" mean in Java bytecode?
5. Why is Java called "platform independent"?

=��� **Key Takeaway:** Java compiles to bytecode (.class), not machine code. This bytecode runs on any JVM, making Java platform-independent. The JVM uses both an interpreter (for quick start) and JIT compiler (for speed).`,
    commonQuestions: [
      {
        patterns: ['what is bytecode', 'bytecode in java', 'explain bytecode', 'java bytecode', 'class file', 'compilation process', 'how java compiles'],
        answer: `## =��� Java Bytecode G�� The Universal Language!

**Simple Explanation:** Bytecode is the **intermediate code** that Java creates when you compile your program. It's like a universal recipe that any kitchen (JVM) in the world can follow!

### The Journey:
\`\`\`
Your Code (.java)  G��  javac compiler  G��  Bytecode (.class)  G��  JVM  G��  Runs!
\`\`\`

### Step by Step:
\`\`\`java
// 1. You write this (HelloWorld.java):
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello!");
    }
}
\`\`\`
\`\`\`bash
// 2. Compile it:
javac HelloWorld.java    # Creates HelloWorld.class (bytecode)

// 3. Run it:
java HelloWorld           # JVM reads bytecode G�� shows output
\`\`\`

### Why Bytecode is Special:
| Without Bytecode | With Bytecode |
|------------------|---------------|
| Compile for Windows G�� | Compile ONCE G�� |
| Compile for Mac G�� | Run ANYWHERE G�� |
| Compile for Linux G�� | JVM handles it G�� |

### Interpreter vs JIT:
- **Interpreter** = translates line by line (quick start, slower execution)
- **JIT Compiler** = translates whole blocks (slow start, faster execution)
- JVM uses BOTH G�� interpreter first, then JIT for frequently-run code!

**Fun fact:** Every .class file starts with **CA FE BA BE** (Caf+� Babe) G�� a coffee reference! G��

=��� **Key Takeaway:** Bytecode is Java's secret sauce for platform independence. Write once G�� compile once G�� run anywhere!`
      }
    ]
  },
  {
    topicId: 'u1t4',
    title: 'Data Types in Java',
    keywords: ['data type', 'primitive', 'int', 'float', 'double', 'char', 'boolean', 'byte', 'short', 'long', 'String', 'reference type', 'non-primitive', 'size', 'range', 'type casting', 'widening', 'narrowing'],
    content: `## =��� Data Types in Java

### =��� Story Time: The Container Shop

Imagine you go to a **container shop** =�Ŭ. You need different containers for different things:
- A **tiny box** for a ring =��� (needs very little space)
- A **medium box** for shoes =�� (needs more space)
- A **large box** for a TV =��� (needs a lot of space)

In Java, **data types are like containers** G�� they tell Java how much memory to reserve and what kind of value you'll put inside!

---

### =��� The 8 Primitive Data Types

Think of these like **8 different-sized boxes** in your container shop:

#### =��� Integer Types (For whole numbers G�� no decimals)

| Type | Size | Range | Analogy | Example |
|------|------|-------|---------|---------|
| **byte** | 1 byte | -128 to 127 | Matchbox =��� | \`byte age = 25;\` |
| **short** | 2 bytes | -32,768 to 32,767 | Shoebox =��� | \`short temp = -10;\` |
| **int** | 4 bytes | -�2.1 billion | Suitcase =��� | \`int salary = 50000;\` |
| **long** | 8 bytes | Very very large | Shipping container =��� | \`long pop = 8000000000L;\` |

#### =��� Decimal Types (For numbers with a decimal point)

| Type | Size | Precision | Example |
|------|------|-----------|---------|
| **float** | 4 bytes | ~7 digits | \`float pi = 3.14f;\` (need **f**!) |
| **double** | 8 bytes | ~15 digits | \`double price = 99.99;\` |

#### =��� Character & Boolean

| Type | Size | What It Stores | Example |
|------|------|---------------|---------|
| **char** | 2 bytes | Single character | \`char grade = 'A';\` |
| **boolean** | 1 bit* | true or false only | \`boolean pass = true;\` |

> *boolean represents 1 bit of info, but JVM uses 1 byte internally

### G�� Complete Code Example

\`\`\`java
public class DataTypesDemo {
    public static void main(String[] args) {
        // Integer types
        byte myAge = 20;                    // small number
        short temperature = -15;            // small range
        int salary = 75000;                 // most common!
        long worldPopulation = 8000000000L; // very large (note the L!)

        // Decimal types
        float pi = 3.14159f;               // note the 'f'!
        double bankBalance = 1234567.89;    // more precision

        // Character
        char grade = 'A';                   // single quotes!

        // Boolean
        boolean isJavaFun = true;

        // Print all
        System.out.println("Age: " + myAge);
        System.out.println("Salary: G�" + salary);
        System.out.println("Population: " + worldPopulation);
        System.out.println("Pi: " + pi);
        System.out.println("Grade: " + grade);
        System.out.println("Java is fun? " + isJavaFun);
    }
}
\`\`\`

### =��� Type Casting (Converting Types)

#### Widening (Auto G�� small G�� big) G�� Safe
\`\`\`java
int x = 100;
double d = x;  // int G�� double (automatic!)
// Like pouring water from a cup G�� bucket (nothing spills!)
\`\`\`

#### Narrowing (Manual G�� big G�� small) G��n+� May lose data!
\`\`\`java
double price = 9.78;
int rounded = (int) price;  // double G�� int = 9 (decimal lost!)
// Like pouring water from a bucket G�� cup (some spills!)
\`\`\`

### =��� Practice Questions
1. How many primitive data types are in Java?
2. What is the most common type for whole numbers?
3. Why do we add 'f' after a float value?
4. What is type casting?

=��� **Key Takeaway:** Java has 8 primitive types. Use \`int\` for whole numbers, \`double\` for decimals, \`boolean\` for true/false. Widening is automatic, narrowing needs explicit cast.`,
    commonQuestions: [
      {
        patterns: ['data types', 'types in java', 'primitive types', 'what are data types', 'int float char boolean'],
        answer: `## =��� Java Data Types G�� The 8 Boxes!

Think of data types like **containers** in a shop G�� different sizes for different things!

### =��� For Whole Numbers:
| Type | Size | Example | Analogy |
|------|------|---------|---------|
| \`byte\` | 1 byte | \`byte age = 25;\` | Matchbox =��� |
| \`short\` | 2 bytes | \`short temp = -10;\` | Shoebox =��� |
| \`int\` | 4 bytes | \`int salary = 50000;\` | **Suitcase =��� (Most used!)** |
| \`long\` | 8 bytes | \`long pop = 8000000000L;\` | Container =��� |

### =��� For Decimals:
| Type | Size | Example |
|------|------|---------|
| \`float\` | 4 bytes | \`float pi = 3.14f;\` (need **f**!) |
| \`double\` | 8 bytes | \`double price = 99.99;\` G�� **Most used!** |

### =��� Other:
| Type | Example |
|------|---------|
| \`char\` | \`char grade = 'A';\` (single quotes!) |
| \`boolean\` | \`boolean pass = true;\` (only true/false) |

### Type Casting:
\`\`\`java
int x = 100;
double d = x;        // Widening (auto) G�� G�� cup G�� bucket
int y = (int) 9.78;  // Narrowing (manual) G�� 9 G��n+� G�� bucket G�� cup
\`\`\`

=��� **Memory trick:** **B-S-I-L-F-D-C-B** = byte, short, int, long, float, double, char, boolean!`
      }
    ]
  },
  {
    topicId: 'u1t5',
    title: 'Variables, Arrays & Expressions',
    keywords: ['variable', 'array', 'expression', 'declaration', 'initialization', 'local variable', 'instance variable', 'static variable', 'class variable', 'array declaration', 'multi-dimensional array', '2D array', 'final', 'constant', 'scope'],
    content: `## =��� Variables, Arrays & Expressions

### =��� Variables G�� Named Storage Boxes

**Simple Definition:** A variable is a **named box** that stores a value in memory.

**Think of it like:** Labeled jars in a kitchen =�Ŧ
- Jar labeled "Sugar" G�� contains sugar
- Jar labeled "Salt" G�� contains salt
- You can empty a jar and put something new in it!

\`\`\`java
int age = 20;           // jar labeled "age" contains 20
String name = "Rahul";  // jar labeled "name" contains "Rahul"
double price = 99.99;   // jar labeled "price" contains 99.99

age = 21;               // now age is 21 (old value 20 is gone)
\`\`\`

#### =��+ Three Types of Variables

\`\`\`java
class Student {
    // 1. INSTANCE VARIABLE G�� each object has its own copy
    String name;           // like each student has their own name
    int age;

    // 2. STATIC VARIABLE G�� shared by ALL objects
    static String school = "ABC School";  // same school for everyone

    void study() {
        // 3. LOCAL VARIABLE G�� exists only inside this method
        int hours = 5;     // like a sticky note G�� temporary!
    }
}
\`\`\`

| Type | Where | Scope | Default Value |
|------|-------|-------|---------------|
| **Local** | Inside method | That method only | None (must set!) |
| **Instance** | In class, per object | Each object | 0, null, false |
| **Static** | Shared by ALL objects | Whole class | 0, null, false |

---

### =��� Arrays G�� Row of Numbered Boxes

**Think of it like:** A row of lockers in school =���, each numbered starting from **0**.

\`\`\`
Index:   [0]   [1]   [2]   [3]   [4]
         G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
marks:   G�� 85  G�� 92  G�� 78  G�� 95  G�� 88  G��
         G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
\`\`\`

\`\`\`java
// Creating arrays
int[] marks = {85, 92, 78, 95, 88};     // shortcut (most common)
String[] names = new String[3];          // empty array of size 3

// Accessing elements (index starts at 0!)
System.out.println(marks[0]);  // 85 (first)
System.out.println(marks[4]);  // 88 (last)
System.out.println(marks.length); // 5

// Loop through all elements
for (int i = 0; i < marks.length; i++) {
    System.out.println("Subject " + (i+1) + ": " + marks[i]);
}

// Enhanced for-each loop
for (int mark : marks) {
    System.out.println("Mark: " + mark);
}
\`\`\`

#### =��� 2D Arrays (Tables)
\`\`\`java
int[][] grid = {
    {1, 2, 3},    // Row 0
    {4, 5, 6},    // Row 1
    {7, 8, 9}     // Row 2
};
System.out.println(grid[1][2]); // 6 (row 1, column 2)
\`\`\`

---

### =��� Expressions & Constants

\`\`\`java
// Expressions produce values
int sum = 10 + 20;                      // 30
boolean isAdult = (age >= 18);          // true or false
String greeting = "Hello " + name + "!"; // string joining

// Constants (can't change!)
final double PI = 3.14159;
// PI = 3.14;  // G�� ERROR! final means "carved in stone" =���
\`\`\`

### =��� Practice Questions
1. What index does the first array element have?
2. What are the 3 types of variables?
3. What does \`final\` keyword do?

=��� **Key Takeaway:** Variables are named boxes. Arrays are numbered rows of boxes (index starts at 0). Use \`final\` for constants that never change.`,
    commonQuestions: [
      {
        patterns: ['what is variable', 'variables in java', 'types of variables', 'declare variable'],
        answer: `## =��� Variables in Java G�� Named Storage Boxes!

A variable stores a value in memory G�� like a **labeled jar** =�Ŧ.

\`\`\`java
int age = 20;           // jar "age" holds 20
String name = "Rahul";  // jar "name" holds "Rahul"
boolean pass = true;    // jar "pass" holds true
\`\`\`

### 3 Types:
| Type | Where | Example |
|------|-------|---------|
| **Local** | Inside method (temporary!) | \`int x = 5;\` |
| **Instance** | Per object (each has own) | \`String name;\` |
| **Static** | Shared by ALL objects | \`static int count;\` |

=��� Local variables MUST be initialized before use!`
      },
      {
        patterns: ['what is array', 'array in java', 'how to create array', 'declare array', 'array example'],
        answer: `## =��� Arrays G�� Row of Numbered Boxes!

An array is a **fixed-size collection** of same-type items, indexed from **0**.

\`\`\`
Index:  [0]   [1]   [2]   [3]   [4]
        G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
marks:  G�� 85  G�� 92  G�� 78  G�� 95  G�� 88  G��
        G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��
\`\`\`

\`\`\`java
int[] marks = {85, 92, 78, 95, 88};

marks[0]       // 85 (first element)
marks[4]       // 88 (last element)
marks.length   // 5 (total elements)

// Loop through
for (int mark : marks) {
    System.out.println(mark);
}

// 2D array
int[][] grid = {{1,2,3}, {4,5,6}};
grid[1][2]     // 6 (row 1, col 2)
\`\`\`

G��n+� Index starts at **0**! Array of size 5 G�� indexes 0,1,2,3,4 (no index 5!)`
      }
    ]
  },
  {
    topicId: 'u1t6',
    title: 'Operators in Java',
    keywords: ['operator', 'arithmetic', 'relational', 'logical', 'assignment', 'ternary', 'unary', 'increment', 'decrement', 'conditional', 'modulus', 'comparison', 'AND', 'OR', 'NOT'],
    content: `## G��n+� Operators in Java

### =��� Simple Explanation
Operators are **symbols** that perform operations on values G�� like math symbols (+, -, +�, ++) but more powerful!

---

### =��� 1. Arithmetic Operators (Math)
\`\`\`java
int a = 10, b = 3;
a + b   // 13  G�� Addition
a - b   // 7   G�� Subtraction
a * b   // 30  G�� Multiplication
a / b   // 3   G�� Division (integer! No decimal)
a % b   // 1   G�� Modulus (remainder: 10++3 = 3 remainder 1)
\`\`\`

G��n+� **Tricky:** \`7 / 2 = 3\` (not 3.5!) G�� use \`7.0 / 2\` for decimals.

**Modulus (%) is super useful:**
\`\`\`java
if (num % 2 == 0) System.out.println("Even!");  // check even/odd
int lastDigit = 1234 % 10;  // 4 (get last digit)
\`\`\`

---

### GP�GP� 2. Increment/Decrement (++ and --)
\`\`\`java
int x = 5;
x++;    // x becomes 6 (add 1)
x--;    // x becomes 5 (subtract 1)

// Pre vs Post:
int a = 5;
int b = a++;   // b = 5, a = 6 (use FIRST, then increment)
int c = ++a;   // c = 7, a = 7 (increment FIRST, then use)
\`\`\`
**Think of it like a ticket counter:**
- \`a++\` = "Take your token, THEN I'll change the number"
- \`++a\` = "Let me change the number FIRST, then take your token"

---

### G��n+� 3. Relational Operators (Compare G�� true/false)
\`\`\`java
10 == 10  // true  (equal to) G�� NOTE: double equals!
10 != 5   // true  (not equal)
10 > 5    // true  (greater than)
10 < 20   // true  (less than)
10 >= 10  // true  (greater or equal)
10 <= 5   // false (less or equal)
\`\`\`
G��n+� **Common Mistake:** \`=\` assigns, \`==\` compares!

---

### =��� 4. Logical Operators (Combine Conditions)
\`\`\`java
// AND (&&) G�� BOTH must be true
if (age >= 18 && hasID) { /* enter movie */ }
// "Do you have BOTH ticket AND ID?"

// OR (||) G�� At least ONE must be true
if (age < 13 || age > 60) { /* get discount */ }
// "Are you a child OR a senior?"

// NOT (!) G�� Reverses true/false
if (!isRaining) { /* go outside */ }
// "Is it NOT raining?"
\`\`\`

---

### G�� 5. Ternary Operator (Short if-else)
\`\`\`java
String status = (age >= 18) ? "Adult" : "Minor";
// condition ? valueIfTrue : valueIfFalse
// "Is it raining? YES G�� umbrella : NO G�� sunglasses"
\`\`\`

---

### =��� 6. Assignment Operators (Shortcuts)
\`\`\`java
x += 5;   // x = x + 5
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
x /= 4;   // x = x / 4
x %= 3;   // x = x % 3
\`\`\`

### =��� Practice Questions
1. What is \`10 % 3\`?
2. Difference between \`=\` and \`==\`?
3. Difference between \`a++\` and \`++a\`?
4. Write a ternary to find the max of two numbers.

=��� **Key Takeaway:** Arithmetic (+,-,*,/,%), Relational (==,!=,>,<), Logical (&&,||,!), Ternary (?:). Remember: \`=\` assigns, \`==\` compares!`,
    commonQuestions: [
      {
        patterns: ['operators in java', 'types of operators', 'java operators', 'arithmetic operator', 'logical operator', 'ternary operator'],
        answer: `## G��n+� Java Operators G�� Complete Guide!

### Arithmetic (Math):
\`\`\`java
10 + 3  // 13 (Add)     10 - 3  // 7 (Subtract)
10 * 3  // 30 (Multiply) 10 / 3  // 3 (Divide G�� integer!)
10 % 3  // 1 (Remainder)
\`\`\`

### Relational (Compare G�� true/false):
\`\`\`java
== (equal)   != (not equal)   > (greater)
<  (less)    >= (greater/eq)  <= (less/eq)
\`\`\`

### Logical (Combine conditions):
\`\`\`java
&&  // AND G�� both true     ||  // OR G�� at least one true
!   // NOT G�� reverses
\`\`\`

### Ternary (Short if-else):
\`\`\`java
String s = (age >= 18) ? "Adult" : "Minor";
\`\`\`

### Increment: \`x++\` (use then add) vs \`++x\` (add then use)

G��n+� \`=\` assigns, \`==\` compares!`
      }
    ]
  },
  {
    topicId: 'u1t7',
    title: 'Control Structures (if, switch, loops)',
    keywords: ['control', 'if', 'else', 'switch', 'case', 'for', 'while', 'do while', 'loop', 'break', 'continue', 'nested', 'condition', 'iteration', 'decision', 'flow control', 'for-each'],
    content: `## =��� Control Structures (if, switch, loops)

### =��� Simple Explanation
Normally, Java runs code **line by line from top to bottom**. But what if you want to:
- Make a **decision**? G�� Use if/switch
- **Repeat** something? G�� Use loops

**Think of it like a road:** =���n+�
- **Straight road** = normal code (line by line)
- **Fork in the road** = if-else (choose a path)
- **Roundabout** = loop (go around and around)

---

### =��+ Part 1: Decision Making

#### if-else (Choose a Path)
\`\`\`java
int marks = 85;

if (marks >= 90) {
    System.out.println("Grade: A+ =��");
} else if (marks >= 80) {
    System.out.println("Grade: A =���");     // G�� This runs!
} else if (marks >= 70) {
    System.out.println("Grade: B =���");
} else if (marks >= 40) {
    System.out.println("Grade: D G��n+�");
} else {
    System.out.println("Grade: F G��");
}
\`\`\`

**Think of it like:** "If it's raining G�� G�� take umbrella. Else if cloudy G��n+� G�� take jacket. Else G��n+� G�� wear sunglasses."

#### switch (Multiple Exact Choices)
\`\`\`java
int day = 3;
switch (day) {
    case 1: System.out.println("Monday =���"); break;
    case 2: System.out.println("Tuesday =���"); break;
    case 3: System.out.println("Wednesday =�ɬ"); break;  // G�� runs
    case 4: System.out.println("Thursday =�ī"); break;
    case 5: System.out.println("Friday =���"); break;
    case 6: case 7: System.out.println("Weekend! =���n+�"); break;
    default: System.out.println("Invalid! G��");
}
\`\`\`
G��n+� **Don't forget \`break\`!** Without it, ALL cases below run too!

---

### =��+ Part 2: Loops (Repeating Code)

#### for Loop G�� When you KNOW how many times
**Think of it like:** Climbing stairs =��� G�� you know it's exactly 10 steps.

\`\`\`java
// Print 1 to 10
for (int i = 1; i <= 10; i++) {
    System.out.println("Step " + i);
}
// for (start; keepGoing?; update)

// Multiplication table
int num = 7;
for (int i = 1; i <= 10; i++) {
    System.out.println(num + " x " + i + " = " + (num * i));
}
\`\`\`

#### while Loop G�� When you DON'T know how many times
**Think of it like:** Eating pizza =��� G�� "Keep eating WHILE hungry" (don't know how many slices!)

\`\`\`java
int sum = 0, num = 1;
while (num <= 100) {
    sum += num;
    num++;
}
System.out.println("Sum 1-100 = " + sum);  // 5050
\`\`\`

#### do-while Loop G�� Runs AT LEAST once
**Think of it like:** Checking weather G��n+� G�� you go outside FIRST, THEN check.

\`\`\`java
int choice;
do {
    System.out.println("1. Play  2. Score  3. Exit");
    choice = scanner.nextInt();
} while (choice != 3);  // keeps showing until user picks 3
\`\`\`

---

### =��� break and continue
\`\`\`java
// BREAK = EXIT the loop =���
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    System.out.print(i + " ");  // 1 2 3 4
}

// CONTINUE = SKIP this one Gšn+�
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  // skip even numbers
    System.out.print(i + " ");  // 1 3 5 7 9
}
\`\`\`

### =��� Loop Comparison
| Loop | Check | Min Runs | Best For |
|------|-------|----------|----------|
| **for** | Before | 0 | Known count |
| **while** | Before | 0 | Unknown count |
| **do-while** | After | **1** | Menus, retry |

### =��� Practice Questions
1. Difference between while and do-while?
2. Write a for loop to print even numbers 1-20.
3. What does \`break\` do? What does \`continue\` do?
4. When to use switch vs if-else?

=��� **Key Takeaway:** Use \`if/else\` for decisions, \`switch\` for exact values, \`for\` for known counts, \`while\` for unknown counts, \`do-while\` for "at least once". \`break\` exits, \`continue\` skips.`,
    commonQuestions: [
      {
        patterns: ['control structure', 'if else', 'switch case', 'for loop', 'while loop', 'do while', 'loops in java', 'loop', 'break continue'],
        answer: `## =��� Control Structures G�� Quick Guide!

### Decision Making:
\`\`\`java
// if-else
if (marks >= 40) {
    System.out.println("Pass G��");
} else {
    System.out.println("Fail G��");
}

// switch (exact values)
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Other");
}
\`\`\`

### Loops:
\`\`\`java
// for G�� KNOW how many times (climbing stairs =���)
for (int i = 1; i <= 10; i++) { ... }

// while G�� DON'T know how many (eating pizza =���)
while (hungry) { eat(); }

// do-while G�� runs AT LEAST once (menu)
do { showMenu(); } while (choice != 0);
\`\`\`

### break & continue:
- \`break\` = EXIT the loop =���
- \`continue\` = SKIP this round, go next Gšn+�

| Loop | Min runs | Best for |
|------|----------|----------|
| for | 0 | Known count |
| while | 0 | Unknown count |
| do-while | **1** | Menus, retry |`
      }
    ]
  },
  {
    topicId: 'u1qb',
    title: 'Unit 1 Question Bank (Parts A/B/C)',
    keywords: ['unit 1', 'question bank', 'part a', 'part b', 'part c', 'mcq', '2 marks', '14 marks', 'java basics', 'fundamentals'],
    content: `## Unit 1 — Question Bank (Structured by Part)

### Part A — 1 Mark (MCQ) — Q&A
**Q1. Who invented Java Programming?**
- a) Guido van Rossum  b) James Gosling  c) Dennis Ritchie  d) Bjarne Stroustrup
**Answer:** b — James Gosling created Java at Sun Microsystems.

**Q2. Which one of the following is not a Java feature?**
- a) Object Oriented  b) Use of Pointers  c) Portable  d) Dynamic & Extensible
**Answer:** b — Java removed direct pointer use for safety.

**Q3. The while loop repeats a set of code while the condition is not met?**
- a) True  b) False
**Answer:** b — A while loop repeats **while the condition is true**, not when it fails.

**Q4. What is the output of the code?**
\`\`\`java
class increment {
  public static void main(String args[]) {
     int g = 3;
     System.out.print(++g * 8);
  }
}
\`\`\`
- a) 23  b) 32  c) 33  d) 24
**Answer:** b — ++g makes g = 4, so 4×8 = 32.

**Q5. Which statement is true about Java?**
- a) Sequence-dependent language  b) Code-dependent language  c) Platform-dependent language  d) Platform-independent language
**Answer:** d — Java bytecode runs on any OS via the JVM.

**Q6. Extension of Java code files?**
- a) .js  b) .txt  c) .class  d) .java
**Answer:** d — Source files end with .java.

**Q7. A type of polymorphism in Java?**
- a) Multiple polymorphism  b) Compile time polymorphism  c) Multilevel polymorphism  d) Execution time polymorphism
**Answer:** b — Method overloading is compile-time polymorphism.

**Q8. Output of the given Java program (looped prints)?**
- a) 1 2 3 4 5  b) 1 2 3 4  c) 1 2  d) 1 2 3
**Answer:** d — Loop stops at 3, so prints 1 2 3.

**Q9. Purpose of control statements in Java?**
- a) Mathematical calculations  b) Create objects  c) Declare variables  d) Control program flow
**Answer:** d — They steer decisions and looping.

**Q10. What is an Array in Java?**
- a) Different types collection  b) Same type collection  c) Resizable structure  d) Key-value container
**Answer:** b — An array stores fixed-size, same-type elements.

**Q11. How do you access an element in an array?**
- a) By value  b) By index  c) By key  d) By label
**Answer:** b — Use zero-based indexing like arr[0].

**Q12. Operator for bitwise XOR?**
- a) %  b) &  c) ^  d) "
**Answer:** c — The caret (^) is XOR.

**Q13. Result of expression \`2 + 2 * 2 / 2 – 2\`?**
- a) 2  b) 0  c) 4  d) -2
**Answer:** a — Multiplication/division first: 2 + (2*2/2) - 2 = 2.

**Q14. Component used to compile, debug, and execute Java programs?**
- a) JVM  b) JDK  c) JIT  d) JRE
**Answer:** b — JDK includes compiler, tools, and runtime.

**Q15. What is a class in Java?**
- a) Static reference  b) Template/blueprint  c) Instance of class  d) None
**Answer:** b — A class is the blueprint from which objects are created.

### Part B — 2 Marks (Short Answers) — Q&A
**Q1. List the features of Java Programming.**
**Answer:** Simple syntax, object-oriented, platform-independent bytecode + JVM, secure (no pointers/sandbox), robust (GC + exceptions), multithreaded, portable, and dynamic loading.

**Q2. Define classes and objects.**
**Answer:** A class is a blueprint defining fields and methods; an object is a runtime instance of that class with its own state and behavior.

**Q3. Define polymorphism.**
**Answer:** One interface/method with many forms—compile-time overloading and runtime overriding that adapt behavior per type.

**Q4. Compare OOP and procedural programming.**
**Answer:** OOP centers on objects, encapsulation, inheritance, and polymorphism for reuse; procedural focuses on functions and shared data, making reuse and maintenance harder.

**Q5. What are the data types available in Java?**
**Answer:** Eight primitives (byte, short, int, long, float, double, char, boolean) plus reference types (classes, arrays, interfaces, enums).

**Q6. How will you declare and access elements of an array?**
**Answer:** \`int[] a = new int[5]; a[0] = 10; int first = a[0];\` Indexing starts at 0.

**Q7. What is meant by static binding and dynamic binding?**
**Answer:** Static binding happens at compile time (overloads, private/final/static methods). Dynamic binding resolves at runtime for overridden instance methods via the JVM.

**Q8. Simple Java code to add two numbers.**
**Answer:** \`int a = 2, b = 3; int sum = a + b; System.out.println(sum);\` prints 5.

**Q9. Java code to check number is positive or negative.**
**Answer:** \`if (n >= 0) System.out.println("positive"); else System.out.println("negative");\`.

**Q10. Code to check a number is odd or even.**
**Answer:** \`if (n % 2 == 0) System.out.println("even"); else System.out.println("odd");\`.

**Q11. Define variable and how to declare.**
**Answer:** A variable is a named memory location; declare with type + name, e.g., \`int count;\`.

### Part C — 14 Marks (Descriptive/Programs) — Q&A
**Q1. Outline JVM architecture.**
**Answer (14M):**

The **Java Virtual Machine (JVM)** is the runtime that executes **Java bytecode** and provides platform independence ("write once, run anywhere"). JVM architecture can be explained from **toolchain → loading → memory → execution → security + GC**.

#### 1) JDK vs JRE vs JVM (roles)
- **JDK (Java Development Kit):** Developer tools (compiler javac, debugger, docs) + JRE.
- **JRE (Java Runtime Environment):** JVM + core libraries needed to run bytecode.
- **JVM:** The engine that loads bytecode, verifies it, manages memory, and executes instructions.

#### 2) High-level JVM block diagram
\`\`\`
Java Source (.java)
    |  javac
    v
Bytecode (.class)  ----->  Class Loader  ----->  Runtime Data Areas  ----->  Execution Engine
                                          |                     |                           |
                                    Bytecode Verifier      Heap/Stacks/etc.        Interpreter + JIT
                                                                                                          |
                                                                                                GC + JNI + Native libs
\`\`\`

#### 3) Class Loader Subsystem
Responsible for bringing .class files into memory.
- **Loading:** Find and read class bytecode (from file system, JAR, network).
- **Linking:**
  - **Verification:** Checks bytecode safety (type safety, stack rules, illegal access).
  - **Preparation:** Allocates memory for static variables and sets default values.
  - **Resolution:** Replaces symbolic references (like class/method names) with direct references.
- **Initialization:** Executes class initializers (static blocks, static field initializations).

#### 4) Runtime Data Areas (Memory areas)
1. **Method Area (MetaSpace in modern JVMs):**
    - Stores class metadata (runtime constant pool, method bytecode, static variables).
2. **Heap:**
    - Stores objects and arrays (shared across threads).
3. **Java Stack (per thread):**
    - Stores stack frames for method calls (local variables, operand stack, return address).
4. **PC Register (per thread):**
    - Holds the address of the current bytecode instruction.
5. **Native Method Stack:**
    - Used for non-Java code invoked through JNI.

#### 5) Execution Engine
- **Interpreter:** Executes bytecode instruction-by-instruction (fast startup, slower long-run).
- **JIT (Just-In-Time Compiler):** Detects "hot" methods and compiles them into native machine code for speed.
- **Runtime/Native Interface (JNI):** Allows Java to call native libraries (C/C++).

#### 6) Garbage Collector (GC)
GC automatically reclaims heap memory of objects that are no longer reachable.
- Prevents memory leaks due to forgotten deallocation (as in manual memory languages).
- Common concepts: **reachability**, **generations (young/old)**, **mark-sweep/compaction**.

#### 7) Why bytecode verification matters
The **Bytecode Verifier** ensures:
- No illegal type conversions
- No stack underflow/overflow during execution
- Proper access control
This is part of Java\'s **security + robustness**.

**Conclusion:** JVM architecture includes **Class Loader + Verifier**, **Runtime memory areas**, **Execution Engine (Interpreter + JIT)**, **GC**, and **JNI**, together enabling safe, portable, and efficient execution.

**Q2. Explain data types in Java with examples.**
**Answer (14M):**

Java data types are classified into **Primitive types** (built-in) and **Reference types** (objects/arrays). Correct data type selection affects **memory**, **range**, and **operations**.

#### 1) Primitive data types (8 types)
| Category | Type | Size | Example | Notes |
|---|---|---:|---|---|
| Integer | byte | 1 byte | byte b = 10; | -128 to 127 |
| Integer | short | 2 bytes | short s = 1000; | Useful for memory constrained arrays |
| Integer | int | 4 bytes | int n = 50000; | Most common integer type |
| Integer | long | 8 bytes | long pop = 8000000000L; | Use L suffix |
| Floating | float | 4 bytes | float pi = 3.14f; | Use f suffix |
| Floating | double | 8 bytes | double d = 99.99; | Default floating type |
| Character | char | 2 bytes | char c = 'A'; | Unicode character |
| Boolean | boolean | JVM dependent | boolean ok = true; | Only true/false |

#### 2) Reference data types
Reference types store **addresses (references)** to objects on heap.
- **String:** String name = "Java";
- **Arrays:** int[] a = {1,2,3};
- **Classes/Objects:** Student s = new Student();
- **Interfaces/Enums:** treated as reference types.

#### 3) Type casting (widening vs narrowing)
- **Widening (implicit / automatic):** smaller → larger, safe.
- **Narrowing (explicit):** larger → smaller, may lose data.

\`\`\`java
int x = 100;
double d = x;       // widening (int -> double)

double p = 9.78;
int y = (int) p;    // narrowing (double -> int), y becomes 9
\`\`\`

#### 4) Type promotion in expressions
In arithmetic expressions, Java promotes types to avoid overflow where possible:
- byte/short/char are promoted to int in expressions.

\`\`\`java
byte b1 = 10, b2 = 20;
int sum = b1 + b2; // result is int
\`\`\`

#### 5) Wrapper classes (object form of primitives)
Each primitive has a wrapper class: Integer, Double, Character, etc.
- Useful for collections (ArrayList), generics, and utility methods (parse, compare).

**Conclusion:** Primitives are fast and memory efficient; reference types provide OOP features. Understanding casting, promotion, and literals is essential for correct Java programs.

**Q3. Explain operators in Java with examples.**
**Answer (14M):**

Operators are symbols that perform operations on operands. Java groups operators into categories; knowing **precedence** and **short-circuit behavior** is important.

#### 1) Arithmetic operators
- +, -, *, /, %

\`\`\`java
int a = 10, b = 3;
System.out.println(a + b); // 13
System.out.println(a % b); // 1 (remainder)
\`\`\`

#### 2) Unary operators
- ++, --, unary +, unary -, !, ~

\`\`\`java
int x = 5;
System.out.println(++x); // 6 (pre-increment)
System.out.println(x++); // 6 (post-increment prints then increments)
System.out.println(x);   // 7
\`\`\`

#### 3) Relational operators
- ==, !=, >, <, >=, <= (return boolean)

#### 4) Logical operators (short-circuit)
- && (AND), || (OR), ! (NOT)
- **Short-circuit:** second operand not evaluated if result is already known.

\`\`\`java
if (age >= 18 && hasId) {
    System.out.println("Allowed");
}
\`\`\`

#### 5) Assignment operators
- =, +=, -=, *=, /=, %=

\`\`\`java
int n = 10;
n += 5; // n = 15
\`\`\`

#### 6) Ternary operator
- condition ? expr1 : expr2

\`\`\`java
int max = (a > b) ? a : b;
\`\`\`

#### 7) Bitwise and shift operators
- Bitwise: &, |, ^, ~
- Shifts: <<, >>, >>>

\`\`\`java
int p = 5;   // 0101
int q = 3;   // 0011
System.out.println(p & q); // 1  (0001)
System.out.println(p | q); // 7  (0111)
System.out.println(p ^ q); // 6  (0110)
System.out.println(p << 1); // 10
\`\`\`

#### 8) Operator precedence (why brackets matter)
Example: 2 + 2 * 2 / 2 - 2
- Multiply/divide first: 2 + (2*2/2) - 2 = 2

**Conclusion:** Know operator categories, short-circuit evaluation, and precedence to avoid logical bugs and incorrect results.

**Q4. Summarize OOP concepts.**
**Answer (14M):**

Object-Oriented Programming (OOP) organizes software using **objects** (data + behavior). Java is primarily OOP and uses classes/objects to improve **reusability**, **maintainability**, and **security**.

#### 1) Class and Object
- **Class:** blueprint defining fields and methods.
- **Object:** runtime instance of a class.

\`\`\`java
class Student {
    int id;
    void show() { System.out.println(id); }
}
Student s = new Student();
s.id = 1;
s.show();
\`\`\`

#### 2) Encapsulation (data hiding)
Bundling data + methods, and controlling access using **private** fields with getters/setters.

\`\`\`java
class Account {
    private double balance;
    public void deposit(double amt) { balance += amt; }
    public double getBalance() { return balance; }
}
\`\`\`

Benefits: prevents invalid states, improves security, and makes code easier to change.

#### 3) Inheritance (is-a relationship)
Create new classes from existing ones for reuse.

\`\`\`java
class Animal { void eat() { System.out.println("eat"); } }
class Dog extends Animal { void bark() { System.out.println("bark"); } }
\`\`\`

Types: single, multilevel, hierarchical (Java avoids multiple inheritance of classes).

#### 4) Polymorphism (many forms)
1. **Compile-time polymorphism (Overloading):** same method name, different parameters.
2. **Runtime polymorphism (Overriding):** subclass provides specific implementation; resolved at runtime.

\`\`\`java
class A { void show() { System.out.println("A"); } }
class B extends A { @Override void show() { System.out.println("B"); } }
A ref = new B();
ref.show(); // prints B (dynamic binding)
\`\`\`

#### 5) Abstraction
Show essential details, hide internal complexity.
- **Abstract class:** can have state, constructors, abstract + concrete methods.
- **Interface:** pure contract (plus default/static methods in modern Java).

#### 6) Access modifiers
- private: within class
- default (package-private): within package
- protected: package + subclasses
- public: everywhere

**Conclusion:** Encapsulation + inheritance + polymorphism + abstraction (and proper access control) are the pillars that make Java programs modular and scalable.

**Q5. Demonstrate Java programs:**
- (i) Print Fibonacci within a range.
- (ii) Factorial using do-while loop.
**Answer (14M):**

##### (i) Fibonacci series within a range
**Idea:** Fibonacci numbers follow: 0, 1, 1, 2, 3, 5, 8, ... (next = prev1 + prev2).

**Algorithm (iterative):**
1. Initialize a = 0, b = 1.
2. Print a and b if inside range.
3. Compute c = a + b; shift a=b and b=c.
4. Repeat until c exceeds upper bound.

\`\`\`java
import java.util.*;

public class FibonacciRange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter lower bound: ");
        int low = sc.nextInt();
        System.out.print("Enter upper bound: ");
        int high = sc.nextInt();

        int a = 0, b = 1;
        System.out.println("Fibonacci numbers in range:");
        while (a <= high) {
            if (a >= low) System.out.print(a + " ");
            int c = a + b;
            a = b;
            b = c;
        }
    }
}
\`\`\`

##### (ii) Factorial using do-while
**Idea:** n! = 1 * 2 * 3 * ... * n (for n >= 0). For 0!, result is 1.

\`\`\`java
import java.util.*;

public class FactorialDoWhile {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();

        long fact = 1;
        int i = 1;

        if (n < 0) {
            System.out.println("Factorial not defined for negative numbers");
            return;
        }

        do {
            if (i > n) break; // handles n = 0 case cleanly
            fact *= i;
            i++;
        } while (true);

        System.out.println(n + "! = " + fact);
    }
}
\`\`\`

**Notes for exams:** Mention time complexity O(n) for factorial loop and O(k) for Fibonacci, where k depends on the number of terms printed.

**Q6. Infer Java programs using control structures with examples.**
**Answer (14M):**

Control structures decide **which statements run** and **how many times** they run. Java control structures are broadly:
1) **Selection** (decision making)  2) **Iteration** (loops)  3) **Branching** (break/continue/return)

#### 1) Selection statements
##### (a) if / else / else-if
Used when conditions are based on ranges or multiple boolean rules.

\`\`\`java
int mark = 76;
if (mark >= 90) System.out.println("A");
else if (mark >= 75) System.out.println("B");
else if (mark >= 50) System.out.println("C");
else System.out.println("Fail");
\`\`\`

##### (b) switch
Used when checking a single expression against constant cases.

\`\`\`java
int choice = 2;
switch (choice) {
    case 1: System.out.println("Add"); break;
    case 2: System.out.println("Delete"); break;
    default: System.out.println("Invalid");
}
\`\`\`

#### 2) Iteration statements
##### (a) for loop
Best when number of iterations is known.

\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
\`\`\`

##### (b) while loop
Best when repetitions depend on a condition (unknown count).

\`\`\`java
int n = 1234;
while (n > 0) {
    int digit = n % 10;
    System.out.println(digit);
    n /= 10;
}
\`\`\`

##### (c) do-while
Runs at least once (menus, retries).

\`\`\`java
int option;
do {
    System.out.println("1) Play  0) Exit");
    option = 0;
} while (option != 0);
\`\`\`

#### 3) Branching statements
- break: exits loop/switch immediately
- continue: skips current iteration and moves to next
- return: exits the method

\`\`\`java
for (int i = 1; i <= 10; i++) {
    if (i == 5) continue; // skips printing 5
    if (i == 9) break;    // stops at 9
    System.out.print(i + " ");
}
\`\`\`

**Conclusion:** Use if for ranges, switch for discrete cases, for/while/do-while for repetition, and branching to control flow cleanly.

**Q7. Demonstrate Java programs:**
- (i) Print prime numbers in a range.
- (ii) Compare two numbers.
**Answer (14M):**

##### (i) Prime numbers in a range
A prime number is a number > 1 that has exactly **two divisors**: 1 and itself.

**Efficient check:** For each number n, test divisibility only up to sqrt(n).

\`\`\`java
import java.util.*;

public class PrimeRange {
    static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Start: ");
        int start = sc.nextInt();
        System.out.print("End: ");
        int end = sc.nextInt();

        System.out.println("Primes:");
        for (int n = start; n <= end; n++) {
            if (isPrime(n)) System.out.print(n + " ");
        }
    }
}
\`\`\`

##### (ii) Compare two numbers
We can compare using **if-else** or **ternary**.

\`\`\`java
import java.util.*;

public class CompareTwo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        if (a > b) System.out.println("a is greater");
        else if (a < b) System.out.println("b is greater");
        else System.out.println("both are equal");

        int max = (a > b) ? a : b;
        System.out.println("Max = " + max);
    }
}
\`\`\`

**Conclusion:** Prime program demonstrates nested control structures and efficiency; comparison program shows decision-making using if-else and ternary operator.
`
  }
];

export default unit1Knowledge;
