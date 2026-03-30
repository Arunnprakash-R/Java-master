// Unit 2: Java Classes - Complete Knowledge Base (Teacher-Style)
const unit2Knowledge = [
  {
    topicId: 'u2t1',
    title: 'Abstract Classes & Static Classes',
    keywords: ['abstract', 'static class', 'abstract class', 'abstract method', 'concrete', 'static method', 'static block', 'static member', 'cannot instantiate'],
    content: `## =ƒÅùn+Å Abstract Classes & Static Classes

### =ƒôû Story Time: The Blueprint and the Shared Board

Imagine you're an architect =ƒÅ¢n+Å. You draw a **blueprint** for a house GÇö it shows rooms, doors, and windows. But can you LIVE in a blueprint? **NO!** You need to actually BUILD the house first!

That's what an **abstract class** is GÇö a blueprint that other classes must "build" (implement).

Now imagine a **shared whiteboard** in your classroom =ƒôï. Every student can see the same board. Nobody has their own copy. That's what **static** means GÇö one shared copy for everyone!

---

### =ƒö+ ABSTRACT CLASSES

#### What is an Abstract Class?

An abstract class is a class that:
1. G¥î **Cannot be used to create objects directly** (can't do \`new Shape()\`)
2. G£à **Can have abstract methods** (methods with NO body GÇö just a promise)
3. G£à **Can also have regular methods** (methods WITH a body)
4. G£à **Can have constructors, variables, everything else**

**Why use it?** To force all child classes to implement certain methods while also sharing common code!

#### Real-Life Example:

Think of **"Vehicle"** =ƒÜù as an abstract concept:
- Every vehicle has a \`color\` and can \`start()\` GÇö these are COMMON 
- But HOW a vehicle \`moves()\` is DIFFERENT for each type:
  - Car moves on **4 wheels** =ƒÜù
  - Bike moves on **2 wheels** =ƒÅìn+Å
  - Boat moves on **water** G¢¦

So \`move()\` should be **abstract** GÇö each vehicle decides HOW to move!

\`\`\`java
// ABSTRACT CLASS GÇö The Blueprint (can't create objects!)
abstract class Vehicle {
    String color;
    int speed;
    
    // Constructor GÇö YES, abstract classes CAN have constructors!
    Vehicle(String color) {
        this.color = color;
    }
    
    // ABSTRACT METHOD GÇö no body! Just says WHAT to do, not HOW.
    // Every child class MUST implement this!
    abstract void move();
    
    // REGULAR METHOD GÇö has a body, shared by all children
    void start() {
        System.out.println(color + " vehicle started! =ƒöæ");
    }
    
    void stop() {
        System.out.println("Vehicle stopped! =ƒ¢æ");
    }
}

// CONCRETE CLASS GÇö The Actual Building
class Car extends Vehicle {
    Car(String color) {
        super(color);  // call parent constructor
    }
    
    @Override
    void move() {
        System.out.println(color + " car driving on 4 wheels! =ƒÜù");
    }
}

class Bike extends Vehicle {
    Bike(String color) {
        super(color);
    }
    
    @Override
    void move() {
        System.out.println(color + " bike riding on 2 wheels! =ƒÅìn+Å");
    }
}

class Boat extends Vehicle {
    Boat(String color) {
        super(color);
    }
    
    @Override
    void move() {
        System.out.println(color + " boat sailing on water! G¢¦");
    }
}

// Usage:
// Vehicle v = new Vehicle("Red");  // G¥î ERROR! Can't create abstract object!
Vehicle car = new Car("Red");       // G£à Create the actual thing
Vehicle bike = new Bike("Blue");    // G£à
Vehicle boat = new Boat("White");   // G£à

car.start();   // "Red vehicle started! =ƒöæ"
car.move();    // "Red car driving on 4 wheels! =ƒÜù"
bike.move();   // "Blue bike riding on 2 wheels! =ƒÅìn+Å"
boat.move();   // "White boat sailing on water! G¢¦"
\`\`\`

#### Rules for Abstract Classes:
| Rule | Explanation |
|------|-------------|
| Cannot create objects | \`new AbstractClass()\` GåÆ ERROR G¥î |
| Can have abstract methods | Methods without body (just declaration) |
| Can have regular methods | Methods with body (shared by children) |
| Can have constructors | Called when child class is created |
| Can have variables | Both instance and static variables |
| Child MUST implement all abstract methods | Or child must also be abstract |

---

### =ƒö+ STATIC MEMBERS

#### What does "static" mean?

**Static = belongs to the CLASS, not to individual objects.**

**Think of it like:** In your school =ƒÅ½:
- Each student has their own **name** (instance variable GÇö different for each)
- But all students share the same **school name** (static GÇö same for everyone)

\`\`\`java
class Student {
    // INSTANCE variables GÇö each student has own copy
    String name;
    int rollNo;
    
    // STATIC variable GÇö ONE shared copy for ALL students
    static String schoolName = "ABC International School";
    static int totalStudents = 0;
    
    // Constructor
    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
        totalStudents++;  // Increment the SHARED counter
    }
    
    // INSTANCE method GÇö needs an object to call
    void display() {
        System.out.println(name + " (Roll: " + rollNo + ")");
    }
    
    // STATIC method GÇö can call WITHOUT creating an object
    static void showTotalStudents() {
        System.out.println("Total students: " + totalStudents);
        // System.out.println(name);  // G¥î ERROR! Can't use instance var in static method!
    }
}

// Usage:
Student s1 = new Student("Rahul", 1);
Student s2 = new Student("Priya", 2);
Student s3 = new Student("Amit", 3);

// Static GÇö access without object!
Student.showTotalStudents();  // "Total students: 3"
System.out.println(Student.schoolName);  // "ABC International School"

// Instance GÇö need an object
s1.display();  // "Rahul (Roll: 1)"
\`\`\`

#### Static Blocks
\`\`\`java
class Config {
    static int maxUsers;
    
    // STATIC BLOCK GÇö runs ONCE when class is first loaded
    static {
        System.out.println("Loading configuration...");
        maxUsers = 100;
    }
}
// When you first use Config class, the static block runs automatically!
\`\`\`

#### Static vs Instance GÇö Quick Comparison
| Feature | Static | Instance |
|---------|--------|----------|
| Belongs to | CLASS | OBJECT |
| Copies | ONE (shared) | One per object |
| Access | \`ClassName.method()\` | \`object.method()\` |
| Memory | Loaded once | Created per object |
| Can access instance members? | G¥î No | G£à Yes |
| Can access static members? | G£à Yes | G£à Yes |

### =ƒº¬ Practice Questions
1. Can we create an object of an abstract class?
2. What happens if a child class doesn't implement all abstract methods?
3. What's the difference between static and instance variables?
4. Can a static method access instance variables?

=ƒÆí **Key Takeaway:** Abstract = blueprint (can't create objects, forces children to implement methods). Static = shared by all objects (belongs to the class, not individual objects).`,
    commonQuestions: [
      {
        patterns: ['abstract class', 'what is abstract', 'abstract method', 'why abstract'],
        answer: `## =ƒÅùn+Å Abstract Classes GÇö The Blueprint!

An abstract class is like a **blueprint** GÇö it defines WHAT should exist but can't be used directly.

\`\`\`java
abstract class Animal {
    abstract void sound();     // WHAT GÇö no body (children decide HOW)
    void breathe() {           // HOW GÇö shared by all animals
        System.out.println("Breathing...");
    }
}

class Dog extends Animal {
    void sound() { System.out.println("Woof!"); }  // Dog decides HOW
}

class Cat extends Animal {
    void sound() { System.out.println("Meow!"); }  // Cat decides HOW
}

// Animal a = new Animal();  G¥î Can't create blueprint object!
Animal d = new Dog();        G£à Create actual thing
d.sound();    // "Woof!"
d.breathe();  // "Breathing..."
\`\`\`

### Key Rules:
- G¥î Cannot create objects of abstract class
- G£à Can have abstract methods (no body) AND regular methods (with body)
- G£à Can have constructors and variables
- Child MUST implement ALL abstract methods (or also be abstract)`
      },
      {
        patterns: ['static', 'what is static', 'static method', 'static variable', 'static vs instance'],
        answer: `## =ƒôï Static GÇö Shared by Everyone!

**Static = belongs to the CLASS, not to individual objects.**

Think of your **school name** GÇö same for every student (static). But each student has their own **name** (instance).

\`\`\`java
class Student {
    String name;                              // Instance GÇö each has own
    static String school = "ABC School";      // Static GÇö shared by ALL
    static int count = 0;                     // Static GÇö one counter
    
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
| G¥î Can't access instance vars | G£à Can access everything |`
      }
    ]
  },
  {
    topicId: 'u2t2',
    title: 'Inner Classes & Packages',
    keywords: ['inner class', 'nested class', 'anonymous class', 'local class', 'static nested', 'package', 'import', 'access', 'member class', 'java.lang', 'java.util', 'java.io'],
    content: `## =ƒÄü Inner Classes & Packages

### =ƒôû Story Time: Rooms Inside a House & Neighborhoods

**Inner Classes** = Think of a **room inside a house** =ƒÅá. The room (inner class) is INSIDE the house (outer class). It can access everything in the house GÇö kitchen, bathroom, living room. But from outside, you need to enter the house first to reach the room.

**Packages** = Think of **neighborhoods** =ƒÅÿn+Å in a city. Each neighborhood groups similar houses together. "Medical Lane" has all hospitals, "School Road" has all schools. Packages group similar classes together!

---

### =ƒö+ INNER CLASSES (Class inside a Class)

#### Why use inner classes?
- When a class is only useful inside another class
- To keep related code together (better organization)
- Inner class can access ALL members of outer class (even private!)

#### Type 1: Member Inner Class (Regular Inner Class)

\`\`\`java
class School {                          // OUTER CLASS (the house =ƒÅá)
    private String schoolName = "ABC School";
    
    class Student {                      // INNER CLASS (room inside house)
        String name;
        
        Student(String name) {
            this.name = name;
        }
        
        void display() {
            // G£à Can access outer class's PRIVATE members!
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
    
    static class Department {            // STATIC GÇö no need for outer object
        void display() {
            System.out.println("Dept of " + uniName);  // Can access static only
        }
    }
}

// Simpler creation GÇö no outer object needed!
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
        System.out.println("Woof! =ƒÉò");
    }
};
myPet.sound();  // "Woof! =ƒÉò"
\`\`\`

#### Type 4: Local Inner Class (Inside a Method)
\`\`\`java
class Outer {
    void myMethod() {
        class LocalHelper {              // Only exists inside this method!
            void help() {
                System.out.println("Helping! =ƒñ¥");
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
| Member Inner | Inside class | G£à Yes | Access outer's members |
| Static Nested | Inside class (static) | G¥î No | Independent utility |
| Anonymous | Anywhere | Depends | Quick one-time use |
| Local | Inside method | GÇö | Temporary helper |

---

### =ƒôª PACKAGES (Organizing Classes)

**Think of packages like folders on your computer** =ƒôü:
\`\`\`
My Documents/
Gö£GöÇGöÇ Photos/          (java.awt GÇö GUI classes)
Gö£GöÇGöÇ Videos/          (java.io GÇö Input/Output classes)
Gö£GöÇGöÇ Music/           (java.util GÇö Utility classes)
GööGöÇGöÇ Work/            (java.lang GÇö Language basics)
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

// In another file GÇö using the package:
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
 Gåô       Gåô           Gåô         Gåô
domain  company    project    feature

Example: com.google.maps.navigation
\`\`\`

### =ƒº¬ Practice Questions
1. What are the 4 types of inner classes?
2. Can an inner class access private members of the outer class?
3. What is the difference between \`import java.util.Scanner\` and \`import java.util.*\`?
4. Which package is auto-imported in every Java program?

=ƒÆí **Key Takeaway:** Inner classes = classes inside classes (4 types). Packages = folders that organize classes. \`java.lang\` is auto-imported. Use \`import\` to use classes from other packages.`,
    commonQuestions: [
      {
        patterns: ['inner class', 'nested class', 'types of inner class', 'class inside class'],
        answer: `## =ƒÄü Inner Classes GÇö Class Inside a Class!

Like a **room inside a house** =ƒÅá GÇö the room can access everything in the house!

### 4 Types:

**1. Member Inner Class** (regular inner class):
\`\`\`java
class Outer {
    private int x = 10;
    class Inner {
        void show() { System.out.println(x); }  // G£à Access private!
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

=ƒÆí Inner classes can access outer class's private members!`
      },
      {
        patterns: ['package', 'what is package', 'import', 'java packages', 'built-in package'],
        answer: `## =ƒôª Packages GÇö Organizing Your Classes!

Packages are like **folders** =ƒôü that group related classes together.

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

=ƒÆí \`java.lang\` is the ONLY package that's automatically imported!`
      }
    ]
  },
  {
    topicId: 'u2t3',
    title: 'Wrapper Classes & Interfaces',
    keywords: ['wrapper', 'Integer', 'Double', 'Character', 'Boolean', 'autoboxing', 'unboxing', 'interface', 'implements', 'default method', 'functional interface', 'multiple inheritance'],
    content: `## =ƒÄü Wrapper Classes & Interfaces

### =ƒôû Part 1: Wrapper Classes GÇö Gift-Wrapping Primitives!

#### The Problem:
Java has two kinds of data types:
- **Primitive types:** int, double, char, boolean (simple values, fast, but limited)
- **Objects:** String, ArrayList, etc. (powerful, but heavier)

Some Java features (like ArrayList) ONLY work with objects, not primitives!

\`\`\`java
ArrayList<int> numbers;     // G¥î ERROR! ArrayList can't hold primitives!
ArrayList<Integer> numbers; // G£à WORKS! Integer is the wrapper for int
\`\`\`

**Think of it like:** You can't mail a **loose diamond** =ƒÆÄ. You need to put it in a **box** =ƒôª first. Wrapper classes are the box for primitive values!

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

**Memory trick:** All wrapper names are the FULL spelling with Capital letter! (Except: int GåÆ **Int**eger, char GåÆ **Char**acter)

#### Autoboxing & Unboxing:

\`\`\`java
// AUTOBOXING GÇö primitive GåÆ wrapper (automatic gift-wrapping! =ƒÄü)
Integer num = 42;          // int 42 auto-wrapped into Integer object
Double price = 99.99;      // double auto-wrapped into Double object

// UNBOXING GÇö wrapper GåÆ primitive (unwrapping the gift! =ƒÄüGåÆ=ƒÆÄ)
int value = num;           // Integer auto-unwrapped to int
double p = price;          // Double auto-unwrapped to double
\`\`\`

#### Useful Wrapper Methods:
\`\`\`java
// Convert String to number
int n = Integer.parseInt("42");        // String GåÆ int
double d = Double.parseDouble("3.14"); // String GåÆ double

// Convert number to String
String s = Integer.toString(42);       // int GåÆ String
String s2 = String.valueOf(99.99);     // any GåÆ String

// Get min/max values
System.out.println(Integer.MAX_VALUE); // 2147483647
System.out.println(Integer.MIN_VALUE); // -2147483648
\`\`\`

---

### =ƒôû Part 2: Interfaces GÇö The Contract!

#### What is an Interface?

**Think of it like a CONTRACT** =ƒô¥:
- When you sign a contract, you PROMISE to do certain things
- An interface is a contract that says "Any class that implements me MUST provide these methods"

**Real-life example:**
- A **power outlet** is like an interface GÇö it says "Provide 2 or 3 pins to connect"
- A phone charger, laptop charger, fan GÇö ALL follow the same outlet interface!
- They all "plug in" differently inside, but they all fit the same outlet

\`\`\`java
// INTERFACE GÇö The Contract
interface Drawable {
    void draw();          // What to do (no HOW GÇö no body!)
    double getArea();     // Another promise
}

// Classes IMPLEMENT the interface (fulfill the contract)
class Circle implements Drawable {
    double radius;
    
    Circle(double radius) { this.radius = radius; }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle G¡ò with radius " + radius);
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
        System.out.println("Drawing rectangle Gû¼ " + length + "x" + width);
    }
    
    @Override
    public double getArea() {
        return length * width;
    }
}

// Usage:
Drawable shape1 = new Circle(5);
Drawable shape2 = new Rectangle(4, 6);

shape1.draw();  // "Drawing circle G¡ò with radius 5"
shape2.draw();  // "Drawing rectangle Gû¼ 4x6"
\`\`\`

#### Multiple Interfaces (Java's answer to multiple inheritance!):
\`\`\`java
interface Flyable { void fly(); }
interface Swimmable { void swim(); }

class Duck implements Flyable, Swimmable {  // Implements BOTH!
    public void fly()  { System.out.println("Duck flying! =ƒªåG£ên+Å"); }
    public void swim() { System.out.println("Duck swimming! =ƒªå=ƒÅè"); }
}
\`\`\`

Java doesn't allow extending multiple classes, but you CAN implement multiple interfaces!

#### Abstract Class vs Interface:
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Abstract + Regular | All abstract (before Java 8) |
| Variables | Any type | Only \`public static final\` |
| Constructor | G£à Yes | G¥î No |
| Multiple | G¥î Can't extend multiple | G£à Can implement multiple |
| \`extends\` / \`implements\` | extends | implements |
| Usage | "IS-A" with shared code | "CAN-DO" capability |

### =ƒº¬ Practice Questions
1. What is autoboxing?
2. What is the wrapper class for \`char\`?
3. What is the difference between abstract class and interface?
4. Can a class implement multiple interfaces?

=ƒÆí **Key Takeaway:** Wrappers = boxes for primitives (autoboxing/unboxing). Interfaces = contracts that classes must fulfill. A class can implement MULTIPLE interfaces!`,
    commonQuestions: [
      {
        patterns: ['wrapper class', 'what is wrapper', 'autoboxing', 'unboxing', 'Integer class'],
        answer: `## =ƒÄü Wrapper Classes GÇö Gift-Wrapping Primitives!

Wrappers convert primitive types into objects (needed for ArrayList, etc.)

| Primitive | Wrapper |
|-----------|---------|
| int GåÆ **Integer** | char GåÆ **Character** |
| double GåÆ **Double** | boolean GåÆ **Boolean** |
| float GåÆ **Float** | byte GåÆ **Byte** |
| long GåÆ **Long** | short GåÆ **Short** |

\`\`\`java
// Autoboxing (auto-wrap) =ƒÄü
Integer num = 42;    // int GåÆ Integer automatically

// Unboxing (auto-unwrap) =ƒÆÄ
int val = num;       // Integer GåÆ int automatically

// Useful methods
int n = Integer.parseInt("42");     // String GåÆ int
String s = Integer.toString(42);    // int GåÆ String
\`\`\`

=ƒÆí **Why?** ArrayList<int> G¥î | ArrayList<Integer> G£à`
      },
      {
        patterns: ['interface', 'what is interface', 'implements', 'abstract vs interface', 'multiple interface'],
        answer: `## =ƒô¥ Interface GÇö A Contract!

An interface says "you MUST provide these methods" GÇö like a power outlet standard.

\`\`\`java
interface Printable {
    void print();        // No body GÇö just a promise
}

class Report implements Printable {
    public void print() {
        System.out.println("Printing report... =ƒû¿n+Å");
    }
}
\`\`\`

### Multiple Interfaces G£à (Java's multiple inheritance!)
\`\`\`java
class Duck implements Flyable, Swimmable {
    public void fly()  { System.out.println("Flying! G£ên+Å"); }
    public void swim() { System.out.println("Swimming! =ƒÅè"); }
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
    content: `## =ƒöæ this, super & Access Control

### =ƒôû Part 1: \`this\` Keyword GÇö "I'm Talking About MYSELF"

**Think of it like:** When you introduce yourself, you say "**My** name is Rahul, **my** age is 20." The word "my" refers to YOU GÇö that's what \`this\` does in Java!

\`this\` refers to the **current object** GÇö the object that's running the code right now.

\`\`\`java
class Student {
    String name;
    int age;
    
    // Without 'this' GÇö CONFUSING! =ƒÿò
    // Student(String name, int age) {
    //     name = name;  // Which 'name'? Both are the same! BUG!
    // }
    
    // With 'this' GÇö CLEAR! G£à
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

### =ƒôû Part 2: \`super\` Keyword GÇö "Calling My PARENT"

**Think of it like:** When a child says "**My dad** taught me this" GÇö \`super\` refers to the parent class!

\`super\` is used to access **parent class members** from the child class.

\`\`\`java
class Animal {
    String type = "Animal";
    
    Animal() {
        System.out.println("Animal constructor called! =ƒÉ+");
    }
    
    void sound() {
        System.out.println("Some generic sound...");
    }
}

class Dog extends Animal {
    String type = "Dog";
    
    Dog() {
        super();  // Calls PARENT constructor GÇö must be FIRST line!
        System.out.println("Dog constructor called! =ƒÉò");
    }
    
    void sound() {
        super.sound();  // Call parent's version first
        System.out.println("Woof Woof! =ƒÉò");
    }
    
    void showTypes() {
        System.out.println("this.type = " + this.type);   // "Dog"
        System.out.println("super.type = " + super.type); // "Animal"
    }
}

Dog d = new Dog();
// Output:
// "Animal constructor called! =ƒÉ+"  GåÉ super() ran first
// "Dog constructor called! =ƒÉò"

d.sound();
// "Some generic sound..."   GåÉ super.sound()
// "Woof Woof! =ƒÉò"           GåÉ Dog's own code

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

### =ƒôû Part 3: Access Modifiers GÇö Who Can See What?

**Think of it like levels of privacy** =ƒöÉ:

| Modifier | Symbol | Who Can Access? | Analogy |
|----------|--------|----------------|---------|
| **public** | =ƒîì | Everyone, everywhere | Social media post (anyone can see) |
| **protected** | =ƒÅá | Same package + child classes | Family group chat (family can see) |
| **default** (no keyword) | =ƒôª | Same package only | Neighborhood WhatsApp group |
| **private** | =ƒöÆ | Same class only | Personal diary (only you!) |

\`\`\`java
class Student {
    public String name;          // =ƒîì Anyone can access
    protected String email;      // =ƒÅá Package + children
    String phone;                // =ƒôª Same package only (default)
    private String password;     // =ƒöÆ Only this class!
}
\`\`\`

#### Access Level Table:
| Modifier | Same Class | Same Package | Subclass | Other Package |
|----------|-----------|-------------|----------|--------------|
| public | G£à | G£à | G£à | G£à |
| protected | G£à | G£à | G£à | G¥î |
| default | G£à | G£à | G¥î | G¥î |
| private | G£à | G¥î | G¥î | G¥î |

**Memory trick:** Think of expanding circles:
\`\`\`
private GåÆ default GåÆ protected GåÆ public
=ƒöÆ Most restrictive GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGåÆ =ƒîì Most open
\`\`\`

### =ƒº¬ Practice Questions
1. Why do we use \`this\`?
2. What does \`super()\` do in a constructor?
3. Arrange access modifiers from most to least restrictive.
4. Can \`private\` members be accessed by child classes?

=ƒÆí **Key Takeaway:** \`this\` = myself (current object). \`super\` = my parent. Access modifiers control visibility: private (=ƒöÆ self) GåÆ default (=ƒôª package) GåÆ protected (=ƒÅá package+children) GåÆ public (=ƒîì everyone).`,
    commonQuestions: [
      {
        patterns: ['this keyword', 'what is this', 'this in java', 'this vs super'],
        answer: `## =ƒöæ this & super Keywords!

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
        answer: `## =ƒöÉ Access Modifiers GÇö Who Can See What?

| Modifier | Visibility | Analogy |
|----------|-----------|---------|
| **public** | Everyone =ƒîì | Social media post |
| **protected** | Package + children =ƒÅá | Family group |
| **default** | Same package =ƒôª | Neighborhood group |
| **private** | Same class only =ƒöÆ | Personal diary |

\`\`\`
private GåÆ default GåÆ protected GåÆ public
=ƒöÆ Most restrictive GöÇGöÇGåÆ =ƒîì Most open
\`\`\`

| | Same Class | Same Package | Subclass | Other Package |
|---|---|---|---|---|
| public | G£à | G£à | G£à | G£à |
| protected | G£à | G£à | G£à | G¥î |
| default | G£à | G£à | G¥î | G¥î |
| private | G£à | G¥î | G¥î | G¥î |`
      }
    ]
  },
  {
    topicId: 'u2t5',
    title: 'Exception Handling',
    keywords: ['exception', 'try', 'catch', 'throw', 'throws', 'finally', 'error', 'runtime exception', 'checked', 'unchecked', 'handle', 'exception handling'],
    content: `## GÜán+Å Exception Handling

### =ƒôû Story Time: The Safety Net

Imagine a circus trapeze artist =ƒÄ¬ performing high above the ground. What's below them? A **safety net!** If they fall (error occurs), the safety net (try-catch) catches them so nothing bad happens.

**Exception = Something unexpected that goes wrong while your program is running.**

Without exception handling:
\`\`\`
Program runs GåÆ Error happens GåÆ CRASH! =ƒÆÑ Program dies instantly!
\`\`\`

With exception handling:
\`\`\`
Program runs GåÆ Error happens GåÆ Caught by safety net! =ƒÑà Program continues!
\`\`\`

---

### =ƒö+ What is an Exception?

An exception is an **unexpected event** that disrupts normal program flow. Examples:
- Dividing by zero: \`10 / 0\` GåÆ ArithmeticException
- Array out of bounds: \`arr[10]\` when array has 5 elements GåÆ ArrayIndexOutOfBoundsException
- Null pointer: calling method on \`null\` GåÆ NullPointerException
- Wrong number format: \`Integer.parseInt("hello")\` GåÆ NumberFormatException

---

### =ƒ¢ín+Å try-catch-finally GÇö The Safety Net System

\`\`\`java
try {
    // =ƒæå RISKY CODE goes here (might throw exception)
    int result = 10 / 0;       // =ƒÆÑ ArithmeticException!
    System.out.println(result); // This line NEVER runs
    
} catch (ArithmeticException e) {
    // =ƒæå SAFETY NET GÇö runs if that specific exception occurs
    System.out.println("Oops! Can't divide by zero! GÜán+Å");
    System.out.println("Error: " + e.getMessage());
    
} finally {
    // =ƒæå ALWAYS RUNS GÇö whether error happened or not!
    System.out.println("This always runs! G£à");
}

System.out.println("Program continues normally! =ƒÄë");
\`\`\`

**Output:**
\`\`\`
Oops! Can't divide by zero! GÜán+Å
Error: / by zero
This always runs! G£à
Program continues normally! =ƒÄë
\`\`\`

Without try-catch, the program would have CRASHED at \`10 / 0\`!

---

### =ƒö+ Multiple Catch Blocks

\`\`\`java
try {
    int[] arr = {1, 2, 3};
    
    System.out.println(arr[5]);     // ArrayIndexOutOfBoundsException!
    int result = 10 / 0;            // ArithmeticException!
    String s = null;
    s.length();                      // NullPointerException!
    
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index wrong! =ƒôè");
    
} catch (ArithmeticException e) {
    System.out.println("Math error! =ƒöó");
    
} catch (NullPointerException e) {
    System.out.println("Null value found! =ƒÜ½");
    
} catch (Exception e) {
    // Catches ANY exception not caught above (parent of all)
    System.out.println("Something went wrong: " + e.getMessage());
}
\`\`\`

**Rule:** Put specific exceptions FIRST, general (\`Exception\`) LAST GÇö like a filter!

---

### =ƒö+ throw vs throws

#### \`throw\` GÇö Manually throw an exception (YOU create the error)
\`\`\`java
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age can't be negative! G¥î");
    }
    this.age = age;
}
\`\`\`

#### \`throws\` GÇö Declare that a method MIGHT throw an exception (warning label!)
\`\`\`java
// "Warning: this method might cause IOException!"
void readFile(String filename) throws IOException {
    FileReader file = new FileReader(filename);
    // If file doesn't exist GåÆ IOException
}

// Caller MUST handle it:
try {
    readFile("data.txt");
} catch (IOException e) {
    System.out.println("File not found! =ƒôüG¥î");
}
\`\`\`

#### throw vs throws:
| Feature | \`throw\` | \`throws\` |
|---------|---------|----------|
| What | Creates/throws an exception | Declares possible exceptions |
| Where | Inside method body | In method signature |
| How many | One at a time | Multiple (comma-separated) |
| **Analogy** | Actually throwing a ball =ƒÅÉ | Warning sign "balls may fly!" GÜán+Å |

---

### =ƒö+ Custom Exceptions

\`\`\`java
// Create your OWN exception class!
class InsufficientBalanceException extends Exception {
    double amount;
    
    InsufficientBalanceException(double amount) {
        super("Cannot withdraw Gé¦" + amount + " GÇö insufficient balance!");
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
        System.out.println("Withdrawn: Gé¦" + amount);
    }
}

// Usage:
try {
    BankAccount acc = new BankAccount();
    acc.withdraw(5000);  // Too much!
} catch (InsufficientBalanceException e) {
    System.out.println(e.getMessage());
    // "Cannot withdraw Gé¦5000.0 GÇö insufficient balance!"
}
\`\`\`

### =ƒº¬ Practice Questions
1. What is the difference between try-catch and throws?
2. Does the finally block always execute?
3. What is the difference between throw and throws?
4. How do you create a custom exception?

=ƒÆí **Key Takeaway:** Exceptions are runtime errors. try = risky code, catch = handle error, finally = always runs. \`throw\` creates exceptions, \`throws\` declares them. Always catch specific exceptions first!`,
    commonQuestions: [
      {
        patterns: ['exception handling', 'try catch', 'what is exception', 'handle exception', 'throw vs throws', 'finally'],
        answer: `## GÜán+Å Exception Handling GÇö The Safety Net!

**Exception** = Something unexpected that goes wrong while running.

### try-catch-finally:
\`\`\`java
try {
    int result = 10 / 0;        // =ƒÆÑ Risky code
} catch (ArithmeticException e) {
    System.out.println("Error!");  // =ƒÑà Safety net
} finally {
    System.out.println("Always runs"); // G£à Cleanup
}
\`\`\`

### throw vs throws:
| \`throw\` | \`throws\` |
|---------|----------|
| Creates an exception | Declares possible exceptions |
| Inside method body | In method signature |
| \`throw new Exception()\` | \`void m() throws IOException\` |

### Common Exceptions:
- \`ArithmeticException\` GÇö divide by zero
- \`NullPointerException\` GÇö null.method()
- \`ArrayIndexOutOfBoundsException\` GÇö wrong index
- \`NumberFormatException\` GÇö parseInt("hello")

=ƒÆí **finally** block ALWAYS runs (even if exception occurs)!`
      }
    ]
  },
  {
    topicId: 'u2t6',
    title: 'Exception Hierarchy',
    keywords: ['exception hierarchy', 'Throwable', 'Error', 'Exception', 'RuntimeException', 'checked exception', 'unchecked exception', 'ClassNotFoundException', 'IOException', 'NullPointerException', 'ArithmeticException'],
    content: `## =ƒî¦ Exception Hierarchy

### =ƒôû The Family Tree of Exceptions

Just like a family tree =ƒî¦, Java's exceptions are organized in a hierarchy. At the top is the great-grandparent, and below are children and grandchildren.

\`\`\`
                    Object
                      Göé
                  Throwable        GåÉ The great-grandparent
                 /          \\
            Error          Exception       GåÉ Two main branches
           (FATAL!)        (Recoverable)
              Göé               Göé
      OutOfMemoryError    /          \\
      StackOverflow   RuntimeException   Checked Exceptions
          etc.        (Unchecked)        (Must handle!)
                          Göé                    Göé
                   NullPointerEx         IOException
                   ArithmeticEx          SQLException
                   ArrayIndexEx          FileNotFoundException
                   ClassCastEx           ClassNotFoundException
\`\`\`

---

### =ƒö+ Errors vs Exceptions

| Feature | Error | Exception |
|---------|-------|-----------|
| **Severity** | FATAL GÇö program should stop =ƒÆÇ | Recoverable GÇö can handle G£à |
| **Cause** | System/JVM problems | Programming/user mistakes |
| **Handle?** | Usually NO | YES GÇö use try-catch |
| **Examples** | OutOfMemoryError, StackOverflowError | IOException, NullPointerException |
| **Analogy** | Building collapse =ƒÅÜn+Å (can't fix) | Flat tire =ƒÜù (can change it) |

---

### =ƒö+ Checked vs Unchecked Exceptions

#### Checked Exceptions (Compile-time) GÇö "Show Your Homework!" G£à
- Compiler FORCES you to handle them
- Must use try-catch or throws
- Happen due to external factors (file not found, network down)

\`\`\`java
// Checked GÇö compiler says "handle this OR ELSE!"
try {
    FileReader file = new FileReader("data.txt");
} catch (FileNotFoundException e) {
    System.out.println("File not found! =ƒôü");
}
\`\`\`

#### Unchecked Exceptions (Runtime) GÇö "Pop Quiz!" G¥ô
- Compiler does NOT force you to handle them
- Happen due to programming mistakes
- Extend RuntimeException

\`\`\`java
// Unchecked GÇö compiler doesn't warn you
int result = 10 / 0;   // ArithmeticException at RUNTIME!
String s = null;
s.length();              // NullPointerException at RUNTIME!
\`\`\`

#### Comparison Table:
| Feature | Checked | Unchecked |
|---------|---------|-----------|
| **When detected** | Compile time | Runtime |
| **Must handle?** | G£à YES (forced by compiler) | G¥î No (optional) |
| **Parent class** | Exception | RuntimeException |
| **Cause** | External factors | Programming bugs |
| **Examples** | IOException, SQLException | NullPointerException, ArithmeticException |
| **Analogy** | Exam you KNOW about =ƒô¥ (prepare!) | Surprise quiz G¥ô (didn't expect!) |

---

### =ƒôï Common Exceptions You Must Know:

| Exception | When It Happens | Example |
|-----------|----------------|---------|
| \`NullPointerException\` | Using null object | \`null.toString()\` |
| \`ArithmeticException\` | Divide by zero | \`10 / 0\` |
| \`ArrayIndexOutOfBoundsException\` | Wrong array index | \`arr[100]\` on size-5 array |
| \`ClassCastException\` | Wrong type cast | \`(String) intObject\` |
| \`NumberFormatException\` | Bad stringGåÆnumber | \`parseInt("hello")\` |
| \`IOException\` | File/network error | File not found |
| \`SQLException\` | Database error | Wrong SQL query |
| \`StackOverflowError\` | Infinite recursion | Method calling itself forever |
| \`OutOfMemoryError\` | No more RAM | Creating too many objects |

### =ƒº¬ Practice Questions
1. What is the difference between Error and Exception?
2. What is the difference between checked and unchecked exceptions?
3. Is NullPointerException checked or unchecked?
4. What is the parent of all exceptions?

=ƒÆí **Key Takeaway:** Throwable GåÆ Error (fatal) + Exception (recoverable). Exceptions GåÆ Checked (compiler forces handling) + Unchecked (runtime, optional). All unchecked extend RuntimeException.`,
    commonQuestions: [
      {
        patterns: ['exception hierarchy', 'checked unchecked', 'checked vs unchecked', 'error vs exception', 'types of exception'],
        answer: `## =ƒî¦ Exception Hierarchy GÇö The Family Tree!

\`\`\`
              Throwable
             /         \\
        Error          Exception
      (Fatal =ƒÆÇ)       (Handle G£à)
         Göé            /          \\
  OutOfMemory   RuntimeException  Checked
  StackOverflow  (Unchecked)     (Must handle!)
                     Göé               Göé
              NullPointer       IOException
              Arithmetic        SQLException
              ArrayIndex        FileNotFound
\`\`\`

### Error vs Exception:
| Error | Exception |
|-------|-----------|
| Fatal GÇö can't recover =ƒÆÇ | Recoverable G£à |
| OutOfMemoryError | IOException |

### Checked vs Unchecked:
| Checked | Unchecked |
|---------|-----------|
| Compiler forces handling G£à | Optional G¥ô |
| External causes | Programming bugs |
| IOException, SQLException | NullPointer, Arithmetic |
| Known exam =ƒô¥ | Surprise quiz G¥ô |

=ƒÆí **Checked** = you MUST handle. **Unchecked** = your choice.`
      }
    ]
  },
  {
    topicId: 'u2t7',
    title: 'try-catch-finally & Custom Exceptions',
    keywords: ['try', 'catch', 'finally', 'custom exception', 'user-defined', 'try with resources', 'multi-catch', 'nested try', 'exception chaining', 'best practices'],
    content: `## =ƒ¢ín+Å try-catch-finally & Custom Exceptions

### =ƒôû Deep Dive into Exception Handling

Think of try-catch-finally like a **cooking process** =ƒì¦:
- **try** = Attempting to cook (might burn the food! =ƒöÑ)
- **catch** = What to do if something goes wrong (order pizza instead! =ƒìò)
- **finally** = Clean up the kitchen (ALWAYS do this, success or failure! =ƒº¦)

---

### =ƒö+ try-catch-finally Flow

\`\`\`java
try {
    System.out.println("1. Starting...");       // G£à Runs
    int result = 10 / 0;                         // =ƒÆÑ Exception here!
    System.out.println("2. This won't run");    // G¥î Skipped!
    
} catch (ArithmeticException e) {
    System.out.println("3. Caught error: " + e.getMessage());  // G£à Runs
    
} finally {
    System.out.println("4. Cleanup done!");     // G£à ALWAYS runs
}

System.out.println("5. Program continues! =ƒÄë"); // G£à Runs
\`\`\`

**Output:**
\`\`\`
1. Starting...
3. Caught error: / by zero
4. Cleanup done!
5. Program continues! =ƒÄë
\`\`\`

---

### =ƒö+ Multi-catch Block
\`\`\`java
try {
    // risky code
} catch (IOException | SQLException e) {
    // Handle BOTH with one catch block!
    System.out.println("Error: " + e.getMessage());
}
\`\`\`

---

### =ƒö+ Nested try Blocks
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

### =ƒö+ try-with-resources (Auto-close!)
\`\`\`java
// OLD way GÇö must manually close!
FileReader file = null;
try {
    file = new FileReader("data.txt");
    // use file...
} catch (IOException e) {
    System.out.println("Error!");
} finally {
    if (file != null) file.close();  // Don't forget to close! =ƒÿ¦
}

// NEW way GÇö auto-closes! G£¿
try (FileReader file = new FileReader("data.txt")) {
    // use file...
    // file automatically closed when this block ends!
} catch (IOException e) {
    System.out.println("Error!");
}
// No finally needed! File is auto-closed! =ƒÄë
\`\`\`

---

### =ƒö+ Custom Exception Classes

When Java's built-in exceptions aren't enough, create your OWN!

\`\`\`java
// Step 1: Create custom exception (extend Exception for checked)
class AgeException extends Exception {
    int age;
    
    AgeException(int age) {
        super("Invalid age: " + age + ". Age must be 0-150! =ƒôà");
        this.age = age;
    }
}

class InvalidMarkException extends Exception {
    InvalidMarkException(int mark) {
        super("Invalid mark: " + mark + ". Must be 0-100! =ƒôè");
    }
}

// Step 2: Use custom exception
class StudentValidator {
    static void validateAge(int age) throws AgeException {
        if (age < 0 || age > 150) {
            throw new AgeException(age);
        }
        System.out.println("Age " + age + " is valid! G£à");
    }
    
    static void validateMark(int mark) throws InvalidMarkException {
        if (mark < 0 || mark > 100) {
            throw new InvalidMarkException(mark);
        }
        System.out.println("Mark " + mark + " is valid! G£à");
    }
}

// Step 3: Handle it
public class Main {
    public static void main(String[] args) {
        try {
            StudentValidator.validateAge(25);    // G£à Valid
            StudentValidator.validateAge(-5);    // =ƒÆÑ Throws AgeException!
        } catch (AgeException e) {
            System.out.println("GÜán+Å " + e.getMessage());
            // "GÜán+Å Invalid age: -5. Age must be 0-150! =ƒôà"
        }
        
        try {
            StudentValidator.validateMark(150);  // =ƒÆÑ Throws InvalidMarkException!
        } catch (InvalidMarkException e) {
            System.out.println("GÜán+Å " + e.getMessage());
            // "GÜán+Å Invalid mark: 150. Must be 0-100! =ƒôè"
        }
    }
}
\`\`\`

---

### =ƒôï Exception Handling Best Practices

| Practice | Why |
|----------|-----|
| Catch specific exceptions first | More accurate error handling |
| Don't catch \`Exception\` alone | Too broad GÇö hides real errors |
| Always close resources | Use try-with-resources |
| Log exceptions (don't ignore) | Empty catch = hidden bugs! |
| Use custom exceptions | Better error descriptions |
| Don't use exceptions for flow control | Slow! Use if-else instead |

### =ƒº¬ Practice Questions
1. What is try-with-resources?
2. How do you create a custom exception?
3. What is the difference between multi-catch and nested try?
4. Should we catch the generic \`Exception\` class?

=ƒÆí **Key Takeaway:** try = risky code, catch = error handler, finally = always cleanup. Use try-with-resources for auto-closing. Create custom exceptions by extending Exception class. Always catch specific exceptions first!`,
    commonQuestions: [
      {
        patterns: ['try catch finally', 'finally block', 'nested try', 'try with resources', 'custom exception', 'create exception', 'user defined exception'],
        answer: `## =ƒ¢ín+Å Exception Handling Patterns!

### Basic try-catch-finally:
\`\`\`java
try {
    // Risky code =ƒöÑ
} catch (ArithmeticException e) {
    // Handle error =ƒÑà
} finally {
    // ALWAYS runs (cleanup!) =ƒº¦
}
\`\`\`

### Multi-catch:
\`\`\`java
catch (IOException | SQLException e) { /* handle both */ }
\`\`\`

### try-with-resources (auto-close!):
\`\`\`java
try (FileReader f = new FileReader("file.txt")) {
    // f auto-closes when done! G£¿
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

=ƒÆí \`finally\` ALWAYS runs. Use try-with-resources for files/DB connections!`
      }
    ]
  }
];

export default unit2Knowledge;
