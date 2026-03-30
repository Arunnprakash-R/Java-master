// Unit 3: I/O Streams & Multithreading - Complete Knowledge Base (Teacher-Style)
const unit3Knowledge = [
  {
    topicId: 'u3t1',
    title: 'I/O Streams in Java',
    keywords: ['stream', 'input', 'output', 'InputStream', 'OutputStream', 'Reader', 'Writer', 'FileInputStream', 'FileOutputStream', 'FileReader', 'FileWriter', 'BufferedReader', 'byte stream', 'character stream', 'io'],
    content: `## =ƒôü I/O Streams in Java

### =ƒôû Story Time: The Water Pipeline

Imagine a **water pipeline** =ƒÜ¦ connecting a lake to your house:
- **Input stream** = Water flowing FROM the lake INTO your house (reading data)
- **Output stream** = Water flowing FROM your house TO the garden (writing data)

In Java, **streams** are channels that carry data between your program and the outside world (files, keyboard, network, etc.)

---

### =ƒö+ Two Types of Streams

#### 1. Byte Streams (for ALL data GÇö images, videos, binary files)
- Handle data as **raw bytes** (0s and 1s)
- Classes: \`InputStream\`, \`OutputStream\` and their children

#### 2. Character Streams (for TEXT data GÇö .txt, .csv, .html)
- Handle data as **characters** (letters, numbers, symbols)
- Classes: \`Reader\`, \`Writer\` and their children

\`\`\`
                    Stream Types
                   /            \\
          Byte Stream        Character Stream
         (raw data)           (text data)
         /        \\           /          \\
  InputStream  OutputStream  Reader    Writer
       Göé            Göé          Göé         Göé
  FileInput    FileOutput  FileReader FileWriter
  Stream       Stream           Göé         Göé
       Göé            Göé      BufferedReader  BufferedWriter
  BufferedInput BufferedOutput
  Stream       Stream
\`\`\`

---

### =ƒö+ Byte Streams GÇö Reading & Writing Bytes

\`\`\`java
import java.io.*;

// WRITING bytes to a file
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String text = "Hello, Java! =ƒîƒ";
    fos.write(text.getBytes());     // Convert string GåÆ bytes GåÆ write
    System.out.println("Written successfully! G£à");
}

// READING bytes from a file
try (FileInputStream fis = new FileInputStream("output.txt")) {
    int data;
    while ((data = fis.read()) != -1) {  // -1 means end of file
        System.out.print((char) data);    // Convert byte GåÆ char GåÆ print
    }
}
\`\`\`

---

### =ƒö+ Character Streams GÇö Reading & Writing Text

\`\`\`java
// WRITING text to a file
try (FileWriter fw = new FileWriter("story.txt")) {
    fw.write("Once upon a time...\\n");
    fw.write("There was a Java programmer.\\n");
    fw.write("The End! =ƒÄë");
    System.out.println("Story written! G£à");
}

// READING text from a file
try (FileReader fr = new FileReader("story.txt")) {
    int ch;
    while ((ch = fr.read()) != -1) {
        System.out.print((char) ch);
    }
}
\`\`\`

---

### =ƒö+ Buffered Streams (FAST reading/writing!)

**Think of it like:** Instead of carrying water one glass at a time (slow! =ƒÑ¢), use a **bucket** (buffer) to carry many glasses at once! =ƒ¬ú

\`\`\`java
// BUFFERED READER GÇö reads line by line (most common!)
try (BufferedReader br = new BufferedReader(new FileReader("story.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// BUFFERED WRITER GÇö writes with buffer
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Fast writing with buffer! =ƒÜÇ");
    bw.newLine();  // Add a new line
    bw.write("Line 2");
}

// READING from keyboard (Scanner alternative!)
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
System.out.print("Enter your name: ");
String name = br.readLine();
System.out.println("Hello, " + name + "! =ƒæï");
\`\`\`

---

### =ƒôè Byte vs Character Streams:

| Feature | Byte Stream | Character Stream |
|---------|------------|-----------------|
| **Unit** | Byte (8 bits) | Character (16 bits Unicode) |
| **Best for** | Images, audio, video, any file | Text files only |
| **Parent classes** | InputStream, OutputStream | Reader, Writer |
| **Example** | FileInputStream, FileOutputStream | FileReader, FileWriter |
| **Analogy** | Raw water pipe =ƒÜ¦ | Filtered drinking water =ƒÑñ |

### =ƒº¬ Practice Questions
1. What is the difference between byte stream and character stream?
2. Why are buffered streams faster?
3. What does \`-1\` mean when reading from a stream?
4. Write code to read a file line by line.

=ƒÆí **Key Takeaway:** Streams carry data like water in pipes. Byte streams handle ANY data, character streams handle TEXT. Use buffered streams for speed. Always close streams using try-with-resources!`,
    commonQuestions: [
      {
        patterns: ['io stream', 'input output stream', 'byte stream', 'character stream', 'file reading', 'file writing', 'streams in java'],
        answer: `## =ƒôü I/O Streams GÇö Data Pipelines!

Streams carry data between your program and files/keyboard/network.

### Two Types:
| Byte Stream | Character Stream |
|-------------|-----------------|
| Raw bytes (any file) | Characters (text files) |
| InputStream/OutputStream | Reader/Writer |
| FileInputStream | FileReader |

### Most Common GÇö BufferedReader:
\`\`\`java
// Read file line by line
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// Write to file
try (FileWriter fw = new FileWriter("file.txt")) {
    fw.write("Hello Java! =ƒîƒ");
}
\`\`\`

=ƒÆí Use **buffered** streams = faster (reads in chunks, not one byte at a time)!`
      }
    ]
  },
  {
    topicId: 'u3t2',
    title: 'Serialization & Deserialization',
    keywords: ['serialization', 'deserialization', 'Serializable', 'ObjectInputStream', 'ObjectOutputStream', 'transient', 'serialVersionUID', 'object stream', 'persist'],
    content: `## =ƒÆ+ Serialization & Deserialization

### =ƒôû Story Time: Freeze-Drying Your Object! =ƒºè

Imagine you make a delicious sandwich =ƒÑ¬. You want to save it for tomorrow. So you **freeze** it (serialization). Tomorrow, you **thaw** it and eat it (deserialization).

In Java:
- **Serialization** = Converting an object into bytes (freezing =ƒºè) GåÆ Save to file or send over network
- **Deserialization** = Converting bytes back into an object (thawing =ƒöÑ) GåÆ Restore the object

\`\`\`
  Object in Memory          GåÆ    Byte Stream (file/network)    GåÆ    Object in Memory
  Student{name="Rahul"}     GåÆ    [bytes: 01001001...]          GåÆ    Student{name="Rahul"}
       SERIALIZE =ƒºè                                                  DESERIALIZE =ƒöÑ
\`\`\`

---

### =ƒö+ How to Serialize

**Step 1:** Implement \`Serializable\` interface (tell Java "this object CAN be frozen")

\`\`\`java
import java.io.*;

// Step 1: Mark the class as Serializable
class Student implements Serializable {
    private static final long serialVersionUID = 1L; // Version ID
    
    String name;
    int age;
    double marks;
    transient String password;  // transient = WON'T be serialized! =ƒöÆ
    
    Student(String name, int age, double marks, String password) {
        this.name = name;
        this.age = age;
        this.marks = marks;
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + 
               ", marks=" + marks + ", password=" + password + "}";
    }
}
\`\`\`

**Step 2:** Serialize (save object to file)
\`\`\`java
Student student = new Student("Rahul", 20, 95.5, "secret123");

try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("student.ser"))) {
    oos.writeObject(student);
    System.out.println("Student saved! =ƒÆ+");
}
\`\`\`

**Step 3:** Deserialize (read object from file)
\`\`\`java
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("student.ser"))) {
    Student loaded = (Student) ois.readObject();
    System.out.println("Loaded: " + loaded);
    // Student{name='Rahul', age=20, marks=95.5, password=null}
    //                                              Gåæ null! (transient)
}
\`\`\`

---

### =ƒö+ Important Keywords:

| Keyword | Purpose | Analogy |
|---------|---------|---------|
| \`Serializable\` | Marks a class as serializable | "Freezable" sticker on food =ƒÅ+n+Å |
| \`transient\` | Skips a field during serialization | "Do not freeze" label GÜán+Å |
| \`serialVersionUID\` | Version number for the class | Expiry date on food =ƒôà |
| \`ObjectOutputStream\` | Writes objects to stream | Freezer machine =ƒºè |
| \`ObjectInputStream\` | Reads objects from stream | Thawing machine =ƒöÑ |

### =ƒº¬ Practice Questions
1. What is serialization?
2. What does \`transient\` keyword do?
3. Why do we use \`serialVersionUID\`?
4. Which interface must a class implement to be serializable?

=ƒÆí **Key Takeaway:** Serialization = object GåÆ bytes (save/send). Deserialization = bytes GåÆ object (restore). Use \`transient\` for sensitive data. Implement \`Serializable\` interface.`,
    commonQuestions: [
      {
        patterns: ['serialization', 'deserialization', 'what is serialization', 'transient', 'Serializable', 'object to byte'],
        answer: `## =ƒÆ+ Serialization GÇö Freeze Your Objects!

**Serialization** = Object GåÆ Bytes (freeze =ƒºè GåÆ save to file)
**Deserialization** = Bytes GåÆ Object (thaw =ƒöÑ GåÆ restore)

\`\`\`java
// 1. Mark class as Serializable
class Student implements Serializable {
    String name;
    transient String password;  // WON'T be saved! =ƒöÆ
}

// 2. Save (serialize)
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("file.ser"));
oos.writeObject(student);

// 3. Load (deserialize)
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("file.ser"));
Student s = (Student) ois.readObject();
\`\`\`

| Keyword | Purpose |
|---------|---------|
| \`Serializable\` | "This class can be frozen" |
| \`transient\` | "Don't freeze this field" (passwords!) |
| \`serialVersionUID\` | Version number for compatibility |

=ƒÆí \`transient\` fields become \`null\` / \`0\` after deserialization!`
      }
    ]
  },
  {
    topicId: 'u3t3',
    title: 'Filter & Pipe Streams',
    keywords: ['filter stream', 'pipe stream', 'DataInputStream', 'DataOutputStream', 'PipedInputStream', 'PipedOutputStream', 'FilterInputStream', 'PrintStream', 'buffered', 'data stream'],
    content: `## =ƒöº Filter & Pipe Streams

### =ƒôû Part 1: Filter Streams GÇö Adding Special Powers!

**Think of it like water filters** =ƒÆº: Raw water passes through a filter, and you get clean drinking water. Similarly, filter streams wrap around basic streams and add extra capabilities!

\`\`\`
Raw Stream (basic)  GåÆ  Filter Stream (enhanced)  GåÆ  Your Program
FileInputStream     GåÆ  BufferedInputStream       GåÆ  Faster reading!
FileInputStream     GåÆ  DataInputStream            GåÆ  Read int, double, boolean!
\`\`\`

#### DataInputStream & DataOutputStream (Read/Write Java types directly!)

\`\`\`java
// WRITING different data types to a file
try (DataOutputStream dos = new DataOutputStream(
        new FileOutputStream("data.bin"))) {
    dos.writeInt(42);              // Write integer
    dos.writeDouble(3.14159);     // Write double
    dos.writeBoolean(true);       // Write boolean
    dos.writeUTF("Hello Java!");  // Write String (UTF format)
    System.out.println("Data written! G£à");
}

// READING them back (SAME ORDER!)
try (DataInputStream dis = new DataInputStream(
        new FileInputStream("data.bin"))) {
    int num = dis.readInt();         // Read integer
    double pi = dis.readDouble();    // Read double
    boolean flag = dis.readBoolean();// Read boolean
    String msg = dis.readUTF();      // Read String
    
    System.out.println(num);    // 42
    System.out.println(pi);     // 3.14159
    System.out.println(flag);   // true
    System.out.println(msg);    // Hello Java!
}
\`\`\`

GÜán+Å **Important:** You MUST read in the SAME ORDER you wrote!

---

### =ƒôû Part 2: Pipe Streams GÇö Threads Talking to Each Other!

**Think of it like a tin-can telephone** =ƒôP: Two kids (threads) connected by a string. One talks (writes), the other listens (reads)!

\`\`\`
Thread 1 (Writer)  GöÇGöÇGöÇGöÇ pipe GöÇGöÇGöÇGöÇ  Thread 2 (Reader)
    writes data    GåÆ            GåÆ    reads data
\`\`\`

\`\`\`java
import java.io.*;

public class PipeDemo {
    public static void main(String[] args) throws Exception {
        // Create the pipe (connect the tin cans!)
        PipedOutputStream writeEnd = new PipedOutputStream();
        PipedInputStream readEnd = new PipedInputStream(writeEnd);
        
        // Thread 1: Writer (talks into the pipe)
        Thread writer = new Thread(() -> {
            try {
                String message = "Hello from Thread 1! =ƒæï";
                writeEnd.write(message.getBytes());
                writeEnd.close();
                System.out.println("Writer: Message sent! =ƒôñ");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        
        // Thread 2: Reader (listens from the pipe)
        Thread reader = new Thread(() -> {
            try {
                int data;
                StringBuilder sb = new StringBuilder();
                while ((data = readEnd.read()) != -1) {
                    sb.append((char) data);
                }
                System.out.println("Reader: Got message: " + sb.toString());
                readEnd.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        
        writer.start();
        reader.start();
    }
}
\`\`\`

**Output:**
\`\`\`
Writer: Message sent! =ƒôñ
Reader: Got message: Hello from Thread 1! =ƒæï
\`\`\`

---

### =ƒôè Summary Table:

| Stream Type | Purpose | Example Classes |
|-------------|---------|----------------|
| **Buffered** | Speed up I/O | BufferedInputStream, BufferedReader |
| **Data** | Read/write Java types | DataInputStream, DataOutputStream |
| **Print** | Easy printing | PrintStream (System.out!), PrintWriter |
| **Piped** | Thread communication | PipedInputStream, PipedOutputStream |

### =ƒº¬ Practice Questions
1. What is a filter stream?
2. How do DataInputStream and DataOutputStream work?
3. What are pipe streams used for?
4. Why must you read data in the same order you wrote it?

=ƒÆí **Key Takeaway:** Filter streams add extra features to basic streams (like water filters!). DataStreams read/write Java types directly. PipeStreams let threads communicate like a tin-can telephone.`,
    commonQuestions: [
      {
        patterns: ['filter stream', 'pipe stream', 'DataInputStream', 'DataOutputStream', 'PipedStream'],
        answer: `## =ƒöº Filter & Pipe Streams!

### Filter Streams = Adding special powers to basic streams!
\`\`\`java
// DataOutputStream GÇö write Java types directly
DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.bin"));
dos.writeInt(42);
dos.writeDouble(3.14);
dos.writeUTF("Hello!");

// DataInputStream GÇö read them back (SAME ORDER!)
DataInputStream dis = new DataInputStream(new FileInputStream("data.bin"));
int n = dis.readInt();       // 42
double d = dis.readDouble(); // 3.14
String s = dis.readUTF();    // "Hello!"
\`\`\`

### Pipe Streams = Threads talking to each other! =ƒôP
\`\`\`java
PipedOutputStream out = new PipedOutputStream();
PipedInputStream in = new PipedInputStream(out);
// Thread 1 writes to 'out', Thread 2 reads from 'in'
\`\`\`

=ƒÆí Filter streams **wrap** basic streams. Pipe streams connect **threads**.`
      }
    ]
  },
  {
    topicId: 'u3t4',
    title: 'Thread Lifecycle & Creation',
    keywords: ['thread', 'lifecycle', 'new', 'runnable', 'running', 'blocked', 'waiting', 'terminated', 'dead', 'start', 'run', 'sleep', 'join', 'Thread class', 'Runnable interface', 'thread creation'],
    content: `## =ƒº¦ Thread Lifecycle & Creation

### =ƒôû Story Time: The Restaurant Kitchen =ƒæ¿GÇì=ƒì¦

Imagine a restaurant with ONE chef. Orders come in:
- Order 1: Make Pizza =ƒìò (takes 20 min)
- Order 2: Make Salad =ƒÑù (takes 5 min)
- Order 3: Make Soup =ƒì¦ (takes 10 min)

**Without threads (Single-threaded):**
The chef makes pizza first (20 min), THEN salad (5 min), THEN soup (10 min) = **35 minutes total!**

**With threads (Multi-threaded):**
Hire 3 chefs! One makes pizza, one makes salad, one makes soup GÇö ALL AT THE SAME TIME = **20 minutes total!** =ƒÜÇ

**A thread = a separate chef** that can do work simultaneously!

---

### =ƒö+ Thread Lifecycle (Life Stages of a Thread)

A thread goes through these stages GÇö just like a person's life! =ƒº¼

\`\`\`
   GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÉ      start()      GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
   Göé NEW  Göé GöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGåÆ   Göé RUNNABLE Göé
   Göé Born Göé                    Göé Ready    Göé
   GööGöÇGöÇGöÇGöÇGöÇGöÇGöÿ                    GööGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÿ
                                    Göé CPU assigns time
                                    Gû+
                              GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
                              Göé RUNNING  Göé
                              Göé Working  Göé
                              GööGöÇGöÇGö¼GöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÿ
                     sleep()/    Göé   Göé    run() finishes
                     wait()      Göé   Göé
                        GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ   GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
                        Gû+                      Gû+
                  GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ          GöîGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÉ
                  Göé BLOCKED/  Göé          Göé TERMINATED Göé
                  Göé WAITING   Göé          Göé Dead       Göé
                  GööGöÇGöÇGöÇGöÇGöÇGö¼GöÇGöÇGöÇGöÇGöÇGöÿ          GööGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÇGöÿ
                        Göé notify()/
                        Göé sleep ends
                        GööGöÇGöÇGåÆ back to RUNNABLE
\`\`\`

| State | Description | Analogy |
|-------|-------------|---------|
| **NEW** | Thread created but not started | Baby born =ƒæ¦ |
| **RUNNABLE** | Ready to run, waiting for CPU | Standing in queue =ƒºì |
| **RUNNING** | Currently executing | Working at desk =ƒÆ¬ |
| **BLOCKED/WAITING** | Paused (sleeping, waiting for lock) | Sleeping =ƒÿ¦ |
| **TERMINATED** | Finished execution | Retired =ƒÄô |

---

### =ƒö+ Creating Threads GÇö Two Ways!

#### Method 1: Extend Thread Class

\`\`\`java
// Step 1: Create a class that extends Thread
class MyThread extends Thread {
    String taskName;
    
    MyThread(String name) {
        this.taskName = name;
    }
    
    // Step 2: Override the run() method GÇö this is what the thread DOES
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(taskName + " - Step " + i);
            try {
                Thread.sleep(500); // Pause for 500ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(taskName + " COMPLETED! G£à");
    }
}

// Step 3: Create and START threads
public class Main {
    public static void main(String[] args) {
        MyThread chef1 = new MyThread("=ƒìò Pizza Chef");
        MyThread chef2 = new MyThread("=ƒÑù Salad Chef");
        MyThread chef3 = new MyThread("=ƒì¦ Soup Chef");
        
        chef1.start();  // start() GåÆ creates new thread GåÆ calls run()
        chef2.start();  // All three run SIMULTANEOUSLY!
        chef3.start();
        
        // GÜán+Å DON'T use chef1.run() GÇö that runs in SAME thread (no parallel!)
    }
}
\`\`\`

**Output (mixed GÇö threads run simultaneously!):**
\`\`\`
=ƒìò Pizza Chef - Step 1
=ƒÑù Salad Chef - Step 1
=ƒì¦ Soup Chef - Step 1
=ƒìò Pizza Chef - Step 2
=ƒì¦ Soup Chef - Step 2
...
\`\`\`

#### Method 2: Implement Runnable Interface (RECOMMENDED! G£¿)

\`\`\`java
// Step 1: Implement Runnable interface
class MyTask implements Runnable {
    String taskName;
    
    MyTask(String name) {
        this.taskName = name;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(taskName + " running - " + i);
        }
    }
}

// Step 2: Create Thread with Runnable object
MyTask task = new MyTask("Download =ƒôÑ");
Thread t = new Thread(task);
t.start();

// Even simpler with lambda:
Thread t2 = new Thread(() -> {
    System.out.println("Hello from lambda thread! =ƒÄ»");
});
t2.start();
\`\`\`

#### Thread vs Runnable:
| Feature | extends Thread | implements Runnable |
|---------|---------------|-------------------|
| Inheritance | Can't extend other class G¥î | Can extend another class G£à |
| Flexibility | Less (single inheritance) | More (multiple interfaces) |
| Recommended | For simple cases | **YES GÇö best practice!** G£¿ |

---

### =ƒö+ Important Thread Methods

\`\`\`java
Thread t = new Thread(myTask);

t.start();              // Start the thread (GåÆ NEW to RUNNABLE)
t.getName();            // Get thread name
t.setName("Worker-1");  // Set thread name
t.setPriority(8);       // Priority: 1 (MIN) to 10 (MAX), default 5
t.isAlive();            // Is thread still running?

Thread.sleep(1000);     // Pause current thread for 1 second
Thread.currentThread(); // Get reference to current thread

t.join();               // Wait for thread t to finish before continuing
\`\`\`

### =ƒº¬ Practice Questions
1. What are the 5 states of a thread lifecycle?
2. What is the difference between \`start()\` and \`run()\`?
3. Which is better: extending Thread or implementing Runnable?
4. What does \`Thread.sleep()\` do?

=ƒÆí **Key Takeaway:** A thread is a separate flow of execution. Use \`start()\` not \`run()\`! Implement Runnable (recommended) or extend Thread. Thread states: New GåÆ Runnable GåÆ Running GåÆ Blocked/Waiting GåÆ Terminated.`,
    commonQuestions: [
      {
        patterns: ['thread', 'thread lifecycle', 'create thread', 'thread states', 'start vs run', 'Thread vs Runnable', 'multithreading basics'],
        answer: `## =ƒº¦ Thread Lifecycle & Creation!

### Lifecycle (states):
\`\`\`
NEW GåÆ RUNNABLE GåÆ RUNNING GåÆ BLOCKED/WAITING GåÆ TERMINATED
Born   Ready     Working    Sleeping          Done
\`\`\`

### Two ways to create threads:

**1. Extend Thread:**
\`\`\`java
class MyThread extends Thread {
    public void run() { System.out.println("Running!"); }
}
new MyThread().start();
\`\`\`

**2. Implement Runnable (RECOMMENDED!):**
\`\`\`java
class MyTask implements Runnable {
    public void run() { System.out.println("Running!"); }
}
new Thread(new MyTask()).start();
\`\`\`

### Key Points:
- \`start()\` = creates new thread GåÆ calls run() G£à
- \`run()\` = runs in SAME thread (not parallel!) G¥î
- \`Thread.sleep(1000)\` = pause 1 second
- \`t.join()\` = wait for t to finish

=ƒÆí Always use \`start()\`, never call \`run()\` directly!`
      }
    ]
  },
  {
    topicId: 'u3t5',
    title: 'Multithreading Advantages & Issues',
    keywords: ['multithreading', 'concurrency', 'parallel', 'advantage', 'disadvantage', 'race condition', 'deadlock', 'starvation', 'context switching', 'thread safety', 'shared resource'],
    content: `## GÜí Multithreading Advantages & Issues

### =ƒôû Why Use Multithreading?

Think of your computer like a school =ƒÅ½:
- **Single thread** = One teacher doing everything (teach math, then science, then English... one by one)
- **Multi thread** = Multiple teachers (math teacher, science teacher, English teacher GÇö all working simultaneously!)

---

### G£à Advantages of Multithreading

#### 1. Better Resource Utilization =ƒÅ¡
\`\`\`
Without multithreading:
CPU: [Work][Wait for file][Work][Wait for network][Work]
           Gåæ CPU is IDLE here GÇö wasted!

With multithreading:
CPU: [Thread1-Work][Thread2-Work][Thread1-Work][Thread3-Work]
     No idle time GÇö always busy! G£à
\`\`\`

#### 2. Better User Experience =ƒûÑn+Å
- Download a file while browsing the web
- Play music while typing in a text editor
- Load images in background while scrolling

#### 3. Faster Execution GÜí
Divide a big task into smaller tasks and run them in parallel!

#### 4. Responsive Applications =ƒô¦
The UI thread stays responsive while background threads do heavy work.

---

### G¥î Issues with Multithreading

#### 1. =ƒÅÄn+Å Race Condition
When two threads try to modify the SAME data at the SAME time, results become unpredictable!

\`\`\`
Thread 1: Read balance (1000) GåÆ Add 500 GåÆ Write balance (1500)
Thread 2: Read balance (1000) GåÆ Subtract 200 GåÆ Write balance (800)

Expected: 1000 + 500 - 200 = 1300
Actual: Could be 1500 OR 800 (whoever writes LAST wins!)
This is a RACE CONDITION! =ƒÅÄn+Å=ƒÆÑ
\`\`\`

#### 2. =ƒöÆ Deadlock
Two threads BOTH waiting for each other to release a resource GÇö neither can proceed! Like two people at a narrow door, both saying "You go first!" forever =ƒÜ¬=ƒÜ¬

\`\`\`
Thread 1: Has Lock A, needs Lock B =ƒöÆGåÆ=ƒöæ
Thread 2: Has Lock B, needs Lock A =ƒöÆGåÆ=ƒöæ
Both wait forever! =ƒÿ¦ = DEADLOCK
\`\`\`

#### 3. =ƒì+n+Å Starvation
A thread never gets CPU time because higher-priority threads always run first. Like a student who never gets to answer because the topper always raises their hand faster! =ƒÖï

#### 4. =ƒöä Context Switching Overhead
Switching between threads takes time. Too many threads = more time spent switching than actually working! Like a chef trying to cook 100 dishes at once GÇö spends all time moving between stoves!

---

### =ƒôè Summary:

| Advantage | Issue |
|-----------|-------|
| Better CPU utilization | Race conditions |
| Responsive UI | Deadlocks |
| Faster execution | Starvation |
| Parallel processing | Context switching overhead |

### =ƒº¬ Practice Questions
1. What is a race condition?
2. What is deadlock? Give a real-life example.
3. Name 3 advantages of multithreading.
4. What is context switching?

=ƒÆí **Key Takeaway:** Multithreading makes programs faster and responsive, but introduces problems like race conditions, deadlocks, and starvation. Use synchronization (next topic!) to solve these problems.`,
    commonQuestions: [
      {
        patterns: ['advantages of multithreading', 'issues with multithreading', 'race condition', 'deadlock', 'starvation', 'why multithreading'],
        answer: `## GÜí Multithreading GÇö Advantages & Issues!

### G£à Advantages:
1. **Better CPU usage** GÇö no idle time
2. **Responsive UI** GÇö background work doesn't freeze screen
3. **Faster execution** GÇö parallel processing
4. **Better user experience** GÇö download + browse simultaneously

### G¥î Issues:
1. **Race Condition** =ƒÅÄn+Å GÇö two threads modify same data GåÆ unpredictable results
2. **Deadlock** =ƒöÆ GÇö two threads waiting for each other forever
3. **Starvation** =ƒì+n+Å GÇö a thread never gets CPU time
4. **Context Switching** =ƒöä GÇö switching overhead slows down

### Race Condition Example:
\`\`\`
Thread 1: Read balance(1000) GåÆ Add 500 GåÆ Write 1500
Thread 2: Read balance(1000) GåÆ Sub 200 GåÆ Write 800
Result: 800 (Thread 1's work lost!) GåÉ RACE CONDITION!
\`\`\`

=ƒÆí Solution: Use **synchronized** keyword to prevent race conditions!`
      }
    ]
  },
  {
    topicId: 'u3t6',
    title: 'Thread Programs & Examples',
    keywords: ['thread example', 'thread program', 'producer consumer', 'thread pool', 'executor', 'callable', 'future', 'thread priority', 'daemon thread'],
    content: `## =ƒÆ+ Thread Programs & Examples

### =ƒö+ Program 1: Simple Thread with Names

\`\`\`java
class NamedThread extends Thread {
    NamedThread(String name) {
        super(name);  // Set thread name
    }
    
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(getName() + " GåÆ Count: " + i);
            try { Thread.sleep(300); } catch (InterruptedException e) {}
        }
    }
}

public class Main {
    public static void main(String[] args) {
        NamedThread t1 = new NamedThread("Alpha G¡É");
        NamedThread t2 = new NamedThread("Beta =ƒîÖ");
        t1.start();
        t2.start();
    }
}
\`\`\`

---

### =ƒö+ Program 2: Thread Priority

\`\`\`java
class PriorityThread extends Thread {
    PriorityThread(String name) { super(name); }
    
    public void run() {
        System.out.println(getName() + " running with priority: " + getPriority());
    }
}

public class Main {
    public static void main(String[] args) {
        PriorityThread low = new PriorityThread("Low");
        PriorityThread med = new PriorityThread("Medium");
        PriorityThread high = new PriorityThread("High");
        
        low.setPriority(Thread.MIN_PRIORITY);   // 1
        med.setPriority(Thread.NORM_PRIORITY);  // 5 (default)
        high.setPriority(Thread.MAX_PRIORITY);  // 10
        
        low.start();
        med.start();
        high.start();
    }
}
// Note: Priority is a SUGGESTION GÇö OS decides actual order!
\`\`\`

---

### =ƒö+ Program 3: Thread join() GÇö Wait for Thread to Finish

\`\`\`java
class DownloadThread extends Thread {
    String fileName;
    
    DownloadThread(String name) {
        this.fileName = name;
    }
    
    public void run() {
        System.out.println("Downloading " + fileName + "...");
        try { Thread.sleep(2000); } catch (InterruptedException e) {}
        System.out.println(fileName + " downloaded! G£à");
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        DownloadThread t = new DownloadThread("movie.mp4");
        t.start();
        
        t.join();  // Main thread WAITS here until download finishes!
        
        System.out.println("Now processing the downloaded file...");
    }
}
\`\`\`

---

### =ƒö+ Program 4: Producer-Consumer Pattern

**Think of it like a bakery** =ƒìP:
- **Producer** = Baker who makes bread and puts it on the shelf
- **Consumer** = Customer who takes bread from the shelf
- **Shelf** = Shared buffer (ArrayList)

\`\`\`java
import java.util.*;

class SharedBuffer {
    Queue<Integer> buffer = new LinkedList<>();
    int capacity = 5;
    
    // Producer adds item
    synchronized void produce(int item) throws InterruptedException {
        while (buffer.size() == capacity) {
            System.out.println("Buffer FULL! Producer waiting... GÅ¦");
            wait();  // Wait until consumer removes something
        }
        buffer.add(item);
        System.out.println("Produced: " + item + " =ƒìP (Buffer: " + buffer.size() + ")");
        notify();  // Wake up consumer
    }
    
    // Consumer removes item
    synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {
            System.out.println("Buffer EMPTY! Consumer waiting... GÅ¦");
            wait();  // Wait until producer adds something
        }
        int item = buffer.poll();
        System.out.println("Consumed: " + item + " =ƒì+n+Å (Buffer: " + buffer.size() + ")");
        notify();  // Wake up producer
        return item;
    }
}

// Usage with threads
SharedBuffer buffer = new SharedBuffer();

Thread producer = new Thread(() -> {
    for (int i = 1; i <= 10; i++) {
        try { buffer.produce(i); Thread.sleep(200); }
        catch (InterruptedException e) {}
    }
});

Thread consumer = new Thread(() -> {
    for (int i = 1; i <= 10; i++) {
        try { buffer.consume(); Thread.sleep(500); }
        catch (InterruptedException e) {}
    }
});

producer.start();
consumer.start();
\`\`\`

---

### =ƒö+ Program 5: Daemon Thread

A daemon thread runs in the background and STOPS when the main program ends.

\`\`\`java
Thread daemon = new Thread(() -> {
    while (true) {
        System.out.println("Background task running... =ƒæ+");
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
    }
});
daemon.setDaemon(true);  // Mark as daemon!
daemon.start();

Thread.sleep(3000);  // Main runs for 3 seconds
System.out.println("Main ending GÇö daemon will stop automatically! =ƒ¢æ");
\`\`\`

### =ƒº¬ Practice Questions
1. What does \`join()\` do?
2. What is a daemon thread?
3. Explain the producer-consumer problem.
4. What are the values for MIN, NORM, and MAX priority?

=ƒÆí **Key Takeaway:** Use \`join()\` to wait for threads. Priority is just a hint (1-10, default 5). Producer-Consumer pattern uses wait()/notify() for coordination. Daemon threads auto-stop when main ends.`,
    commonQuestions: [
      {
        patterns: ['thread program', 'thread example', 'producer consumer', 'thread priority', 'daemon thread', 'join method'],
        answer: `## =ƒÆ+ Thread Programs!

### Basic Thread:
\`\`\`java
Thread t = new Thread(() -> {
    System.out.println("Hello from thread!");
});
t.start();
\`\`\`

### Thread Priority (1-10):
\`\`\`java
t.setPriority(Thread.MAX_PRIORITY);  // 10
t.setPriority(Thread.MIN_PRIORITY);  // 1
\`\`\`

### join() GÇö Wait for thread to finish:
\`\`\`java
t.start();
t.join();  // Main waits here until t finishes
\`\`\`

### Daemon Thread GÇö Background worker:
\`\`\`java
t.setDaemon(true);  // Auto-stops when main ends
t.start();
\`\`\`

### Producer-Consumer:
- Producer \`wait()\`s when buffer is full
- Consumer \`wait()\`s when buffer is empty
- Both call \`notify()\` after their action

=ƒÆí \`join()\` = "Wait for me!" | Daemon = "I'll stop when you stop!"`
      }
    ]
  },
  {
    topicId: 'u3t7',
    title: 'Synchronization',
    keywords: ['synchronization', 'synchronized', 'lock', 'monitor', 'mutex', 'thread safe', 'wait', 'notify', 'notifyAll', 'inter-thread communication', 'atomic', 'volatile'],
    content: `## =ƒöÆ Synchronization

### =ƒôû Story Time: The Bathroom Lock =ƒÜ¬

Imagine 5 people share ONE bathroom. Without a **lock**:
- Person A enters, Person B also enters GåÆ CHAOS! =ƒÿ¦

With a **lock**:
- Person A enters, LOCKS the door =ƒöÆ
- Person B arrives, sees lock GåÆ WAITS GÅ¦
- Person A finishes, UNLOCKS =ƒöô
- Person B enters GåÆ Everything orderly! G£à

**Synchronization = putting a lock on shared resources!**

---

### =ƒö+ The Problem (Without Synchronization)

\`\`\`java
class BankAccount {
    int balance = 1000;
    
    void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " withdrawing " + amount);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            balance -= amount;
            System.out.println("Balance: " + balance);
        }
    }
}

// Two threads withdrawing simultaneously
BankAccount account = new BankAccount();  // balance = 1000

// Thread 1 & 2 both try to withdraw 800
Thread t1 = new Thread(() -> account.withdraw(800), "Thread-1");
Thread t2 = new Thread(() -> account.withdraw(800), "Thread-2");
t1.start();
t2.start();

// PROBLEM: Both check (1000 >= 800 G£à) and BOTH withdraw!
// Balance could be: 200 or even -600! =ƒÿ¦
\`\`\`

---

### =ƒö+ The Solution: synchronized Keyword

#### Method 1: Synchronized Method
\`\`\`java
class BankAccount {
    int balance = 1000;
    
    // synchronized = only ONE thread can enter at a time! =ƒöÆ
    synchronized void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " withdrawing " + amount);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            balance -= amount;
            System.out.println("Balance: " + balance);
        } else {
            System.out.println("Insufficient balance! G¥î");
        }
    }
}

// Now Thread-1 enters, LOCKS the method
// Thread-2 must WAIT until Thread-1 finishes
// Result: Thread-1 withdraws 800 (balance=200), Thread-2 sees 200 < 800 GåÆ denied! G£à
\`\`\`

#### Method 2: Synchronized Block (More precise!)
\`\`\`java
class Counter {
    int count = 0;
    
    void increment() {
        // Only this specific part is locked (not the whole method)
        synchronized (this) {
            count++;
        }
        // Other code can run without lock
    }
}
\`\`\`

---

### =ƒö+ wait(), notify(), notifyAll() GÇö Inter-Thread Communication

These let threads **talk to each other** GÇö "I'm done, your turn!"

\`\`\`java
class SharedPrinter {
    boolean myTurn = true;
    
    // Thread 1 prints even numbers
    synchronized void printEven(int num) throws InterruptedException {
        while (myTurn) {
            wait();  // "Not my turn, I'll wait" =ƒÿ¦
        }
        System.out.println("Even: " + num);
        myTurn = true;
        notify();  // "Your turn now!" =ƒæï
    }
    
    // Thread 2 prints odd numbers
    synchronized void printOdd(int num) throws InterruptedException {
        while (!myTurn) {
            wait();
        }
        System.out.println("Odd: " + num);
        myTurn = false;
        notify();
    }
}
\`\`\`

#### wait() vs notify() vs notifyAll():
| Method | What It Does | Analogy |
|--------|-------------|---------|
| \`wait()\` | Thread goes to sleep, releases lock | "I'll wait for my turn" =ƒÿ¦ |
| \`notify()\` | Wakes up ONE waiting thread | "Next person, your turn!" =ƒæå |
| \`notifyAll()\` | Wakes up ALL waiting threads | "Everyone wake up!" =ƒôó |

GÜán+Å **Rule:** wait(), notify(), notifyAll() MUST be called inside a synchronized block!

---

### =ƒôè Summary:

| Concept | Purpose | Analogy |
|---------|---------|---------|
| **synchronized method** | Lock entire method | Locking bathroom door =ƒÜ¬ |
| **synchronized block** | Lock specific code only | Locking just the medicine cabinet =ƒùän+Å |
| **wait()** | Thread pauses & releases lock | "I'll wait" =ƒÿ¦ |
| **notify()** | Wake up one waiting thread | "Your turn!" =ƒæå |
| **notifyAll()** | Wake up ALL waiting threads | "Everyone up!" =ƒôó |

### =ƒº¬ Practice Questions
1. What is synchronization? Why is it needed?
2. Difference between synchronized method and synchronized block?
3. What does wait() do?
4. Why must wait/notify be inside synchronized block?

=ƒÆí **Key Takeaway:** Synchronization prevents race conditions by locking shared resources. Use \`synchronized\` to let only one thread access critical code. Use \`wait()/notify()\` for thread coordination. Always lock as little code as possible (synchronized block > synchronized method).`,
    commonQuestions: [
      {
        patterns: ['synchronization', 'synchronized', 'thread safe', 'wait notify', 'lock', 'monitor', 'race condition solution'],
        answer: `## =ƒöÆ Synchronization GÇö The Thread Lock!

**Problem:** Two threads accessing same data = unpredictable results!
**Solution:** synchronized = only ONE thread at a time!

### Synchronized Method:
\`\`\`java
synchronized void withdraw(int amount) {
    if (balance >= amount) {
        balance -= amount;  // Safe! Only one thread here
    }
}
\`\`\`

### Synchronized Block (more precise):
\`\`\`java
void update() {
    synchronized (this) {
        count++;  // Only this is locked
    }
    // Other code runs freely
}
\`\`\`

### wait/notify (thread communication):
\`\`\`java
synchronized void method() {
    wait();    // "I'll wait" =ƒÿ¦ (releases lock)
    notify();  // "Your turn!" =ƒæå (wakes one thread)
}
\`\`\`

=ƒÆí \`synchronized\` = bathroom lock. \`wait()\` = "I'll wait". \`notify()\` = "Next!"`
      }
    ]
  }
];

export default unit3Knowledge;
