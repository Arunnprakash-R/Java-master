// Unit 1: Java Fundamentals - Complete Knowledge Base (Teacher-Style)
const unit1Knowledge = [
  {
    topicId: 'u1t1',
    title: 'Features of Java & OOP Concepts',
    keywords: ['features', 'java features', 'OOP', 'object oriented', 'class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction', 'platform independent', 'simple', 'secure', 'portable', 'robust', 'multithreaded', 'WORA', 'write once run anywhere', 'james gosling', 'sun microsystems'],
    content: `## Gÿò Features of Java & OOP Concepts

### =ƒôû Story Time: How Java Was Born

Imagine you're in the year **1991**. A brilliant engineer named **James Gosling** at **Sun Microsystems** (now owned by Oracle) had a big problem. He wanted to write a program that could run on **any device** GÇö a TV remote, a washing machine, a computer, a phone GÇö without rewriting it each time.

So he created a language called **"Oak"** (named after a tree outside his window! =ƒî¦). Later, while drinking coffee at a caf+¬, the team renamed it to **"Java"** GÇö after Java coffee beans! Gÿò

That's why Java's logo is a coffee cup!

---

### =ƒîƒ Features of Java (Why Java is Special)

Think of Java like a **superhero** =ƒª+ with many powers. Let's learn each power:

#### 1. =ƒº¬ Simple
Java is **easy to learn**. If you know basic English and math, you can learn Java! It removed confusing things from older languages like C++ (no pointers, no goto statement).

**Think of it like:** Learning to ride a bicycle with training wheels GÇö Java removes the hard parts so you can focus on coding.

#### 2. =ƒîì Platform Independent (Write Once, Run Anywhere GÇö WORA)
This is Java's **SUPERPOWER**! 

When you write a Java program, it gets converted into something called **bytecode**. This bytecode can run on **ANY computer** GÇö Windows, Mac, Linux GÇö without any changes!

**Think of it like:** Imagine you write a letter in a **universal language** that everyone in the world can read GÇö whether they speak Hindi, English, or Japanese. That's what bytecode is!

\`\`\`
Your Java Code (.java file)
        Gåô javac compiler
    Bytecode (.class file)  GåÉ This is the universal language!
        Gåô JVM reads it
    Runs on ANY computer!
\`\`\`

#### 3. =ƒÅ¢n+Å Object-Oriented
Everything in Java is organized as **objects** GÇö just like the real world! A car is an object, a dog is an object, a student is an object. We'll learn more about this below.

#### 4. =ƒöÆ Secure
Java is like a **fortress**! It doesn't allow direct access to computer memory (no pointers), runs inside a protected area called the JVM sandbox, and has built-in security checks.

**Think of it like:** Playing in a fenced playground GÇö you can have fun, but you can't accidentally run into the road.

#### 5. =ƒÆ¬ Robust (Strong & Reliable)
Java catches errors early so your program doesn't crash unexpectedly. It has:
- **Strong type checking** (checks your code for mistakes before running)
- **Automatic memory management** (garbage collection cleans up unused memory)
- **Exception handling** (handles errors gracefully)

**Think of it like:** A car with airbags, seatbelts, and ABS brakes GÇö multiple safety systems!

#### 6. =ƒÅâ Multithreaded
Java can do **many tasks at the same time**! While downloading a file, it can also play music and show animations.

**Think of it like:** A chef =ƒæ¿GÇì=ƒì¦ who can stir the soup, chop vegetables, and watch the oven GÇö all at the same time!

#### 7. =ƒÜÇ High Performance
Java uses a **Just-In-Time (JIT) compiler** that makes frequently used code run super fast.

#### 8. =ƒôª Portable
Java programs can move from one computer to another without any changes. The bytecode is the same everywhere.

#### 9. =ƒîÉ Distributed
Java can work with programs running on different computers across the internet (using technologies like RMI and EJB).

#### 10. =ƒöä Dynamic
Java can load new classes and libraries while the program is already running!

---

### =ƒÄ» Object-Oriented Programming (OOP) Concepts

Now let's learn the **4 pillars** of OOP. Think of OOP like **building with LEGO blocks** GÇö you create small, reusable pieces and combine them to build amazing things!

#### =ƒº¦ Pillar 1: ENCAPSULATION (Data Hiding)

**Simple Explanation:** Wrapping data (variables) and methods (functions) together in a class, and hiding the internal details from the outside world.

**Think of it like:** A **TV remote** =ƒô¦. You press the volume button GÇö the volume changes. But do you know HOW it works inside? No! The internal wiring is HIDDEN from you. You only use the buttons (methods). That's encapsulation!

\`\`\`java
class BankAccount {
    // PRIVATE GÇö hidden from outside (like internal wiring)
    private double balance = 1000;

    // PUBLIC methods GÇö like buttons on the remote
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: Gé¦" + amount);
        }
    }

    public double getBalance() {
        return balance;  // You can SEE the balance but can't change it directly
    }
}

// Usage:
BankAccount myAccount = new BankAccount();
myAccount.deposit(500);              // G£à Using the button (method)
System.out.println(myAccount.getBalance()); // G£à Gé¦1500
// myAccount.balance = 999999;       // G¥î ERROR! Can't access directly!
\`\`\`

**Why is this important?** Imagine if anyone could directly change your bank balance without going through proper channels GÇö chaos! =ƒÿ¦ Encapsulation prevents that.

#### =ƒº¦ Pillar 2: INHERITANCE (Reusing Code)

**Simple Explanation:** A child class **inherits** (gets) all the properties and methods from a parent class, just like you inherit features from your parents!

**Think of it like:** You got your mom's eyes =ƒæÇ and your dad's height =ƒôÅ. You didn't have to "create" these features GÇö you **inherited** them! Similarly, a child class inherits code from its parent class.

\`\`\`java
// Parent class (like your parents)
class Animal {
    String name;
    
    void eat() {
        System.out.println(name + " is eating =ƒìû");
    }
    
    void sleep() {
        System.out.println(name + " is sleeping =ƒÆñ");
    }
}

// Child class (like you GÇö inheriting from parents)
class Dog extends Animal {    // 'extends' means "inherits from"
    void bark() {
        System.out.println(name + " says: Woof Woof! =ƒÉò");
    }
}

// Child class
class Cat extends Animal {
    void meow() {
        System.out.println(name + " says: Meow! =ƒÉ¦");
    }
}

// Usage:
Dog tommy = new Dog();
tommy.name = "Tommy";
tommy.eat();    // G£à Inherited from Animal! "Tommy is eating =ƒìû"
tommy.sleep();  // G£à Inherited from Animal! "Tommy is sleeping =ƒÆñ"
tommy.bark();   // G£à Dog's own method! "Tommy says: Woof Woof! =ƒÉò"
\`\`\`

**Why is this important?** Without inheritance, you'd have to write \`eat()\` and \`sleep()\` in EVERY animal class GÇö Dog, Cat, Bird, Fish... That's a lot of copy-pasting! =ƒÿ½ Inheritance lets you write it ONCE and reuse it everywhere.

#### =ƒº¦ Pillar 3: POLYMORPHISM (Many Forms)

**Simple Explanation:** The same method can behave **differently** depending on which object calls it.

**Think of it like:** The word **"run"** means different things:
- A person **runs** =ƒÅâ (using legs)
- A car **runs** =ƒÜù (using engine)  
- A computer program **runs** =ƒÆ+ (using CPU)

Same word, **different behavior** GÇö that's polymorphism!

\`\`\`java
class Animal {
    void sound() {
        System.out.println("Some animal sound...");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Woof Woof! =ƒÉò");  // Dog's version
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Meow Meow! =ƒÉ¦");  // Cat's version
    }
}

class Duck extends Animal {
    @Override
    void sound() {
        System.out.println("Quack Quack! =ƒªå"); // Duck's version
    }
}

// The magic of polymorphism:
Animal myPet;

myPet = new Dog();
myPet.sound();  // "Woof Woof! =ƒÉò"

myPet = new Cat();
myPet.sound();  // "Meow Meow! =ƒÉ¦"

myPet = new Duck();
myPet.sound();  // "Quack Quack! =ƒªå"

// Same method name (sound), DIFFERENT behavior!
\`\`\`

**Two types of Polymorphism:**
1. **Compile-time (Method Overloading):** Same method name, different parameters GÇö decided at compile time
2. **Runtime (Method Overriding):** Child class rewrites parent's method GÇö decided at runtime

#### =ƒº¦ Pillar 4: ABSTRACTION (Showing Only What's Necessary)

**Simple Explanation:** Showing only the **essential features** and hiding the complex implementation details.

**Think of it like:** When you drive a car =ƒÜù, you only need to know:
- Steering wheel (to turn)
- Accelerator (to go)
- Brake (to stop)

You DON'T need to know how the engine combustion works, how the transmission shifts gears, or how fuel injection happens. All that complexity is **abstracted** (hidden) away!

\`\`\`java
// Abstract class GÇö like a blueprint, can't be used directly
abstract class Shape {
    String color;
    
    // Abstract method GÇö no body, just a promise
    abstract double calculateArea();
    
    // Regular method GÇö has a body
    void displayColor() {
        System.out.println("Color: " + color);
    }
}

// Concrete class GÇö fills in the details
class Circle extends Shape {
    double radius;
    
    Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    @Override
    double calculateArea() {
        return Math.PI * radius * radius;  // -Çr-¦
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

### =ƒô¥ Quick Summary Table

| Feature | What It Means | Real-World Example |
|---------|---------------|-------------------|
| **Encapsulation** | Hide data, show methods | TV remote (hidden wiring) |
| **Inheritance** | Child gets parent's features | Child inherits parent's traits |
| **Polymorphism** | Same action, different behavior | "Run" means different things |
| **Abstraction** | Hide complexity, show simplicity | Driving a car (hidden engine) |

### =ƒº¬ Practice Questions
1. What does WORA stand for?
2. Name any 5 features of Java.
3. What is the difference between encapsulation and abstraction?
4. Give a real-life example of inheritance.
5. What are the two types of polymorphism?

=ƒÆí **Key Takeaway:** Java is a simple, secure, platform-independent, object-oriented language. OOP has 4 pillars: Encapsulation (hide data), Inheritance (reuse code), Polymorphism (many forms), Abstraction (hide complexity).`,
    commonQuestions: [
      {
        patterns: ['features of java', 'java features', 'why java', 'characteristics of java'],
        answer: `## =ƒîƒ Features of Java GÇö Explained Like a Story!

Imagine Java as a **superhero** =ƒª+ with 10 amazing powers:

### 1. =ƒº¬ Simple
Java removed the hard stuff from C++ (no pointers, no goto). It's like learning to ride a bike **with training wheels** GÇö easier to start!

### 2. =ƒîì Platform Independent (WORA)
Write your code ONCE GåÆ runs on ANY computer (Windows, Mac, Linux). 

**How?** Java compiles to **bytecode** GÇö a universal language that the JVM understands on every platform.
\`\`\`
.java file GåÆ javac GåÆ .class file (bytecode) GåÆ JVM GåÆ Runs anywhere!
\`\`\`

### 3. =ƒÅ¢n+Å Object-Oriented
Everything is organized as objects GÇö like the real world (Car object, Student object, Dog object).

### 4. =ƒöÆ Secure
- No pointers (can't access random memory)
- Runs inside JVM sandbox (protected area)
- Built-in security manager

### 5. =ƒÆ¬ Robust
- Catches errors early (compile-time checking)
- Garbage collector cleans unused memory automatically
- Exception handling prevents crashes

### 6. =ƒÅâ Multithreaded
Can do multiple tasks simultaneously GÇö like a chef stirring soup while chopping vegetables!

### 7. =ƒÜÇ High Performance
JIT compiler makes frequently-used code super fast.

### 8. =ƒôª Portable
Same bytecode works everywhere GÇö no recompilation needed.

### 9. =ƒîÉ Distributed
Can work with programs on different computers across the internet.

### 10. =ƒöä Dynamic
Can load new classes while the program is already running.

=ƒÆí **Remember this:** Java = Gÿò Coffee + =ƒª+ Superhero powers = Simple, Secure, Platform-independent, OOP, Robust, Multithreaded!`
      },
      {
        patterns: ['oop', 'object oriented', 'oops concept', 'pillars of oop', 'what is oop', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction'],
        answer: `## =ƒÅ¢n+Å 4 Pillars of OOP GÇö Explained with Real-Life Examples!

Think of OOP like **building with LEGO blocks** =ƒº¦ GÇö small, reusable pieces that combine into amazing things!

### =ƒº¦ 1. ENCAPSULATION (Data Hiding)
**What:** Wrap data + methods together, hide the internals.
**Real life:** A **TV Remote** =ƒô¦ GÇö you press buttons (public methods) but don't see the wiring inside (private data).

\`\`\`java
class Student {
    private int marks;         // HIDDEN (private)
    
    public void setMarks(int m) {  // BUTTON (public)
        if (m >= 0 && m <= 100) marks = m;
    }
    public int getMarks() { return marks; }
}
\`\`\`

### =ƒº¦ 2. INHERITANCE (Code Reuse)
**What:** Child class gets all features of parent class.
**Real life:** You **inherited** your eyes from mom, height from dad!

\`\`\`java
class Animal { void eat() { } }          // Parent
class Dog extends Animal { void bark() {} } // Child GÇö gets eat() + own bark()
\`\`\`

### =ƒº¦ 3. POLYMORPHISM (Many Forms)
**What:** Same method name, different behavior based on the object.
**Real life:** The word **"open"** GÇö open a door =ƒÜ¬, open a book =ƒôû, open a bottle =ƒì¦ GÇö same word, different actions!

\`\`\`java
class Dog { void sound() { System.out.println("Woof!"); } }
class Cat { void sound() { System.out.println("Meow!"); } }
\`\`\`

### =ƒº¦ 4. ABSTRACTION (Hide Complexity)
**What:** Show only essential features, hide complex details.
**Real life:** **Driving a car** =ƒÜù GÇö you use steering & pedals, but don't know how the engine works inside!

\`\`\`java
abstract class Shape {
    abstract double area();  // WHAT to do (no HOW)
}
class Circle extends Shape {
    double area() { return Math.PI * r * r; }  // HOW to do it
}
\`\`\`

### =ƒô¥ Summary Table
| Pillar | Keyword | Analogy |
|--------|---------|---------|
| Encapsulation | **Hide** | TV Remote |
| Inheritance | **Reuse** | Parent GåÆ Child traits |
| Polymorphism | **Many forms** | "Open" means different things |
| Abstraction | **Simplify** | Driving a car |

=ƒÆí **Memory trick:** Think **E-I-P-A** = "**E**very **I**ntelligent **P**erson **A**bstracts!"
`
      }
    ]
  },
  {
    topicId: 'u1t2',
    title: 'Java Virtual Machine (JVM) & Architecture',
    keywords: ['JVM', 'Java Virtual Machine', 'architecture', 'class loader', 'bytecode', 'execution engine', 'JIT', 'heap', 'stack', 'method area', 'garbage collector', 'JDK', 'JRE', 'memory', 'runtime'],
    content: `## =ƒûÑn+Å Java Virtual Machine (JVM) & Architecture

### =ƒôû Story Time: The Universal Translator

Imagine you wrote a beautiful poem in English. Now you want people in Japan, France, India, and Brazil to read it. You have two options:

1. G¥î Rewrite the poem in Japanese, French, Hindi, Portuguese... (SO much work!)
2. G£à Give it to a **universal translator** who can read English and speak it in ANY language!

**JVM is that universal translator!** You write Java code once, and the JVM "translates" it so ANY computer can understand it.

---

### =ƒº¦ JDK vs JRE vs JVM GÇö The 3 Layers

Think of it like a **Russian nesting doll** =ƒ¬å:

\`\`\`
GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
Göé               JDK (Java Development Kit) Göé  GåÉ For DEVELOPERS
Göé  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ    Göé     (javac, javadoc, jar)
Göé  Göé          JRE (Java Runtime)      Göé    Göé  GåÉ For USERS
Göé  Göé  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ    Göé    Göé
Göé  Göé  Göé       JVM (Virtual Machine)Göé   Göé    Göé  GåÉ The BRAIN
Göé  Göé  Göé   (executes bytecode)     Göé    Göé    Göé
Göé  Göé  GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ    Göé    Göé
Göé  GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ    Göé
GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
\`\`\`

| Component | What It Contains | Who Uses It | Analogy |
|-----------|-----------------|-------------|---------|
| **JDK** | JRE + development tools (compiler, debugger) | Developers who WRITE code | Complete toolbox =ƒº¦ |
| **JRE** | JVM + standard libraries | Users who RUN Java programs | Instruction manual =ƒôû |
| **JVM** | The execution engine only | Internal (nobody directly) | The brain =ƒºá |

**Simple Rule:**
- Want to **write** Java? Install **JDK** G£ìn+Å
- Want to **run** Java? Install **JRE** Gû¦n+Å
- JVM comes inside both GÇö you never install it separately

---

### =ƒÅùn+Å JVM Architecture (How Java Code Actually Runs)

When you write \`HelloWorld.java\` and run it, here's what happens step by step:

\`\`\`
Step 1: You write code          GåÆ HelloWorld.java
Step 2: Compiler converts it    GåÆ HelloWorld.class (bytecode)
Step 3: JVM loads the bytecode  GåÆ Class Loader loads it into memory
Step 4: JVM verifies it         GåÆ Bytecode Verifier checks for errors
Step 5: JVM executes it         GåÆ Execution Engine runs the code
Step 6: Output appears!         GåÆ "Hello, World!" on screen
\`\`\`

Let's look inside the JVM GÇö it has **3 main sections**:

#### =ƒö+ Section 1: CLASS LOADER SUBSYSTEM

The **doorman** =ƒÜ¬ of the JVM GÇö it loads your class files into memory.

**Three phases:**
1. **Loading** GÇö Reads the .class file from disk
2. **Linking** GÇö Verifies the code, prepares memory, connects references
3. **Initialization** GÇö Runs static blocks and initializes static variables

**Think of it like:** A librarian =ƒôÜ who (1) finds your book, (2) checks it's not damaged, and (3) opens it to the right page.

#### =ƒö+ Section 2: RUNTIME DATA AREAS (Memory)

This is the JVM's **memory layout** GÇö where all your data lives while the program runs.

\`\`\`
GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
Göé              JVM Memory Areas                Göé
Gö£GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöñ
Göé  Method     Göé   Heap     Göé   Stack          Göé
Göé  Area       Göé            Göé   (per thread)   Göé
Göé             Göé            Göé                  Göé
Göé Class info  Göé Objects &  Göé Local variables  Göé
Göé Static vars Göé Arrays     Göé Method calls     Göé
Göé Constants   Göé            Göé Return addresses Göé
Gö£GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöñ
Göé  PC Register Göé Native Method Stack           Göé
GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
\`\`\`

| Memory Area | What It Stores | Analogy |
|-------------|---------------|---------|
| **Method Area** | Class info, static variables, constants | Library catalog =ƒôï |
| **Heap** | All objects and arrays | Storage warehouse =ƒôª |
| **Stack** | Local variables, method calls | Stack of plates =ƒì+n+Å |
| **PC Register** | Address of current instruction | Bookmark in a book =ƒöû |
| **Native Method Stack** | Info for native (C/C++) methods | Translator booth =ƒÄÖn+Å |

**Important distinction:**
\`\`\`java
Student s = new Student("Rahul");
//  Gåæ 's' lives in STACK        Gåæ Student object lives in HEAP
//  (the reference/address)     (the actual data)
\`\`\`

**Think of it like:** The **stack** holds a piece of paper with an address =ƒô¥, and the **heap** is the actual house =ƒÅá at that address.

#### =ƒö+ Section 3: EXECUTION ENGINE

The **worker** =ƒæ+ who actually runs your code!

- **Interpreter:** Reads bytecode line-by-line (slow but starts fast)
- **JIT Compiler:** Converts frequently-used bytecode to native machine code (fast but takes time to compile)
- **Garbage Collector:** Automatically deletes objects you no longer need (free memory!)

**Think of the Garbage Collector like:** A cleaning robot =ƒñû in your house that automatically throws away things you're not using anymore GÇö you never have to clean up manually!

\`\`\`java
Student s = new Student("Rahul");  // Object created in heap
s = null;  // s no longer points to the object
// The garbage collector will eventually remove the Student object
// because nobody is using it anymore! =ƒùæn+Å
\`\`\`

---

### =ƒöä How Java Program Executes GÇö Complete Flow

\`\`\`
                    YOU WRITE
                HelloWorld.java
                      Göé
                      Gû+
              GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
              Göé  javac        Göé  GåÉ COMPILER
              Göé  (compiler)   Göé
              GööGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
                      Göé
                      Gû+
              HelloWorld.class
              (BYTECODE)
                      Göé
                      Gû+
        GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
        Göé         J V M            Göé
        Göé  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ  Göé
        Göé  Göé   Class Loader     Göé  Göé GåÉ Loads .class file
        Göé  GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ  Göé
        Göé           Gû+              Göé
        Göé  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ  Göé
        Göé  Göé  Bytecode Verifier Göé  Göé GåÉ Checks for errors
        Göé  GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ  Göé
        Göé           Gû+              Göé
        Göé  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ  Göé
        Göé  Göé Execution Engine   Göé  Göé GåÉ Runs the code
        Göé  Göé (Interpreter+JIT)  Göé  Göé
        Göé  GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ  Göé
        Göé           Gû+              Göé
        Göé     OUTPUT ON SCREEN     Göé
        GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
\`\`\`

### =ƒº¬ Practice Questions
1. What is the difference between JDK, JRE, and JVM?
2. What does the Class Loader do?
3. Where are objects stored in JVM memory GÇö Stack or Heap?
4. What is the role of the Garbage Collector?
5. What is the difference between Interpreter and JIT Compiler?

=ƒÆí **Key Takeaway:** JVM is the brain of Java GÇö it loads, verifies, and executes bytecode. JDK = JRE + tools, JRE = JVM + libraries. Objects live in Heap, local variables live in Stack. Garbage Collector auto-cleans unused objects.`,
    commonQuestions: [
      {
        patterns: ['what is jvm', 'jvm architecture', 'java virtual machine', 'how jvm works', 'explain jvm'],
        answer: `## =ƒºá JVM (Java Virtual Machine) GÇö The Brain of Java!

**Simple Explanation:** JVM is a **virtual computer** inside your real computer that runs Java bytecode. It's the reason Java is "Write Once, Run Anywhere"!

### How it works (step by step):
\`\`\`
Your Code (.java) GåÆ Compiler (javac) GåÆ Bytecode (.class) GåÆ JVM GåÆ Runs!
\`\`\`

### JVM has 3 main parts:

**1. Class Loader** =ƒôÜ GÇö Loads your .class files into memory (like a librarian finding your book)

**2. Memory Areas:**
- **Heap** = where objects live (like a storage warehouse =ƒôª)
- **Stack** = where local variables live (like a stack of plates =ƒì+n+Å)
- **Method Area** = where class info lives (like a library catalog =ƒôï)

**3. Execution Engine** GÜÖn+Å
- **Interpreter:** Reads code line by line (like a live translator =ƒÄÖn+Å)
- **JIT Compiler:** Converts hot code to fast machine code (like pre-translating a book =ƒôû)
- **Garbage Collector:** Auto-deletes unused objects (like a cleaning robot =ƒñû)

\`\`\`java
Student s = new Student("Rahul");
//     Gåæ reference in STACK    Gåæ object in HEAP

s = null;  // Garbage collector will clean up the object!
\`\`\`

### Remember:
\`\`\`
JDK = JRE + Dev Tools =ƒº¦ (for writing code)
JRE = JVM + Libraries =ƒôû (for running code)
JVM = The engine =ƒºá (that runs bytecode)
\`\`\`

=ƒÆí **Key Point:** JVM makes Java platform-independent. Same bytecode runs on Windows, Mac, and Linux!`
      },
      {
        patterns: ['jdk vs jre', 'jdk jre jvm', 'difference between jdk and jre', 'what is jdk', 'what is jre'],
        answer: `## JDK vs JRE vs JVM GÇö Simple Explanation!

Think of it like **Russian nesting dolls** =ƒ¬å:

\`\`\`
JDK  (biggest)  = JRE + Development Tools
 GööGöÇGöÇ JRE (medium) = JVM + Standard Libraries
      GööGöÇGöÇ JVM (smallest) = The Engine
\`\`\`

| | JDK | JRE | JVM |
|---|---|---|---|
| **Full Name** | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| **For whom?** | Developers G£ìn+Å | Users Gû¦n+Å | Internal =ƒºá |
| **Contains** | Compiler (javac), Debugger, JRE | Libraries, JVM | Execution Engine |
| **Can compile?** | G£à Yes | G¥î No | G¥î No |
| **Can run?** | G£à Yes | G£à Yes | G£à Yes |

**Simple Rule:**
- **Writing** Java code? GåÆ Install **JDK**
- **Running** Java programs? GåÆ Install **JRE**
- JVM is **inside** both GÇö never install separately

=ƒÆí **Analogy:** JDK is a **kitchen** =ƒº¦ (has stove + ingredients + utensils). JRE is a **microwave** =ƒôû (can only heat/run food). JVM is the **electricity** =ƒºá that powers both!`
      }
    ]
  },
  {
    topicId: 'u1t3',
    title: 'Java Bytecode & Compilation Process',
    keywords: ['bytecode', 'compilation', 'javac', 'compiler', 'interpreter', 'class file', 'source code', 'machine code', 'JIT', 'compile', 'run', 'execute'],
    content: `## =ƒô¥ Java Bytecode & Compilation Process

### =ƒôû Story Time: The Magic Recipe Book

Imagine you're a chef who writes recipes in English. But your kitchen helpers speak different languages GÇö one speaks Hindi, another Tamil, another French. 

Instead of writing the recipe in each language, you write it in a **special code** that a universal translator in each kitchen can read and convert to the local language.

In Java:
- **Your recipe** = Java source code (.java)
- **Special code** = Bytecode (.class)
- **Universal translator** = JVM (Java Virtual Machine)

---

### =ƒöä The Complete Journey: From Code to Output

\`\`\`
  Step 1           Step 2              Step 3               Step 4
GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ   GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ      GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ    GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
Göé You write Göé   Göé javac     Göé      Göé JVM reads      Göé    Göé Output   Göé
Göé .java     GöéGöÇGöÇGû¦Göé compiles  GöéGöÇGöÇGû¦   Göé bytecode &     GöéGöÇGöÇGû¦ Göé appears  Göé
Göé file      Göé   Göé to .class Göé      Göé executes it    Göé    Göé on screenGöé
GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ   GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ      GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ    GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
  (English)     (Universal          (Translated to        (Result!)
                 code)               machine language)
\`\`\`

### G£à Let's Walk Through an Example

#### Step 1: Write the Source Code

\`\`\`java
// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World! =ƒîì");
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
3. If everything is correct GåÆ creates \`HelloWorld.class\` (bytecode file)
4. If there's an error GåÆ shows error message and STOPS

**The .class file contains BYTECODE** GÇö it starts with the magic bytes **CA FE BA BE** (Caf+¬ Babe GÇö a coffee reference! Gÿò)

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
Hello, World! =ƒîì
Java is awesome!
\`\`\`

---

### =ƒöì What Exactly is Bytecode?

Bytecode is **intermediate code** GÇö it's NOT human-readable and NOT machine code. It sits in between!

\`\`\`
Human Language           Intermediate          Machine Language
(you can read)           (bytecode)            (computer reads)
                              
Java Source Code    GåÆ    Bytecode         GåÆ    Machine Code
(.java file)             (.class file)          (0s and 1s)
     Gåæ                       Gåæ                       Gåæ
You write this         javac creates this      JVM converts this
\`\`\`

### Why Bytecode is Brilliant:

| Without Bytecode G¥î | With Bytecode G£à |
|---------------------|-------------------|
| Compile separately for Windows | Compile **once** |
| Compile separately for Mac | Run **anywhere** |
| Compile separately for Linux | JVM handles the rest |
| 3 compilations for 3 platforms | 1 compilation for ALL platforms |

---

### GÜí Interpreter vs JIT Compiler

The JVM uses TWO ways to execute bytecode:

| Feature | Interpreter | JIT Compiler |
|---------|------------|-------------|
| **How** | Reads line-by-line | Converts blocks to machine code |
| **Speed** | Slow (translates every time) | Fast (translates once, reuses) |
| **Startup** | Fast (starts immediately) | Slow (needs time to compile) |
| **Used for** | Code that runs once | Code that runs many times (loops) |

**Think of it like:**
- **Interpreter** = A human translator at a meeting GÇö translates each sentence as it's spoken (slow but immediate)
- **JIT Compiler** = Translating the entire book beforehand GÇö takes time upfront but reading is fast afterward

The JVM is smart GÇö it starts with the **interpreter** and switches to **JIT** for code that runs frequently (called "hot spots")!

---

### =ƒåÜ Java vs C/C++ Compilation

| Feature | C/C++ | Java |
|---------|-------|------|
| Compiled to | Machine code directly | Bytecode first |
| Platform dependent? | G£à Yes (recompile for each OS) | G¥î No (WORA) |
| Intermediate step? | No | Yes (bytecode) |
| Runs on | Specific hardware | Any JVM |

### =ƒº¬ Practice Questions
1. What is bytecode?
2. What is the difference between a compiler and an interpreter?
3. What command compiles a Java program?
4. What does "CAFE BABE" mean in Java bytecode?
5. Why is Java called "platform independent"?

=ƒÆí **Key Takeaway:** Java compiles to bytecode (.class), not machine code. This bytecode runs on any JVM, making Java platform-independent. The JVM uses both an interpreter (for quick start) and JIT compiler (for speed).`,
    commonQuestions: [
      {
        patterns: ['what is bytecode', 'bytecode in java', 'explain bytecode', 'java bytecode', 'class file', 'compilation process', 'how java compiles'],
        answer: `## =ƒô¥ Java Bytecode GÇö The Universal Language!

**Simple Explanation:** Bytecode is the **intermediate code** that Java creates when you compile your program. It's like a universal recipe that any kitchen (JVM) in the world can follow!

### The Journey:
\`\`\`
Your Code (.java)  GåÆ  javac compiler  GåÆ  Bytecode (.class)  GåÆ  JVM  GåÆ  Runs!
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
java HelloWorld           # JVM reads bytecode GåÆ shows output
\`\`\`

### Why Bytecode is Special:
| Without Bytecode | With Bytecode |
|------------------|---------------|
| Compile for Windows G¥î | Compile ONCE G£à |
| Compile for Mac G¥î | Run ANYWHERE G£à |
| Compile for Linux G¥î | JVM handles it G£à |

### Interpreter vs JIT:
- **Interpreter** = translates line by line (quick start, slower execution)
- **JIT Compiler** = translates whole blocks (slow start, faster execution)
- JVM uses BOTH GÇö interpreter first, then JIT for frequently-run code!

**Fun fact:** Every .class file starts with **CA FE BA BE** (Caf+¬ Babe) GÇö a coffee reference! Gÿò

=ƒÆí **Key Takeaway:** Bytecode is Java's secret sauce for platform independence. Write once GåÆ compile once GåÆ run anywhere!`
      }
    ]
  },
  {
    topicId: 'u1t4',
    title: 'Data Types in Java',
    keywords: ['data type', 'primitive', 'int', 'float', 'double', 'char', 'boolean', 'byte', 'short', 'long', 'String', 'reference type', 'non-primitive', 'size', 'range', 'type casting', 'widening', 'narrowing'],
    content: `## =ƒôè Data Types in Java

### =ƒôû Story Time: The Container Shop

Imagine you go to a **container shop** =ƒÅ¬. You need different containers for different things:
- A **tiny box** for a ring =ƒÆì (needs very little space)
- A **medium box** for shoes =ƒæƒ (needs more space)
- A **large box** for a TV =ƒô¦ (needs a lot of space)

In Java, **data types are like containers** GÇö they tell Java how much memory to reserve and what kind of value you'll put inside!

---

### =ƒôª The 8 Primitive Data Types

Think of these like **8 different-sized boxes** in your container shop:

#### =ƒöó Integer Types (For whole numbers GÇö no decimals)

| Type | Size | Range | Analogy | Example |
|------|------|-------|---------|---------|
| **byte** | 1 byte | -128 to 127 | Matchbox =ƒö¦ | \`byte age = 25;\` |
| **short** | 2 bytes | -32,768 to 32,767 | Shoebox =ƒôª | \`short temp = -10;\` |
| **int** | 4 bytes | -¦2.1 billion | Suitcase =ƒº¦ | \`int salary = 50000;\` |
| **long** | 8 bytes | Very very large | Shipping container =ƒÜó | \`long pop = 8000000000L;\` |

#### =ƒöó Decimal Types (For numbers with a decimal point)

| Type | Size | Precision | Example |
|------|------|-----------|---------|
| **float** | 4 bytes | ~7 digits | \`float pi = 3.14f;\` (need **f**!) |
| **double** | 8 bytes | ~15 digits | \`double price = 99.99;\` |

#### =ƒöñ Character & Boolean

| Type | Size | What It Stores | Example |
|------|------|---------------|---------|
| **char** | 2 bytes | Single character | \`char grade = 'A';\` |
| **boolean** | 1 bit* | true or false only | \`boolean pass = true;\` |

> *boolean represents 1 bit of info, but JVM uses 1 byte internally

### G£à Complete Code Example

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
        System.out.println("Salary: Gé¦" + salary);
        System.out.println("Population: " + worldPopulation);
        System.out.println("Pi: " + pi);
        System.out.println("Grade: " + grade);
        System.out.println("Java is fun? " + isJavaFun);
    }
}
\`\`\`

### =ƒöä Type Casting (Converting Types)

#### Widening (Auto GÇö small GåÆ big) G£à Safe
\`\`\`java
int x = 100;
double d = x;  // int GåÆ double (automatic!)
// Like pouring water from a cup GåÆ bucket (nothing spills!)
\`\`\`

#### Narrowing (Manual GÇö big GåÆ small) GÜán+Å May lose data!
\`\`\`java
double price = 9.78;
int rounded = (int) price;  // double GåÆ int = 9 (decimal lost!)
// Like pouring water from a bucket GåÆ cup (some spills!)
\`\`\`

### =ƒº¬ Practice Questions
1. How many primitive data types are in Java?
2. What is the most common type for whole numbers?
3. Why do we add 'f' after a float value?
4. What is type casting?

=ƒÆí **Key Takeaway:** Java has 8 primitive types. Use \`int\` for whole numbers, \`double\` for decimals, \`boolean\` for true/false. Widening is automatic, narrowing needs explicit cast.`,
    commonQuestions: [
      {
        patterns: ['data types', 'types in java', 'primitive types', 'what are data types', 'int float char boolean'],
        answer: `## =ƒôè Java Data Types GÇö The 8 Boxes!

Think of data types like **containers** in a shop GÇö different sizes for different things!

### =ƒöó For Whole Numbers:
| Type | Size | Example | Analogy |
|------|------|---------|---------|
| \`byte\` | 1 byte | \`byte age = 25;\` | Matchbox =ƒö¦ |
| \`short\` | 2 bytes | \`short temp = -10;\` | Shoebox =ƒôª |
| \`int\` | 4 bytes | \`int salary = 50000;\` | **Suitcase =ƒº¦ (Most used!)** |
| \`long\` | 8 bytes | \`long pop = 8000000000L;\` | Container =ƒÜó |

### =ƒöó For Decimals:
| Type | Size | Example |
|------|------|---------|
| \`float\` | 4 bytes | \`float pi = 3.14f;\` (need **f**!) |
| \`double\` | 8 bytes | \`double price = 99.99;\` GåÉ **Most used!** |

### =ƒöñ Other:
| Type | Example |
|------|---------|
| \`char\` | \`char grade = 'A';\` (single quotes!) |
| \`boolean\` | \`boolean pass = true;\` (only true/false) |

### Type Casting:
\`\`\`java
int x = 100;
double d = x;        // Widening (auto) G£à GÇö cup GåÆ bucket
int y = (int) 9.78;  // Narrowing (manual) GåÆ 9 GÜán+Å GÇö bucket GåÆ cup
\`\`\`

=ƒÆí **Memory trick:** **B-S-I-L-F-D-C-B** = byte, short, int, long, float, double, char, boolean!`
      }
    ]
  },
  {
    topicId: 'u1t5',
    title: 'Variables, Arrays & Expressions',
    keywords: ['variable', 'array', 'expression', 'declaration', 'initialization', 'local variable', 'instance variable', 'static variable', 'class variable', 'array declaration', 'multi-dimensional array', '2D array', 'final', 'constant', 'scope'],
    content: `## =ƒôª Variables, Arrays & Expressions

### =ƒôû Variables GÇö Named Storage Boxes

**Simple Definition:** A variable is a **named box** that stores a value in memory.

**Think of it like:** Labeled jars in a kitchen =ƒÅ¦
- Jar labeled "Sugar" GåÆ contains sugar
- Jar labeled "Salt" GåÆ contains salt
- You can empty a jar and put something new in it!

\`\`\`java
int age = 20;           // jar labeled "age" contains 20
String name = "Rahul";  // jar labeled "name" contains "Rahul"
double price = 99.99;   // jar labeled "price" contains 99.99

age = 21;               // now age is 21 (old value 20 is gone)
\`\`\`

#### =ƒö+ Three Types of Variables

\`\`\`java
class Student {
    // 1. INSTANCE VARIABLE GÇö each object has its own copy
    String name;           // like each student has their own name
    int age;

    // 2. STATIC VARIABLE GÇö shared by ALL objects
    static String school = "ABC School";  // same school for everyone

    void study() {
        // 3. LOCAL VARIABLE GÇö exists only inside this method
        int hours = 5;     // like a sticky note GÇö temporary!
    }
}
\`\`\`

| Type | Where | Scope | Default Value |
|------|-------|-------|---------------|
| **Local** | Inside method | That method only | None (must set!) |
| **Instance** | In class, per object | Each object | 0, null, false |
| **Static** | Shared by ALL objects | Whole class | 0, null, false |

---

### =ƒôè Arrays GÇö Row of Numbered Boxes

**Think of it like:** A row of lockers in school =ƒöó, each numbered starting from **0**.

\`\`\`
Index:   [0]   [1]   [2]   [3]   [4]
         GöîGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÉ
marks:   Göé 85  Göé 92  Göé 78  Göé 95  Göé 88  Göé
         GööGöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGöÿ
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

#### =ƒôÉ 2D Arrays (Tables)
\`\`\`java
int[][] grid = {
    {1, 2, 3},    // Row 0
    {4, 5, 6},    // Row 1
    {7, 8, 9}     // Row 2
};
System.out.println(grid[1][2]); // 6 (row 1, column 2)
\`\`\`

---

### =ƒº« Expressions & Constants

\`\`\`java
// Expressions produce values
int sum = 10 + 20;                      // 30
boolean isAdult = (age >= 18);          // true or false
String greeting = "Hello " + name + "!"; // string joining

// Constants (can't change!)
final double PI = 3.14159;
// PI = 3.14;  // G¥î ERROR! final means "carved in stone" =ƒ¬¿
\`\`\`

### =ƒº¬ Practice Questions
1. What index does the first array element have?
2. What are the 3 types of variables?
3. What does \`final\` keyword do?

=ƒÆí **Key Takeaway:** Variables are named boxes. Arrays are numbered rows of boxes (index starts at 0). Use \`final\` for constants that never change.`,
    commonQuestions: [
      {
        patterns: ['what is variable', 'variables in java', 'types of variables', 'declare variable'],
        answer: `## =ƒôª Variables in Java GÇö Named Storage Boxes!

A variable stores a value in memory GÇö like a **labeled jar** =ƒÅ¦.

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

=ƒÆí Local variables MUST be initialized before use!`
      },
      {
        patterns: ['what is array', 'array in java', 'how to create array', 'declare array', 'array example'],
        answer: `## =ƒôè Arrays GÇö Row of Numbered Boxes!

An array is a **fixed-size collection** of same-type items, indexed from **0**.

\`\`\`
Index:  [0]   [1]   [2]   [3]   [4]
        GöîGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÉ
marks:  Göé 85  Göé 92  Göé 78  Göé 95  Göé 88  Göé
        GööGöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGö¦GöÇGöÇGöÇGöÇGöÇGöÿ
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

GÜán+Å Index starts at **0**! Array of size 5 GåÆ indexes 0,1,2,3,4 (no index 5!)`
      }
    ]
  },
  {
    topicId: 'u1t6',
    title: 'Operators in Java',
    keywords: ['operator', 'arithmetic', 'relational', 'logical', 'assignment', 'ternary', 'unary', 'increment', 'decrement', 'conditional', 'modulus', 'comparison', 'AND', 'OR', 'NOT'],
    content: `## GÜÖn+Å Operators in Java

### =ƒôû Simple Explanation
Operators are **symbols** that perform operations on values GÇö like math symbols (+, -, +ù, ++) but more powerful!

---

### =ƒöó 1. Arithmetic Operators (Math)
\`\`\`java
int a = 10, b = 3;
a + b   // 13  GåÆ Addition
a - b   // 7   GåÆ Subtraction
a * b   // 30  GåÆ Multiplication
a / b   // 3   GåÆ Division (integer! No decimal)
a % b   // 1   GåÆ Modulus (remainder: 10++3 = 3 remainder 1)
\`\`\`

GÜán+Å **Tricky:** \`7 / 2 = 3\` (not 3.5!) GÇö use \`7.0 / 2\` for decimals.

**Modulus (%) is super useful:**
\`\`\`java
if (num % 2 == 0) System.out.println("Even!");  // check even/odd
int lastDigit = 1234 % 10;  // 4 (get last digit)
\`\`\`

---

### GPòGPû 2. Increment/Decrement (++ and --)
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

### GÜûn+Å 3. Relational Operators (Compare GåÆ true/false)
\`\`\`java
10 == 10  // true  (equal to) GÇö NOTE: double equals!
10 != 5   // true  (not equal)
10 > 5    // true  (greater than)
10 < 20   // true  (less than)
10 >= 10  // true  (greater or equal)
10 <= 5   // false (less or equal)
\`\`\`
GÜán+Å **Common Mistake:** \`=\` assigns, \`==\` compares!

---

### =ƒöù 4. Logical Operators (Combine Conditions)
\`\`\`java
// AND (&&) GÇö BOTH must be true
if (age >= 18 && hasID) { /* enter movie */ }
// "Do you have BOTH ticket AND ID?"

// OR (||) GÇö At least ONE must be true
if (age < 13 || age > 60) { /* get discount */ }
// "Are you a child OR a senior?"

// NOT (!) GÇö Reverses true/false
if (!isRaining) { /* go outside */ }
// "Is it NOT raining?"
\`\`\`

---

### G¥ô 5. Ternary Operator (Short if-else)
\`\`\`java
String status = (age >= 18) ? "Adult" : "Minor";
// condition ? valueIfTrue : valueIfFalse
// "Is it raining? YES GåÆ umbrella : NO GåÆ sunglasses"
\`\`\`

---

### =ƒô¥ 6. Assignment Operators (Shortcuts)
\`\`\`java
x += 5;   // x = x + 5
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
x /= 4;   // x = x / 4
x %= 3;   // x = x % 3
\`\`\`

### =ƒº¬ Practice Questions
1. What is \`10 % 3\`?
2. Difference between \`=\` and \`==\`?
3. Difference between \`a++\` and \`++a\`?
4. Write a ternary to find the max of two numbers.

=ƒÆí **Key Takeaway:** Arithmetic (+,-,*,/,%), Relational (==,!=,>,<), Logical (&&,||,!), Ternary (?:). Remember: \`=\` assigns, \`==\` compares!`,
    commonQuestions: [
      {
        patterns: ['operators in java', 'types of operators', 'java operators', 'arithmetic operator', 'logical operator', 'ternary operator'],
        answer: `## GÜÖn+Å Java Operators GÇö Complete Guide!

### Arithmetic (Math):
\`\`\`java
10 + 3  // 13 (Add)     10 - 3  // 7 (Subtract)
10 * 3  // 30 (Multiply) 10 / 3  // 3 (Divide GÇö integer!)
10 % 3  // 1 (Remainder)
\`\`\`

### Relational (Compare GåÆ true/false):
\`\`\`java
== (equal)   != (not equal)   > (greater)
<  (less)    >= (greater/eq)  <= (less/eq)
\`\`\`

### Logical (Combine conditions):
\`\`\`java
&&  // AND GÇö both true     ||  // OR GÇö at least one true
!   // NOT GÇö reverses
\`\`\`

### Ternary (Short if-else):
\`\`\`java
String s = (age >= 18) ? "Adult" : "Minor";
\`\`\`

### Increment: \`x++\` (use then add) vs \`++x\` (add then use)

GÜán+Å \`=\` assigns, \`==\` compares!`
      }
    ]
  },
  {
    topicId: 'u1t7',
    title: 'Control Structures (if, switch, loops)',
    keywords: ['control', 'if', 'else', 'switch', 'case', 'for', 'while', 'do while', 'loop', 'break', 'continue', 'nested', 'condition', 'iteration', 'decision', 'flow control', 'for-each'],
    content: `## =ƒöÇ Control Structures (if, switch, loops)

### =ƒôû Simple Explanation
Normally, Java runs code **line by line from top to bottom**. But what if you want to:
- Make a **decision**? GåÆ Use if/switch
- **Repeat** something? GåÆ Use loops

**Think of it like a road:** =ƒ¢ún+Å
- **Straight road** = normal code (line by line)
- **Fork in the road** = if-else (choose a path)
- **Roundabout** = loop (go around and around)

---

### =ƒö+ Part 1: Decision Making

#### if-else (Choose a Path)
\`\`\`java
int marks = 85;

if (marks >= 90) {
    System.out.println("Grade: A+ =ƒîƒ");
} else if (marks >= 80) {
    System.out.println("Grade: A =ƒÄë");     // GåÉ This runs!
} else if (marks >= 70) {
    System.out.println("Grade: B =ƒæì");
} else if (marks >= 40) {
    System.out.println("Grade: D GÜán+Å");
} else {
    System.out.println("Grade: F G¥î");
}
\`\`\`

**Think of it like:** "If it's raining Gÿö GåÆ take umbrella. Else if cloudy Gÿün+Å GåÆ take jacket. Else GÿÇn+Å GåÆ wear sunglasses."

#### switch (Multiple Exact Choices)
\`\`\`java
int day = 3;
switch (day) {
    case 1: System.out.println("Monday =ƒÿ¦"); break;
    case 2: System.out.println("Tuesday =ƒôÜ"); break;
    case 3: System.out.println("Wednesday =ƒÉ¬"); break;  // GåÉ runs
    case 4: System.out.println("Thursday =ƒÄ«"); break;
    case 5: System.out.println("Friday =ƒÄë"); break;
    case 6: case 7: System.out.println("Weekend! =ƒÅûn+Å"); break;
    default: System.out.println("Invalid! G¥î");
}
\`\`\`
GÜán+Å **Don't forget \`break\`!** Without it, ALL cases below run too!

---

### =ƒö+ Part 2: Loops (Repeating Code)

#### for Loop GÇö When you KNOW how many times
**Think of it like:** Climbing stairs =ƒ¬£ GÇö you know it's exactly 10 steps.

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

#### while Loop GÇö When you DON'T know how many times
**Think of it like:** Eating pizza =ƒìò GÇö "Keep eating WHILE hungry" (don't know how many slices!)

\`\`\`java
int sum = 0, num = 1;
while (num <= 100) {
    sum += num;
    num++;
}
System.out.println("Sum 1-100 = " + sum);  // 5050
\`\`\`

#### do-while Loop GÇö Runs AT LEAST once
**Think of it like:** Checking weather Gÿün+Å GÇö you go outside FIRST, THEN check.

\`\`\`java
int choice;
do {
    System.out.println("1. Play  2. Score  3. Exit");
    choice = scanner.nextInt();
} while (choice != 3);  // keeps showing until user picks 3
\`\`\`

---

### =ƒöº break and continue
\`\`\`java
// BREAK = EXIT the loop =ƒÅâ
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;
    System.out.print(i + " ");  // 1 2 3 4
}

// CONTINUE = SKIP this one GÅ¡n+Å
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;  // skip even numbers
    System.out.print(i + " ");  // 1 3 5 7 9
}
\`\`\`

### =ƒåÜ Loop Comparison
| Loop | Check | Min Runs | Best For |
|------|-------|----------|----------|
| **for** | Before | 0 | Known count |
| **while** | Before | 0 | Unknown count |
| **do-while** | After | **1** | Menus, retry |

### =ƒº¬ Practice Questions
1. Difference between while and do-while?
2. Write a for loop to print even numbers 1-20.
3. What does \`break\` do? What does \`continue\` do?
4. When to use switch vs if-else?

=ƒÆí **Key Takeaway:** Use \`if/else\` for decisions, \`switch\` for exact values, \`for\` for known counts, \`while\` for unknown counts, \`do-while\` for "at least once". \`break\` exits, \`continue\` skips.`,
    commonQuestions: [
      {
        patterns: ['control structure', 'if else', 'switch case', 'for loop', 'while loop', 'do while', 'loops in java', 'loop', 'break continue'],
        answer: `## =ƒöÇ Control Structures GÇö Quick Guide!

### Decision Making:
\`\`\`java
// if-else
if (marks >= 40) {
    System.out.println("Pass G£à");
} else {
    System.out.println("Fail G¥î");
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
// for GÇö KNOW how many times (climbing stairs =ƒ¬£)
for (int i = 1; i <= 10; i++) { ... }

// while GÇö DON'T know how many (eating pizza =ƒìò)
while (hungry) { eat(); }

// do-while GÇö runs AT LEAST once (menu)
do { showMenu(); } while (choice != 0);
\`\`\`

### break & continue:
- \`break\` = EXIT the loop =ƒÅâ
- \`continue\` = SKIP this round, go next GÅ¡n+Å

| Loop | Min runs | Best for |
|------|----------|----------|
| for | 0 | Known count |
| while | 0 | Unknown count |
| do-while | **1** | Menus, retry |`
      }
    ]
  }
];

export default unit1Knowledge;
