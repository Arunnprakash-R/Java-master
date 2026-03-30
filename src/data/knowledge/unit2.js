// Unit 2: Java Classes - Complete Knowledge Base (Teacher-Style)
const unit2Knowledge = [
  {
    topicId: 'u2t1',
    title: 'Abstract Classes & Static Classes',
    keywords: ['abstract', 'static class', 'abstract class', 'abstract method', 'concrete', 'static method', 'static block', 'static member', 'cannot instantiate'],
    content: `## =���n+� Abstract Classes & Static Classes

### =��� Story Time: The Blueprint and the Shared Board

Imagine you're an architect =�Ţn+�. You draw a **blueprint** for a house G�� it shows rooms, doors, and windows. But can you LIVE in a blueprint? **NO!** You need to actually BUILD the house first!

That's what an **abstract class** is G�� a blueprint that other classes must "build" (implement).

Now imagine a **shared whiteboard** in your classroom =���. Every student can see the same board. Nobody has their own copy. That's what **static** means G�� one shared copy for everyone!

---

### =��+ ABSTRACT CLASSES

#### What is an Abstract Class?

An abstract class is a class that:
1. G�� **Cannot be used to create objects directly** (can't do \`new Shape()\`)
2. G�� **Can have abstract methods** (methods with NO body G�� just a promise)
3. G�� **Can also have regular methods** (methods WITH a body)
4. G�� **Can have constructors, variables, everything else**

**Why use it?** To force all child classes to implement certain methods while also sharing common code!

#### Real-Life Example:

Think of **"Vehicle"** =��� as an abstract concept:
- Every vehicle has a \`color\` and can \`start()\` G�� these are COMMON 
- But HOW a vehicle \`moves()\` is DIFFERENT for each type:
  - Car moves on **4 wheels** =���
  - Bike moves on **2 wheels** =���n+�
  - Boat moves on **water** G��

So \`move()\` should be **abstract** G�� each vehicle decides HOW to move!

\`\`\`java
// ABSTRACT CLASS G�� The Blueprint (can't create objects!)
abstract class Vehicle {
    String color;
    int speed;
    
    // Constructor G�� YES, abstract classes CAN have constructors!
    Vehicle(String color) {
        this.color = color;
    }
    
    // ABSTRACT METHOD G�� no body! Just says WHAT to do, not HOW.
    // Every child class MUST implement this!
    abstract void move();
    
    // REGULAR METHOD G�� has a body, shared by all children
    void start() {
        System.out.println(color + " vehicle started! =���");
    }
    
    void stop() {
        System.out.println("Vehicle stopped! =���");
    }
}

// CONCRETE CLASS G�� The Actual Building
class Car extends Vehicle {
    Car(String color) {
        super(color);  // call parent constructor
    }
    
    @Override
    void move() {
        System.out.println(color + " car driving on 4 wheels! =���");
    }
}

class Bike extends Vehicle {
    Bike(String color) {
        super(color);
    }
    
    @Override
    void move() {
        System.out.println(color + " bike riding on 2 wheels! =���n+�");
    }
}

class Boat extends Vehicle {
    Boat(String color) {
        super(color);
    }
    
    @Override
    void move() {
        System.out.println(color + " boat sailing on water! G��");
    }
}

// Usage:
// Vehicle v = new Vehicle("Red");  // G�� ERROR! Can't create abstract object!
Vehicle car = new Car("Red");       // G�� Create the actual thing
Vehicle bike = new Bike("Blue");    // G��
Vehicle boat = new Boat("White");   // G��

car.start();   // "Red vehicle started! =���"
car.move();    // "Red car driving on 4 wheels! =���"
bike.move();   // "Blue bike riding on 2 wheels! =���n+�"
boat.move();   // "White boat sailing on water! G��"
\`\`\`

#### Rules for Abstract Classes:
| Rule | Explanation |
|------|-------------|
| Cannot create objects | \`new AbstractClass()\` G�� ERROR G�� |
| Can have abstract methods | Methods without body (just declaration) |
| Can have regular methods | Methods with body (shared by children) |
| Can have constructors | Called when child class is created |
| Can have variables | Both instance and static variables |
| Child MUST implement all abstract methods | Or child must also be abstract |

---

### =��+ STATIC MEMBERS

#### What does "static" mean?

**Static = belongs to the CLASS, not to individual objects.**

**Think of it like:** In your school =�Ž:
- Each student has their own **name** (instance variable G�� different for each)
- But all students share the same **school name** (static G�� same for everyone)

\`\`\`java
class Student {
    // INSTANCE variables G�� each student has own copy
    String name;
    int rollNo;
    
    // STATIC variable G�� ONE shared copy for ALL students
    static String schoolName = "ABC International School";
    static int totalStudents = 0;
    
    // Constructor
    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
        totalStudents++;  // Increment the SHARED counter
    }
    
    // INSTANCE method G�� needs an object to call
    void display() {
        System.out.println(name + " (Roll: " + rollNo + ")");
    }
    
    // STATIC method G�� can call WITHOUT creating an object
    static void showTotalStudents() {
        System.out.println("Total students: " + totalStudents);
        // System.out.println(name);  // G�� ERROR! Can't use instance var in static method!
    }
}

// Usage:
Student s1 = new Student("Rahul", 1);
Student s2 = new Student("Priya", 2);
Student s3 = new Student("Amit", 3);

// Static G�� access without object!
Student.showTotalStudents();  // "Total students: 3"
System.out.println(Student.schoolName);  // "ABC International School"

// Instance G�� need an object
s1.display();  // "Rahul (Roll: 1)"
\`\`\`

#### Static Blocks
\`\`\`java
class Config {
    static int maxUsers;
    
    // STATIC BLOCK G�� runs ONCE when class is first loaded
    static {
        System.out.println("Loading configuration...");
        maxUsers = 100;
    }
}
// When you first use Config class, the static block runs automatically!
\`\`\`

#### Static vs Instance G�� Quick Comparison
| Feature | Static | Instance |
|---------|--------|----------|
| Belongs to | CLASS | OBJECT |
| Copies | ONE (shared) | One per object |
| Access | \`ClassName.method()\` | \`object.method()\` |
| Memory | Loaded once | Created per object |
| Can access instance members? | G�� No | G�� Yes |
| Can access static members? | G�� Yes | G�� Yes |

### =��� Practice Questions
1. Can we create an object of an abstract class?
2. What happens if a child class doesn't implement all abstract methods?
3. What's the difference between static and instance variables?
4. Can a static method access instance variables?

=��� **Key Takeaway:** Abstract = blueprint (can't create objects, forces children to implement methods). Static = shared by all objects (belongs to the class, not individual objects).`,
    commonQuestions: [
      {
        patterns: ['abstract class', 'what is abstract', 'abstract method', 'why abstract'],
        answer: `## =���n+� Abstract Classes G�� The Blueprint!

An abstract class is like a **blueprint** G�� it defines WHAT should exist but can't be used directly.

\`\`\`java
abstract class Animal {
    abstract void sound();     // WHAT G�� no body (children decide HOW)
    void breathe() {           // HOW G�� shared by all animals
        System.out.println("Breathing...");
    }
}

class Dog extends Animal {
    void sound() { System.out.println("Woof!"); }  // Dog decides HOW
}

class Cat extends Animal {
    void sound() { System.out.println("Meow!"); }  // Cat decides HOW
}

// Animal a = new Animal();  G�� Can't create blueprint object!
Animal d = new Dog();        G�� Create actual thing
d.sound();    // "Woof!"
d.breathe();  // "Breathing..."
\`\`\`

### Key Rules:
- G�� Cannot create objects of abstract class
- G�� Can have abstract methods (no body) AND regular methods (with body)
- G�� Can have constructors and variables
- Child MUST implement ALL abstract methods (or also be abstract)`
      },
      {
        patterns: ['static', 'what is static', 'static method', 'static variable', 'static vs instance'],
        answer: `## =��� Static G�� Shared by Everyone!

**Static = belongs to the CLASS, not to individual objects.**

Think of your **school name** G�� same for every student (static). But each student has their own **name** (instance).

\`\`\`java
class Student {
    String name;                              // Instance G�� each has own
    static String school = "ABC School";      // Static G�� shared by ALL
    static int count = 0;                     // Static G�� one counter
    
    Student(String name) {
        this.name = name;
        count++;
    }
    
    static void showCount() {                 // Static method
        System.out.println("Total: " + count);
    }
}

// Access static WITHOUT creating object:
System.out.println(Student.school);  // "ABC School"
Student.showCount();                  // "Total: 0"
\`\`\`

| Static | Instance |
|--------|----------|
| Belongs to CLASS | Belongs to OBJECT |
| ONE shared copy | One per object |
| \`ClassName.method()\` | \`object.method()\` |
| G�� Can't access instance vars | G�� Can access everything |`
      }
    ]
  },
  {
    topicId: 'u2t2',
    title: 'Inner Classes & Packages',
    keywords: ['inner class', 'nested class', 'anonymous class', 'local class', 'static nested', 'package', 'import', 'access', 'member class', 'java.lang', 'java.util', 'java.io'],
    content: `## =��� Inner Classes & Packages

### =��� Story Time: Rooms Inside a House & Neighborhoods

**Inner Classes** = Think of a **room inside a house** =���. The room (inner class) is INSIDE the house (outer class). It can access everything in the house G�� kitchen, bathroom, living room. But from outside, you need to enter the house first to reach the room.

**Packages** = Think of **neighborhoods** =���n+� in a city. Each neighborhood groups similar houses together. "Medical Lane" has all hospitals, "School Road" has all schools. Packages group similar classes together!

---

### =��+ INNER CLASSES (Class inside a Class)

#### Why use inner classes?
- When a class is only useful inside another class
- To keep related code together (better organization)
- Inner class can access ALL members of outer class (even private!)

#### Type 1: Member Inner Class (Regular Inner Class)

\`\`\`java
class School {                          // OUTER CLASS (the house =���)
    private String schoolName = "ABC School";
    
    class Student {                      // INNER CLASS (room inside house)
        String name;
        
        Student(String name) {
            this.name = name;
        }
        
        void display() {
            // G�� Can access outer class's PRIVATE members!
            System.out.println(name + " studies at " + schoolName);
        }
    }
}

// How to create inner class object:
School school = new School();                   // First create outer
School.Student s = school.new Student("Rahul"); // Then create inner
s.display();  // "Rahul studies at ABC School"
\`\`\`

#### Type 2: Static Nested Class

\`\`\`java
class University {
    static String uniName = "IIT";
    
    static class Department {            // STATIC G�� no need for outer object
        void display() {
            System.out.println("Dept of " + uniName);  // Can access static only
        }
    }
}

// Simpler creation G�� no outer object needed!
University.Department dept = new University.Department();
dept.display();  // "Dept of IIT"
\`\`\`

#### Type 3: Anonymous Inner Class (No Name!)

\`\`\`java
// Instead of creating a whole new file for a class...
// Create it on the spot without a name!
Animal myPet = new Animal() {
    @Override
    void sound() {
        System.out.println("Woof! =���");
    }
};
myPet.sound();  // "Woof! =���"
\`\`\`

#### Type 4: Local Inner Class (Inside a Method)
\`\`\`java
class Outer {
    void myMethod() {
        class LocalHelper {              // Only exists inside this method!
            void help() {
                System.out.println("Helping! =��");
            }
        }
        LocalHelper h = new LocalHelper();
        h.help();
    }
}
\`\`\`

#### Summary of Inner Class Types:
| Type | Where | Needs Outer Object? | Use Case |
|------|-------|-------------------|----------|
| Member Inner | Inside class | G�� Yes | Access outer's members |
| Static Nested | Inside class (static) | G�� No | Independent utility |
| Anonymous | Anywhere | Depends | Quick one-time use |
| Local | Inside method | G�� | Temporary helper |

---

### =��� PACKAGES (Organizing Classes)

**Think of packages like folders on your computer** =���:
\`\`\`
My Documents/
G��G��G�� Photos/          (java.awt G�� GUI classes)
G��G��G�� Videos/          (java.io G�� Input/Output classes)
G��G��G�� Music/           (java.util G�� Utility classes)
G��G��G�� Work/            (java.lang G�� Language basics)
\`\`\`

#### Built-in Java Packages:
| Package | Contains | Example Classes |
|---------|----------|----------------|
| \`java.lang\` | Core classes (auto-imported!) | String, Math, Object, System |
| \`java.util\` | Utilities | Scanner, ArrayList, HashMap |
| \`java.io\` | File input/output | File, InputStream, OutputStream |
| \`java.awt\` | GUI components | Frame, Button, Color |
| \`javax.swing\` | Modern GUI | JFrame, JButton, JPanel |
| \`java.sql\` | Database | Connection, Statement |
| \`java.net\` | Networking | Socket, URL |

#### Creating Your Own Package:
\`\`\`java
// File: com/myapp/models/Student.java
package com.myapp.models;       // declare package (FIRST line!)

public class Student {
    public String name;
    public void display() {
        System.out.println("Student: " + name);
    }
}

// In another file G�� using the package:
import com.myapp.models.Student;  // import specific class
// OR
import com.myapp.models.*;        // import ALL classes from package

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Rahul";
        s.display();
    }
}
\`\`\`

#### Package Naming Convention:
\`\`\`
com.companyname.projectname.module
 G��       G��           G��         G��
domain  company    project    feature

Example: com.google.maps.navigation
\`\`\`

### =��� Practice Questions
1. What are the 4 types of inner classes?
2. Can an inner class access private members of the outer class?
3. What is the difference between \`import java.util.Scanner\` and \`import java.util.*\`?
4. Which package is auto-imported in every Java program?

=��� **Key Takeaway:** Inner classes = classes inside classes (4 types). Packages = folders that organize classes. \`java.lang\` is auto-imported. Use \`import\` to use classes from other packages.`,
    commonQuestions: [
      {
        patterns: ['inner class', 'nested class', 'types of inner class', 'class inside class'],
        answer: `## =��� Inner Classes G�� Class Inside a Class!

Like a **room inside a house** =��� G�� the room can access everything in the house!

### 4 Types:

**1. Member Inner Class** (regular inner class):
\`\`\`java
class Outer {
    private int x = 10;
    class Inner {
        void show() { System.out.println(x); }  // G�� Access private!
    }
}
Outer o = new Outer();
Outer.Inner i = o.new Inner();  // Need outer object first
\`\`\`

**2. Static Nested Class** (don't need outer object):
\`\`\`java
class Outer {
    static class Nested {  }
}
Outer.Nested n = new Outer.Nested();  // Direct creation
\`\`\`

**3. Anonymous Class** (no name, one-time use):
\`\`\`java
Animal a = new Animal() {
    void sound() { System.out.println("Woof!"); }
};
\`\`\`

**4. Local Class** (inside a method, temporary):
\`\`\`java
void myMethod() {
    class Helper { void help() { } }
    new Helper().help();
}
\`\`\`

=��� Inner classes can access outer class's private members!`
      },
      {
        patterns: ['package', 'what is package', 'import', 'java packages', 'built-in package'],
        answer: `## =��� Packages G�� Organizing Your Classes!

Packages are like **folders** =��� that group related classes together.

### Built-in Packages:
| Package | What's Inside |
|---------|---------------|
| \`java.lang\` | String, Math, System **(auto-imported!)** |
| \`java.util\` | Scanner, ArrayList, HashMap |
| \`java.io\` | File, InputStream, OutputStream |
| \`java.awt\` | Frame, Button (GUI) |
| \`java.sql\` | Connection, Statement (Database) |

### Creating & Using:
\`\`\`java
// Declare (FIRST line!)
package com.myapp.models;

public class Student { ... }

// Use in another file:
import com.myapp.models.Student;   // specific class
import com.myapp.models.*;          // all classes
\`\`\`

=��� \`java.lang\` is the ONLY package that's automatically imported!`
      }
    ]
  },
  {
    topicId: 'u2t3',
    title: 'Wrapper Classes & Interfaces',
    keywords: ['wrapper', 'Integer', 'Double', 'Character', 'Boolean', 'autoboxing', 'unboxing', 'interface', 'implements', 'default method', 'functional interface', 'multiple inheritance'],
    content: `## =��� Wrapper Classes & Interfaces

### =��� Part 1: Wrapper Classes G�� Gift-Wrapping Primitives!

#### The Problem:
Java has two kinds of data types:
- **Primitive types:** int, double, char, boolean (simple values, fast, but limited)
- **Objects:** String, ArrayList, etc. (powerful, but heavier)

Some Java features (like ArrayList) ONLY work with objects, not primitives!

\`\`\`java
ArrayList<int> numbers;     // G�� ERROR! ArrayList can't hold primitives!
ArrayList<Integer> numbers; // G�� WORKS! Integer is the wrapper for int
\`\`\`

**Think of it like:** You can't mail a **loose diamond** =���. You need to put it in a **box** =��� first. Wrapper classes are the box for primitive values!

#### The 8 Wrapper Classes:
| Primitive | Wrapper Class | Example |
|-----------|--------------|---------|
| byte | **Byte** | \`Byte b = 10;\` |
| short | **Short** | \`Short s = 100;\` |
| int | **Integer** | \`Integer n = 42;\` |
| long | **Long** | \`Long l = 999L;\` |
| float | **Float** | \`Float f = 3.14f;\` |
| double | **Double** | \`Double d = 99.99;\` |
| char | **Character** | \`Character c = 'A';\` |
| boolean | **Boolean** | \`Boolean flag = true;\` |

**Memory trick:** All wrapper names are the FULL spelling with Capital letter! (Except: int G�� **Int**eger, char G�� **Char**acter)

#### Autoboxing & Unboxing:

\`\`\`java
// AUTOBOXING G�� primitive G�� wrapper (automatic gift-wrapping! =���)
Integer num = 42;          // int 42 auto-wrapped into Integer object
Double price = 99.99;      // double auto-wrapped into Double object

// UNBOXING G�� wrapper G�� primitive (unwrapping the gift! =���G��=���)
int value = num;           // Integer auto-unwrapped to int
double p = price;          // Double auto-unwrapped to double
\`\`\`

#### Useful Wrapper Methods:
\`\`\`java
// Convert String to number
int n = Integer.parseInt("42");        // String G�� int
double d = Double.parseDouble("3.14"); // String G�� double

// Convert number to String
String s = Integer.toString(42);       // int G�� String
String s2 = String.valueOf(99.99);     // any G�� String

// Get min/max values
System.out.println(Integer.MAX_VALUE); // 2147483647
System.out.println(Integer.MIN_VALUE); // -2147483648
\`\`\`

---

### =��� Part 2: Interfaces G�� The Contract!

#### What is an Interface?

**Think of it like a CONTRACT** =���:
- When you sign a contract, you PROMISE to do certain things
- An interface is a contract that says "Any class that implements me MUST provide these methods"

**Real-life example:**
- A **power outlet** is like an interface G�� it says "Provide 2 or 3 pins to connect"
- A phone charger, laptop charger, fan G�� ALL follow the same outlet interface!
- They all "plug in" differently inside, but they all fit the same outlet

\`\`\`java
// INTERFACE G�� The Contract
interface Drawable {
    void draw();          // What to do (no HOW G�� no body!)
    double getArea();     // Another promise
}

// Classes IMPLEMENT the interface (fulfill the contract)
class Circle implements Drawable {
    double radius;
    
    Circle(double radius) { this.radius = radius; }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle G�� with radius " + radius);
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Drawable {
    double length, width;
    
    Rectangle(double l, double w) { length = l; width = w; }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle G�� " + length + "x" + width);
    }
    
    @Override
    public double getArea() {
        return length * width;
    }
}

// Usage:
Drawable shape1 = new Circle(5);
Drawable shape2 = new Rectangle(4, 6);

shape1.draw();  // "Drawing circle G�� with radius 5"
shape2.draw();  // "Drawing rectangle G�� 4x6"
\`\`\`

#### Multiple Interfaces (Java's answer to multiple inheritance!):
\`\`\`java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {  // Implements BOTH!
    public void fly()  { System.out.println("Duck flying! =���G��n+�"); }
    public void swim() { System.out.println("Duck swimming! =���=���"); }
}
\`\`\`

Java doesn't allow extending multiple classes, but you CAN implement multiple interfaces!

#### Abstract Class vs Interface:
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + Regular | All abstract (before Java 8) |
| Variables | Any type | Only \`public static final\` |
| Constructor | G�� Yes | G�� No |
| Multiple | G�� Can't extend multiple | G�� Can implement multiple |
| \`extends\` / \`implements\` | extends | implements |
| Usage | "IS-A" with shared code | "CAN-DO" capability |

### =��� Practice Questions
1. What is autoboxing?
2. What is the wrapper class for \`char\`?
3. What is the difference between abstract class and interface?
4. Can a class implement multiple interfaces?

=��� **Key Takeaway:** Wrappers = boxes for primitives (autoboxing/unboxing). Interfaces = contracts that classes must fulfill. A class can implement MULTIPLE interfaces!`,
    commonQuestions: [
      {
        patterns: ['wrapper class', 'what is wrapper', 'autoboxing', 'unboxing', 'Integer class'],
        answer: `## =��� Wrapper Classes G�� Gift-Wrapping Primitives!

Wrappers convert primitive types into objects (needed for ArrayList, etc.)

| Primitive | Wrapper |
|-----------|---------|
| int G�� **Integer** | char G�� **Character** |
| double G�� **Double** | boolean G�� **Boolean** |
| float G�� **Float** | byte G�� **Byte** |
| long G�� **Long** | short G�� **Short** |

\`\`\`java
// Autoboxing (auto-wrap) =���
Integer num = 42;    // int G�� Integer automatically

// Unboxing (auto-unwrap) =���
int val = num;       // Integer G�� int automatically

// Useful methods
int n = Integer.parseInt("42");     // String G�� int
String s = Integer.toString(42);    // int G�� String
\`\`\`

=��� **Why?** ArrayList<int> G�� | ArrayList<Integer> G��`
      },
      {
        patterns: ['interface', 'what is interface', 'implements', 'abstract vs interface', 'multiple interface'],
        answer: `## =��� Interface G�� A Contract!

An interface says "you MUST provide these methods" G�� like a power outlet standard.

\`\`\`java
interface Printable {
    void print();        // No body G�� just a promise
}

class Report implements Printable {
    public void print() {
        System.out.println("Printing report... =���n+�");
    }
}
\`\`\`

### Multiple Interfaces G�� (Java's multiple inheritance!)
\`\`\`java
class Duck implements Flyable, Swimmable {
    public void fly()  { System.out.println("Flying! G��n+�"); }
    public void swim() { System.out.println("Swimming! =���"); }
}
\`\`\`

### Abstract Class vs Interface:
| Abstract Class | Interface |
|---------------|-----------|
| Can have regular methods | All abstract (before Java 8) |
| Has constructors | No constructors |
| \`extends\` (single only) | \`implements\` (multiple!) |
| "IS-A" relationship | "CAN-DO" capability |`
      }
    ]
  },
  {
    topicId: 'u2t4',
    title: 'this, super & Access Control',
    keywords: ['this', 'super', 'access modifier', 'public', 'private', 'protected', 'default', 'this keyword', 'super keyword', 'constructor chaining', 'access control', 'visibility'],
    content: `## =��� this, super & Access Control

### =��� Part 1: \`this\` Keyword G�� "I'm Talking About MYSELF"

**Think of it like:** When you introduce yourself, you say "**My** name is Rahul, **my** age is 20." The word "my" refers to YOU G�� that's what \`this\` does in Java!

\`this\` refers to the **current object** G�� the object that's running the code right now.

\`\`\`java
class Student {
    String name;
    int age;
    
    // Without 'this' G�� CONFUSING! =���
    // Student(String name, int age) {
    //     name = name;  // Which 'name'? Both are the same! BUG!
    // }
    
    // With 'this' G�� CLEAR! G��
    Student(String name, int age) {
        this.name = name;  // this.name = object's name, name = parameter
        this.age = age;
    }
    
    void introduce() {
        System.out.println("I am " + this.name + ", age " + this.age);
    }
    
    // Return 'this' for method chaining!
    Student setName(String name) {
        this.name = name;
        return this;
    }
}

Student s = new Student("Rahul", 20);
s.introduce();  // "I am Rahul, age 20"
\`\`\`

#### Uses of \`this\`:
| Usage | Example | Purpose |
|-------|---------|---------|
| Distinguish variables | \`this.name = name;\` | When parameter & field have same name |
| Call another constructor | \`this(name);\` | Constructor chaining |
| Return current object | \`return this;\` | Method chaining |
| Pass current object | \`method(this);\` | Pass self as argument |

---

### =��� Part 2: \`super\` Keyword G�� "Calling My PARENT"

**Think of it like:** When a child says "**My dad** taught me this" G�� \`super\` refers to the parent class!

\`super\` is used to access **parent class members** from the child class.

\`\`\`java
class Animal {
    String type = "Animal";
    
    Animal() {
        System.out.println("Animal constructor called! =��+");
    }
    
    void sound() {
        System.out.println("Some generic sound...");
    }
}

class Dog extends Animal {
    String type = "Dog";
    
    Dog() {
        super();  // Calls PARENT constructor G�� must be FIRST line!
        System.out.println("Dog constructor called! =���");
    }
    
    void sound() {
        super.sound();  // Call parent's version first
        System.out.println("Woof Woof! =���");
    }
    
    void showTypes() {
        System.out.println("this.type = " + this.type);   // "Dog"
        System.out.println("super.type = " + super.type); // "Animal"
    }
}

Dog d = new Dog();
// Output:
// "Animal constructor called! =��+"  G�� super() ran first
// "Dog constructor called! =���"

d.sound();
// "Some generic sound..."   G�� super.sound()
// "Woof Woof! =���"           G�� Dog's own code

d.showTypes();
// "this.type = Dog"
// "super.type = Animal"
\`\`\`

#### this vs super:
| | \`this\` | \`super\` |
|---|-------|---------|
| Refers to | Current object (myself) | Parent class |
| Variable | \`this.x\` (my x) | \`super.x\` (parent's x) |
| Method | \`this.method()\` (my method) | \`super.method()\` (parent's method) |
| Constructor | \`this()\` (another constructor in same class) | \`super()\` (parent's constructor) |

---

### =��� Part 3: Access Modifiers G�� Who Can See What?

**Think of it like levels of privacy** =���:

| Modifier | Symbol | Who Can Access? | Analogy |
|----------|--------|----------------|---------|
| **public** | =��� | Everyone, everywhere | Social media post (anyone can see) |
| **protected** | =��� | Same package + child classes | Family group chat (family can see) |
| **default** (no keyword) | =��� | Same package only | Neighborhood WhatsApp group |
| **private** | =��� | Same class only | Personal diary (only you!) |

\`\`\`java
class Student {
    public String name;          // =��� Anyone can access
    protected String email;      // =��� Package + children
    String phone;                // =��� Same package only (default)
    private String password;     // =��� Only this class!
}
\`\`\`

#### Access Level Table:
| Modifier | Same Class | Same Package | Subclass | Other Package |
|----------|-----------|-------------|----------|--------------|
| public | G�� | G�� | G�� | G�� |
| protected | G�� | G�� | G�� | G�� |
| default | G�� | G�� | G�� | G�� |
| private | G�� | G�� | G�� | G�� |

**Memory trick:** Think of expanding circles:
\`\`\`
private G�� default G�� protected G�� public
=��� Most restrictive G��G��G��G��G��G��G��G��G��G��G�� =��� Most open
\`\`\`

### =��� Practice Questions
1. Why do we use \`this\`?
2. What does \`super()\` do in a constructor?
3. Arrange access modifiers from most to least restrictive.
4. Can \`private\` members be accessed by child classes?

=��� **Key Takeaway:** \`this\` = myself (current object). \`super\` = my parent. Access modifiers control visibility: private (=��� self) G�� default (=��� package) G�� protected (=��� package+children) G�� public (=��� everyone).`,
    commonQuestions: [
      {
        patterns: ['this keyword', 'what is this', 'this in java', 'this vs super'],
        answer: `## =��� this & super Keywords!

### \`this\` = "I'm talking about MYSELF"
\`\`\`java
class Student {
    String name;
    Student(String name) {
        this.name = name;  // this.name = MY name, name = parameter
    }
}
\`\`\`

### \`super\` = "Calling my PARENT"
\`\`\`java
class Dog extends Animal {
    Dog() {
        super();          // Call parent's constructor
    }
    void sound() {
        super.sound();    // Call parent's method
    }
}
\`\`\`

| | this | super |
|---|---|---|
| Refers to | Current object | Parent class |
| Constructor | \`this()\` same class | \`super()\` parent class |
| Must be | First line in constructor | First line in constructor |`
      },
      {
        patterns: ['access modifier', 'public private protected', 'access control', 'visibility'],
        answer: `## =��� Access Modifiers G�� Who Can See What?

| Modifier | Visibility | Analogy |
|----------|-----------|---------|
| **public** | Everyone =��� | Social media post |
| **protected** | Package + children =��� | Family group |
| **default** | Same package =��� | Neighborhood group |
| **private** | Same class only =��� | Personal diary |

\`\`\`
private G�� default G�� protected G�� public
=��� Most restrictive G��G��G�� =��� Most open
\`\`\`

| | Same Class | Same Package | Subclass | Other Package |
|---|---|---|---|---|
| public | G�� | G�� | G�� | G�� |
| protected | G�� | G�� | G�� | G�� |
| default | G�� | G�� | G�� | G�� |
| private | G�� | G�� | G�� | G�� |`
      }
    ]
  },
  {
    topicId: 'u2t5',
    title: 'Exception Handling',
    keywords: ['exception', 'try', 'catch', 'throw', 'throws', 'finally', 'error', 'runtime exception', 'checked', 'unchecked', 'handle', 'exception handling'],
    content: `## G��n+� Exception Handling

### =��� Story Time: The Safety Net

Imagine a circus trapeze artist =�Ĭ performing high above the ground. What's below them? A **safety net!** If they fall (error occurs), the safety net (try-catch) catches them so nothing bad happens.

**Exception = Something unexpected that goes wrong while your program is running.**

Without exception handling:
\`\`\`
Program runs G�� Error happens G�� CRASH! =��� Program dies instantly!
\`\`\`

With exception handling:
\`\`\`
Program runs G�� Error happens G�� Caught by safety net! =��� Program continues!
\`\`\`

---

### =��+ What is an Exception?

An exception is an **unexpected event** that disrupts normal program flow. Examples:
- Dividing by zero: \`10 / 0\` G�� ArithmeticException
- Array out of bounds: \`arr[10]\` when array has 5 elements G�� ArrayIndexOutOfBoundsException
- Null pointer: calling method on \`null\` G�� NullPointerException
- Wrong number format: \`Integer.parseInt("hello")\` G�� NumberFormatException

---

### =���n+� try-catch-finally G�� The Safety Net System

\`\`\`java
try {
    // =��� RISKY CODE goes here (might throw exception)
    int result = 10 / 0;       // =��� ArithmeticException!
    System.out.println(result); // This line NEVER runs
    
} catch (ArithmeticException e) {
    // =��� SAFETY NET G�� runs if that specific exception occurs
    System.out.println("Oops! Can't divide by zero! G��n+�");
    System.out.println("Error: " + e.getMessage());
    
} finally {
    // =��� ALWAYS RUNS G�� whether error happened or not!
    System.out.println("This always runs! G��");
}

System.out.println("Program continues normally! =���");
\`\`\`

**Output:**
\`\`\`
Oops! Can't divide by zero! G��n+�
Error: / by zero
This always runs! G��
Program continues normally! =���
\`\`\`

Without try-catch, the program would have CRASHED at \`10 / 0\`!

---

### =��+ Multiple Catch Blocks

\`\`\`java
try {
    int[] arr = {1, 2, 3};
    
    System.out.println(arr[5]);     // ArrayIndexOutOfBoundsException!
    int result = 10 / 0;            // ArithmeticException!
    String s = null;
    s.length();                      // NullPointerException!
    
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index wrong! =���");
    
} catch (ArithmeticException e) {
    System.out.println("Math error! =���");
    
} catch (NullPointerException e) {
    System.out.println("Null value found! =�ܽ");
    
} catch (Exception e) {
    // Catches ANY exception not caught above (parent of all)
    System.out.println("Something went wrong: " + e.getMessage());
}
\`\`\`

**Rule:** Put specific exceptions FIRST, general (\`Exception\`) LAST G�� like a filter!

---

### =��+ throw vs throws

#### \`throw\` G�� Manually throw an exception (YOU create the error)
\`\`\`java
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age can't be negative! G��");
    }
    this.age = age;
}
\`\`\`

#### \`throws\` G�� Declare that a method MIGHT throw an exception (warning label!)
\`\`\`java
// "Warning: this method might cause IOException!"
void readFile(String filename) throws IOException {
    FileReader file = new FileReader(filename);
    // If file doesn't exist G�� IOException
}

// Caller MUST handle it:
try {
    readFile("data.txt");
} catch (IOException e) {
    System.out.println("File not found! =���G��");
}
\`\`\`

#### throw vs throws:
| Feature | \`throw\` | \`throws\` |
|---------|---------|----------|
| What | Creates/throws an exception | Declares possible exceptions |
| Where | Inside method body | In method signature |
| How many | One at a time | Multiple (comma-separated) |
| **Analogy** | Actually throwing a ball =��� | Warning sign "balls may fly!" G��n+� |

---

### =��+ Custom Exceptions

\`\`\`java
// Create your OWN exception class!
class InsufficientBalanceException extends Exception {
    double amount;
    
    InsufficientBalanceException(double amount) {
        super("Cannot withdraw G�" + amount + " G�� insufficient balance!");
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
        System.out.println("Withdrawn: G�" + amount);
    }
}

// Usage:
try {
    BankAccount acc = new BankAccount();
    acc.withdraw(5000);  // Too much!
} catch (InsufficientBalanceException e) {
    System.out.println(e.getMessage());
    // "Cannot withdraw G�5000.0 G�� insufficient balance!"
}
\`\`\`

### =��� Practice Questions
1. What is the difference between try-catch and throws?
2. Does the finally block always execute?
3. What is the difference between throw and throws?
4. How do you create a custom exception?

=��� **Key Takeaway:** Exceptions are runtime errors. try = risky code, catch = handle error, finally = always runs. \`throw\` creates exceptions, \`throws\` declares them. Always catch specific exceptions first!`,
    commonQuestions: [
      {
        patterns: ['exception handling', 'try catch', 'what is exception', 'handle exception', 'throw vs throws', 'finally'],
        answer: `## G��n+� Exception Handling G�� The Safety Net!

**Exception** = Something unexpected that goes wrong while running.

### try-catch-finally:
\`\`\`java
try {
    int result = 10 / 0;        // =��� Risky code
} catch (ArithmeticException e) {
    System.out.println("Error!");  // =��� Safety net
} finally {
    System.out.println("Always runs"); // G�� Cleanup
}
\`\`\`

### throw vs throws:
| \`throw\` | \`throws\` |
|---------|----------|
| Creates an exception | Declares possible exceptions |
| Inside method body | In method signature |
| \`throw new Exception()\` | \`void m() throws IOException\` |

### Common Exceptions:
- \`ArithmeticException\` G�� divide by zero
- \`NullPointerException\` G�� null.method()
- \`ArrayIndexOutOfBoundsException\` G�� wrong index
- \`NumberFormatException\` G�� parseInt("hello")

=��� **finally** block ALWAYS runs (even if exception occurs)!`
      }
    ]
  },
  {
    topicId: 'u2t6',
    title: 'Exception Hierarchy',
    keywords: ['exception hierarchy', 'Throwable', 'Error', 'Exception', 'RuntimeException', 'checked exception', 'unchecked exception', 'ClassNotFoundException', 'IOException', 'NullPointerException', 'ArithmeticException'],
    content: `## =�� Exception Hierarchy

### =��� The Family Tree of Exceptions

Just like a family tree =��, Java's exceptions are organized in a hierarchy. At the top is the great-grandparent, and below are children and grandchildren.

\`\`\`
                    Object
                      G��
                  Throwable        G�� The great-grandparent
                 /          \\
            Error          Exception       G�� Two main branches
           (FATAL!)        (Recoverable)
              G��               G��
      OutOfMemoryError    /          \\
      StackOverflow   RuntimeException   Checked Exceptions
          etc.        (Unchecked)        (Must handle!)
                          G��                    G��
                   NullPointerEx         IOException
                   ArithmeticEx          SQLException
                   ArrayIndexEx          FileNotFoundException
                   ClassCastEx           ClassNotFoundException
\`\`\`

---

### =��+ Errors vs Exceptions

| Feature | Error | Exception |
|---------|-------|-----------|
| **Severity** | FATAL G�� program should stop =��� | Recoverable G�� can handle G�� |
| **Cause** | System/JVM problems | Programming/user mistakes |
| **Handle?** | Usually NO | YES G�� use try-catch |
| **Examples** | OutOfMemoryError, StackOverflowError | IOException, NullPointerException |
| **Analogy** | Building collapse =���n+� (can't fix) | Flat tire =��� (can change it) |

---

### =��+ Checked vs Unchecked Exceptions

#### Checked Exceptions (Compile-time) G�� "Show Your Homework!" G��
- Compiler FORCES you to handle them
- Must use try-catch or throws
- Happen due to external factors (file not found, network down)

\`\`\`java
// Checked G�� compiler says "handle this OR ELSE!"
try {
    FileReader file = new FileReader("data.txt");
} catch (FileNotFoundException e) {
    System.out.println("File not found! =���");
}
\`\`\`

#### Unchecked Exceptions (Runtime) G�� "Pop Quiz!" G��
- Compiler does NOT force you to handle them
- Happen due to programming mistakes
- Extend RuntimeException

\`\`\`java
// Unchecked G�� compiler doesn't warn you
int result = 10 / 0;   // ArithmeticException at RUNTIME!
String s = null;
s.length();              // NullPointerException at RUNTIME!
\`\`\`

#### Comparison Table:
| Feature | Checked | Unchecked |
|---------|---------|-----------|
| **When detected** | Compile time | Runtime |
| **Must handle?** | G�� YES (forced by compiler) | G�� No (optional) |
| **Parent class** | Exception | RuntimeException |
| **Cause** | External factors | Programming bugs |
| **Examples** | IOException, SQLException | NullPointerException, ArithmeticException |
| **Analogy** | Exam you KNOW about =��� (prepare!) | Surprise quiz G�� (didn't expect!) |

---

### =��� Common Exceptions You Must Know:

| Exception | When It Happens | Example |
|-----------|----------------|---------|
| \`NullPointerException\` | Using null object | \`null.toString()\` |
| \`ArithmeticException\` | Divide by zero | \`10 / 0\` |
| \`ArrayIndexOutOfBoundsException\` | Wrong array index | \`arr[100]\` on size-5 array |
| \`ClassCastException\` | Wrong type cast | \`(String) intObject\` |
| \`NumberFormatException\` | Bad stringG��number | \`parseInt("hello")\` |
| \`IOException\` | File/network error | File not found |
| \`SQLException\` | Database error | Wrong SQL query |
| \`StackOverflowError\` | Infinite recursion | Method calling itself forever |
| \`OutOfMemoryError\` | No more RAM | Creating too many objects |

### =��� Practice Questions
1. What is the difference between Error and Exception?
2. What is the difference between checked and unchecked exceptions?
3. Is NullPointerException checked or unchecked?
4. What is the parent of all exceptions?

=��� **Key Takeaway:** Throwable G�� Error (fatal) + Exception (recoverable). Exceptions G�� Checked (compiler forces handling) + Unchecked (runtime, optional). All unchecked extend RuntimeException.`,
    commonQuestions: [
      {
        patterns: ['exception hierarchy', 'checked unchecked', 'checked vs unchecked', 'error vs exception', 'types of exception'],
        answer: `## =�� Exception Hierarchy G�� The Family Tree!

\`\`\`
              Throwable
             /         \\
        Error          Exception
      (Fatal =���)       (Handle G��)
         G��            /          \\
  OutOfMemory   RuntimeException  Checked
  StackOverflow  (Unchecked)     (Must handle!)
                     G��               G��
              NullPointer       IOException
              Arithmetic        SQLException
              ArrayIndex        FileNotFound
\`\`\`

### Error vs Exception:
| Error | Exception |
|-------|-----------|
| Fatal G�� can't recover =��� | Recoverable G�� |
| OutOfMemoryError | IOException |

### Checked vs Unchecked:
| Checked | Unchecked |
|---------|-----------|
| Compiler forces handling G�� | Optional G�� |
| External causes | Programming bugs |
| IOException, SQLException | NullPointer, Arithmetic |
| Known exam =��� | Surprise quiz G�� |

=��� **Checked** = you MUST handle. **Unchecked** = your choice.`
      }
    ]
  },
  {
    topicId: 'u2t7',
    title: 'try-catch-finally & Custom Exceptions',
    keywords: ['try', 'catch', 'finally', 'custom exception', 'user-defined', 'try with resources', 'multi-catch', 'nested try', 'exception chaining', 'best practices'],
    content: `## =���n+� try-catch-finally & Custom Exceptions

### =��� Deep Dive into Exception Handling

Think of try-catch-finally like a **cooking process** =��:
- **try** = Attempting to cook (might burn the food! =���)
- **catch** = What to do if something goes wrong (order pizza instead! =���)
- **finally** = Clean up the kitchen (ALWAYS do this, success or failure! =���)

---

### =��+ try-catch-finally Flow

\`\`\`java
try {
    System.out.println("1. Starting...");       // G�� Runs
    int result = 10 / 0;                         // =��� Exception here!
    System.out.println("2. This won't run");    // G�� Skipped!
    
} catch (ArithmeticException e) {
    System.out.println("3. Caught error: " + e.getMessage());  // G�� Runs
    
} finally {
    System.out.println("4. Cleanup done!");     // G�� ALWAYS runs
}

System.out.println("5. Program continues! =���"); // G�� Runs
\`\`\`

**Output:**
\`\`\`
1. Starting...
3. Caught error: / by zero
4. Cleanup done!
5. Program continues! =���
\`\`\`

---

### =��+ Multi-catch Block
\`\`\`java
try {
    // risky code
} catch (IOException | SQLException e) {
    // Handle BOTH with one catch block!
    System.out.println("Error: " + e.getMessage());
}
\`\`\`

---

### =��+ Nested try Blocks
\`\`\`java
try {
    System.out.println("Outer try");
    
    try {
        int result = 10 / 0;        // Inner exception
    } catch (ArithmeticException e) {
        System.out.println("Inner catch: Math error");
    }
    
    String s = null;
    s.length();                       // Outer exception
    
} catch (NullPointerException e) {
    System.out.println("Outer catch: Null error");
} finally {
    System.out.println("Outer finally");
}
\`\`\`

---

### =��+ try-with-resources (Auto-close!)
\`\`\`java
// OLD way G�� must manually close!
FileReader file = null;
try {
    file = new FileReader("data.txt");
    // use file...
} catch (IOException e) {
    System.out.println("Error!");
} finally {
    if (file != null) file.close();  // Don't forget to close! =���
}

// NEW way G�� auto-closes! G��
try (FileReader file = new FileReader("data.txt")) {
    // use file...
    // file automatically closed when this block ends!
} catch (IOException e) {
    System.out.println("Error!");
}
// No finally needed! File is auto-closed! =���
\`\`\`

---

### =��+ Custom Exception Classes

When Java's built-in exceptions aren't enough, create your OWN!

\`\`\`java
// Step 1: Create custom exception (extend Exception for checked)
class AgeException extends Exception {
    int age;
    
    AgeException(int age) {
        super("Invalid age: " + age + ". Age must be 0-150! =���");
        this.age = age;
    }
}

class InvalidMarkException extends Exception {
    InvalidMarkException(int mark) {
        super("Invalid mark: " + mark + ". Must be 0-100! =���");
    }
}

// Step 2: Use custom exception
class StudentValidator {
    static void validateAge(int age) throws AgeException {
        if (age < 0 || age > 150) {
            throw new AgeException(age);
        }
        System.out.println("Age " + age + " is valid! G��");
    }
    
    static void validateMark(int mark) throws InvalidMarkException {
        if (mark < 0 || mark > 100) {
            throw new InvalidMarkException(mark);
        }
        System.out.println("Mark " + mark + " is valid! G��");
    }
}

// Step 3: Handle it
public class Main {
    public static void main(String[] args) {
        try {
            StudentValidator.validateAge(25);    // G�� Valid
            StudentValidator.validateAge(-5);    // =��� Throws AgeException!
        } catch (AgeException e) {
            System.out.println("G��n+� " + e.getMessage());
            // "G��n+� Invalid age: -5. Age must be 0-150! =���"
        }
        
        try {
            StudentValidator.validateMark(150);  // =��� Throws InvalidMarkException!
        } catch (InvalidMarkException e) {
            System.out.println("G��n+� " + e.getMessage());
            // "G��n+� Invalid mark: 150. Must be 0-100! =���"
        }
    }
}
\`\`\`

---

### =��� Exception Handling Best Practices

| Practice | Why |
|----------|-----|
| Catch specific exceptions first | More accurate error handling |
| Don't catch \`Exception\` alone | Too broad G�� hides real errors |
| Always close resources | Use try-with-resources |
| Log exceptions (don't ignore) | Empty catch = hidden bugs! |
| Use custom exceptions | Better error descriptions |
| Don't use exceptions for flow control | Slow! Use if-else instead |

### =��� Practice Questions
1. What is try-with-resources?
2. How do you create a custom exception?
3. What is the difference between multi-catch and nested try?
4. Should we catch the generic \`Exception\` class?

=��� **Key Takeaway:** try = risky code, catch = error handler, finally = always cleanup. Use try-with-resources for auto-closing. Create custom exceptions by extending Exception class. Always catch specific exceptions first!`,
    commonQuestions: [
      {
        patterns: ['try catch finally', 'finally block', 'nested try', 'try with resources', 'custom exception', 'create exception', 'user defined exception'],
        answer: `## =���n+� Exception Handling Patterns!

### Basic try-catch-finally:
\`\`\`java
try {
    // Risky code =���
} catch (ArithmeticException e) {
    // Handle error =���
} finally {
    // ALWAYS runs (cleanup!) =���
}
\`\`\`

### Multi-catch:
\`\`\`java
catch (IOException | SQLException e) { /* handle both */ }
\`\`\`

### try-with-resources (auto-close!):
\`\`\`java
try (FileReader f = new FileReader("file.txt")) {
    // f auto-closes when done! G��
}
\`\`\`

### Custom Exception:
\`\`\`java
class AgeException extends Exception {
    AgeException(String msg) { super(msg); }
}

// Throw it:
if (age < 0) throw new AgeException("Invalid age!");

// Catch it:
try { validateAge(-5); }
catch (AgeException e) { System.out.println(e.getMessage()); }
\`\`\`

=��� \`finally\` ALWAYS runs. Use try-with-resources for files/DB connections!`
      }
    ]
  },
  {
     topicId: 'u2qb',
     title: 'Unit 2 Question Bank (Parts A/B/C)',
     keywords: ['unit 2', 'question bank', 'mcq', 'short answer', 'descriptive', 'abstract class', 'interface', 'package', 'string', 'exception'],
     content: `## Unit 2 — Question Bank (Structured by Part)

### Part A — 1 Mark (MCQ) with Answers
1) Keyword to declare an abstract class?  
    - a) Abstract  b) abstract  c) abst  d) static  
    **Answer:** b — The lowercase keyword "abstract" defines an abstract class.

2) Can an abstract class have a constructor?  
    - a) Yes  b) No  c) Only if final  d) Only if static  
    **Answer:** a — Abstract classes can define constructors used by subclasses.

3) Which cannot be in an interface (Java 8)?  
    - a) abstract method  b) default method  c) static method  d) instance field  
    **Answer:** d — Interfaces cannot have instance fields (only constants).

4) Default access for classes in the same package (no modifier)?  
    - a) public  b) private  c) protected  d) package-private  
    **Answer:** d — The default is package-private.

5) Which class is immutable?  
    - a) StringBuilder  b) String  c) StringBuffer  d) char[]  
    **Answer:** b — String objects are immutable.

6) Which method compares string values (case-sensitive)?  
    - a) compare()  b) equals()  c) ==  d) match()  
    **Answer:** b — Use "equals()" for value equality.

7) What does \`static\` mean for a variable?  
    - a) Per object  b) Shared per class  c) Local only  d) Read-only  
    **Answer:** b — One shared copy for the entire class.

8) What happens if a checked exception is not handled or declared?  
    - a) Runtime crash  b) Compile-time error  c) Ignored  d) Auto-handled  
    **Answer:** b — The compiler demands handling or declaration.

9) Which block always executes (if present)?  
    - a) try  b) catch  c) finally  d) throw  
    **Answer:** c — finally runs regardless of success/failure.

10) To import all classes from java.util:  
     - a) import java.util;  b) import java.util.*;  c) import java.util.all;  d) use java.util;  
     **Answer:** b — Wildcard import uses \`*\`.

### Part B — 2 Marks (Short Answers)
1) Difference between abstract class and interface.  
    **Answer:** Abstract class can hold state, constructors, and both abstract/concrete methods; interfaces define a contract (abstract + default/static) with no instance state, and a class can implement many interfaces but extend one class.

2) Why are Strings immutable?  
    **Answer:** To ensure safety (sharing, classloading, caching), allow string interning, thread-safety, and predictable hashing.

3) How to create a custom checked exception?  
    **Answer:** Extend "Exception", add constructors, optionally fields, and throw it; callers must handle/declare.

4) What is try-with-resources?  
    **Answer:** A try form that auto-closes resources implementing Closeable/AutoCloseable, removing the need for a manual finally close.

5) Package vs import in Java.  
    **Answer:** "package" declares a class's namespace; "import" makes other packages' classes visible without full qualification.

6) When to prefer StringBuilder over String?  
    **Answer:** When performing many concatenations/mutations in a single thread for better performance and less object churn.

### Part C — 14 Marks (Descriptive/Programs)
1) Explain the life cycle of an abstract class and its subclass with code.  
    **Answer (14M):**
    An **abstract class** is a partially implemented class used to provide **common state/behavior** and a **template** for subclasses. You **cannot instantiate** an abstract class directly, but you can create objects of its **concrete subclasses**.

    #### Key points in the life cycle (creation + execution flow)
    1. **Compilation:** Abstract class compiles like any other class; it may contain abstract methods.
    2. **Inheritance:** A subclass extends the abstract class.
    3. **Instantiation:** Object creation happens only through the **subclass constructor**.
    4. **Constructor chaining:** When you create a subclass object, Java automatically calls:
       - abstract class constructor using **super()** first,
       - then subclass constructor.
    5. **Method execution:**
       - calling a method on the base reference can execute the subclass override (runtime polymorphism).

    #### Example program (abstract + concrete + override)
    \`\`\`java
    abstract class Shape {
        Shape() {
            System.out.println("Shape constructor");
        }

        // concrete method
        void info() {
            System.out.println("I am a shape");
        }

        // abstract method (must be implemented by subclass)
        abstract double area();
    }

    class Circle extends Shape {
        double r;

        Circle(double r) {
            super(); // calls Shape()
            this.r = r;
            System.out.println("Circle constructor");
        }

        @Override
        double area() {
            return 3.14159 * r * r;
        }
    }

    public class AbstractLifeCycleDemo {
        public static void main(String[] args) {
            // Shape s = new Shape(); // ERROR: cannot instantiate abstract class

            Shape s = new Circle(2.0); // base reference, subclass object
            s.info();
            System.out.println("Area = " + s.area());
        }
    }
    \`\`\`

    #### Output explanation
    - When \`new Circle(2.0)\` runs, first **Shape constructor** executes, then **Circle constructor**.
    - \`s.area()\` calls Circle\'s implementation due to **dynamic binding**.

    #### Conclusion
    Abstract class defines the **common framework**, subclass provides the **missing implementations**, and object life cycle follows **constructor chaining + runtime method dispatch**.

2) Contrast String, StringBuilder, and StringBuffer with examples.  
    **Answer (14M):**
    Java provides three common ways to work with text:
    - **String** (immutable)
    - **StringBuilder** (mutable, not synchronized)
    - **StringBuffer** (mutable, synchronized)

    #### 1) Immutability vs mutability
    - **String is immutable:** any modification creates a **new** object.
    - **Builder/Buffer are mutable:** modifications change the same object (capacity grows when needed).

    \`\`\`java
    String s = "Hello";
    s = s + " World";  // creates new String object

    StringBuilder sb = new StringBuilder("Hello");
    sb.append(" World"); // modifies same buffer
    \`\`\`

    #### 2) Thread-safety
    - **String** is safe to share because it cannot change.
    - **StringBuilder** is NOT thread-safe (fastest in single-thread).
    - **StringBuffer** is thread-safe (synchronized methods) but slower.

    #### 3) Performance (why String is slower in loops)
    If you do many concatenations in a loop, using String repeatedly creates many temporary objects.

    \`\`\`java
    // Bad for large loops
    String x = "";
    for (int i = 0; i < 10000; i++) {
        x = x + i;
    }

    // Good for large loops
    StringBuilder y = new StringBuilder();
    for (int i = 0; i < 10000; i++) {
        y.append(i);
    }
    \`\`\`

    #### 4) Comparison table
    | Feature | String | StringBuilder | StringBuffer |
    |---|---|---|---|
    | Mutable? | No | Yes | Yes |
    | Thread-safe? | Yes (immutable) | No | Yes (synchronized) |
    | Speed | Slow in heavy concat | Fast | Medium |
    | Use case | Constants, keys, messages | Single-thread building | Multi-thread shared buffer |

    #### 5) When to use what
    - Use **String** for fixed text or small concatenations.
    - Use **StringBuilder** for repeated concatenations in normal programs.
    - Use **StringBuffer** only when multiple threads modify the same text buffer.

    **Conclusion:** String = immutable + safe; Builder/Buffer = mutable; Builder is fastest, Buffer is synchronized.

3) Outline the Java exception hierarchy and checked vs unchecked handling.  
    **Answer (14M):**
    Exceptions represent abnormal situations during runtime. Java organizes them into a hierarchy under **Throwable**.

    #### 1) Exception hierarchy
    \`\`\`
    Throwable
      |-- Error (serious, usually not handled)
      |-- Exception (can be handled)
            |-- RuntimeException (unchecked)
            |-- Other Exceptions (checked)
    \`\`\`

    - **Error:** OutOfMemoryError, StackOverflowError (typically fatal)
    - **Checked Exceptions:** IOException, SQLException, ClassNotFoundException (compiler forces handling)
    - **Unchecked Exceptions:** NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException (runtime)

    #### 2) Checked vs unchecked (core difference)
    - **Checked:** must use try-catch OR declare with \`throws\`.
    - **Unchecked:** handling is optional; indicates programming bugs.

    #### 3) try-catch-finally example
    \`\`\`java
    public class ExDemo {
        public static void main(String[] args) {
            try {
                int a = 10 / 0; // ArithmeticException (unchecked)
                System.out.println(a);
            } catch (ArithmeticException e) {
                System.out.println("Cannot divide by zero");
            } finally {
                System.out.println("Finally always runs");
            }
        }
    }
    \`\`\`

    #### 4) throws + checked exception idea
    \`\`\`java
    import java.io.*;

    class FileDemo {
        static void readFile() throws IOException {
            FileReader fr = new FileReader("a.txt");
            fr.close();
        }
    }
    \`\`\`
    If \`a.txt\` is missing, IOException occurs; compiler requires handling.

    #### 5) try-with-resources
    Automatically closes resources implementing AutoCloseable.
    \`\`\`java
    try (FileReader fr = new FileReader("a.txt")) {
        // use file
    } catch (IOException e) {
        System.out.println(e.getMessage());
    }
    \`\`\`

    **Conclusion:** Throwable splits into Error and Exception. Exceptions are handled by try/catch/finally; checked exceptions are enforced by compiler, unchecked are runtime bugs.

4) Design a small program using packages and imports.  
    **Answer (14M):**
    A **package** is a namespace that organizes classes and avoids naming conflicts. \`import\` allows using classes from other packages without writing the full qualified name.

    #### 1) Package structure (concept)
    \`\`\`
    src/
      com/app/model/Person.java
      com/app/service/Greeter.java
      com/app/Main.java
    \`\`\`

    #### 2) Person.java (model package)
    \`\`\`java
    package com.app.model;

    public class Person {
        private String name;

        public Person(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
    \`\`\`

    #### 3) Greeter.java (service package)
    \`\`\`java
    package com.app.service;

    import com.app.model.Person;

    public class Greeter {
        public void greet(Person p) {
            System.out.println("Hello, " + p.getName());
        }
    }
    \`\`\`

    #### 4) Main.java (using imports)
    \`\`\`java
    package com.app;

    import com.app.model.Person;
    import com.app.service.Greeter;

    public class Main {
        public static void main(String[] args) {
            Person p = new Person("Ravi");
            Greeter g = new Greeter();
            g.greet(p);
        }
    }
    \`\`\`

    #### 5) Access modifier note
    - \`public\`: accessible everywhere
    - default (no modifier): only within same package
    - \`private\`: only within class

    **Conclusion:** Packages enforce modularity; imports improve readability; public classes can be reused across packages.

5) Write a program showing interface + multiple implementation and a class extending another class while implementing two interfaces.  
    **Answer (14M):**
    Java supports:
    - **Single inheritance** for classes (one parent class)
    - **Multiple inheritance via interfaces** (a class can implement many interfaces)

    #### 1) Define two interfaces
    \`\`\`java
    interface Printable {
        void print();
    }

    interface Scannable {
        void scan();
    }
    \`\`\`

    #### 2) Base class
    \`\`\`java
    class Device {
        void powerOn() {
            System.out.println("Device ON");
        }
    }
    \`\`\`

    #### 3) Child extends base and implements two interfaces
    \`\`\`java
    class MultiFunctionPrinter extends Device implements Printable, Scannable {
        @Override
        public void print() {
            System.out.println("Printing... ");
        }

        @Override
        public void scan() {
            System.out.println("Scanning... ");
        }
    }
    \`\`\`

    #### 4) Main program demonstrating polymorphism
    \`\`\`java
    public class InterfaceDemo {
        public static void main(String[] args) {
            MultiFunctionPrinter m = new MultiFunctionPrinter();
            m.powerOn();
            m.print();
            m.scan();

            // Interface reference
            Printable p = m;
            p.print();

            Scannable s = m;
            s.scan();

            // Base class reference
            Device d = m;
            d.powerOn();
        }
    }
    \`\`\`

    #### 5) Explanation
    - The class gets common behavior from **Device**.
    - It must implement all interface methods (print, scan).
    - Using interface references shows **runtime polymorphism** and flexible design.

    **Conclusion:** This demonstrates a class extending a base class while implementing multiple interfaces, enabling both code reuse and multiple-type behavior.
`
  }
];

export default unit2Knowledge;
