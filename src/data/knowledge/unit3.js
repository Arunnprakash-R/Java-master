// Unit 3: I/O Streams & Multithreading - Complete Knowledge Base (Teacher-Style)
const unit3Knowledge = [
  {
    topicId: 'u3t1',
    title: 'I/O Streams in Java',
    keywords: ['stream', 'input', 'output', 'InputStream', 'OutputStream', 'Reader', 'Writer', 'FileInputStream', 'FileOutputStream', 'FileReader', 'FileWriter', 'BufferedReader', 'byte stream', 'character stream', 'io'],
    content: `## =��� I/O Streams in Java

### =��� Story Time: The Water Pipeline

Imagine a **water pipeline** =�ܦ connecting a lake to your house:
- **Input stream** = Water flowing FROM the lake INTO your house (reading data)
- **Output stream** = Water flowing FROM your house TO the garden (writing data)

In Java, **streams** are channels that carry data between your program and the outside world (files, keyboard, network, etc.)

---

### =��+ Two Types of Streams

#### 1. Byte Streams (for ALL data G�� images, videos, binary files)
- Handle data as **raw bytes** (0s and 1s)
- Classes: \`InputStream\`, \`OutputStream\` and their children

#### 2. Character Streams (for TEXT data G�� .txt, .csv, .html)
- Handle data as **characters** (letters, numbers, symbols)
- Classes: \`Reader\`, \`Writer\` and their children

\`\`\`
                    Stream Types
                   /            \\
          Byte Stream        Character Stream
         (raw data)           (text data)
         /        \\           /          \\
  InputStream  OutputStream  Reader    Writer
       G��            G��          G��         G��
  FileInput    FileOutput  FileReader FileWriter
  Stream       Stream           G��         G��
       G��            G��      BufferedReader  BufferedWriter
  BufferedInput BufferedOutput
  Stream       Stream
\`\`\`

---

### =��+ Byte Streams G�� Reading & Writing Bytes

\`\`\`java
import java.io.*;

// WRITING bytes to a file
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String text = "Hello, Java! =��";
    fos.write(text.getBytes());     // Convert string G�� bytes G�� write
    System.out.println("Written successfully! G��");
}

// READING bytes from a file
try (FileInputStream fis = new FileInputStream("output.txt")) {
    int data;
    while ((data = fis.read()) != -1) {  // -1 means end of file
        System.out.print((char) data);    // Convert byte G�� char G�� print
    }
}
\`\`\`

---

### =��+ Character Streams G�� Reading & Writing Text

\`\`\`java
// WRITING text to a file
try (FileWriter fw = new FileWriter("story.txt")) {
    fw.write("Once upon a time...\\n");
    fw.write("There was a Java programmer.\\n");
    fw.write("The End! =���");
    System.out.println("Story written! G��");
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

### =��+ Buffered Streams (FAST reading/writing!)

**Think of it like:** Instead of carrying water one glass at a time (slow! =�Ѣ), use a **bucket** (buffer) to carry many glasses at once! =���

\`\`\`java
// BUFFERED READER G�� reads line by line (most common!)
try (BufferedReader br = new BufferedReader(new FileReader("story.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// BUFFERED WRITER G�� writes with buffer
try (BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))) {
    bw.write("Fast writing with buffer! =���");
    bw.newLine();  // Add a new line
    bw.write("Line 2");
}

// READING from keyboard (Scanner alternative!)
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
System.out.print("Enter your name: ");
String name = br.readLine();
System.out.println("Hello, " + name + "! =���");
\`\`\`

---

### =��� Byte vs Character Streams:

| Feature | Byte Stream | Character Stream |
|---------|------------|-----------------|
| **Unit** | Byte (8 bits) | Character (16 bits Unicode) |
| **Best for** | Images, audio, video, any file | Text files only |
| **Parent classes** | InputStream, OutputStream | Reader, Writer |
| **Example** | FileInputStream, FileOutputStream | FileReader, FileWriter |
| **Analogy** | Raw water pipe =�ܦ | Filtered drinking water =��� |

### =��� Practice Questions
1. What is the difference between byte stream and character stream?
2. Why are buffered streams faster?
3. What does \`-1\` mean when reading from a stream?
4. Write code to read a file line by line.

=��� **Key Takeaway:** Streams carry data like water in pipes. Byte streams handle ANY data, character streams handle TEXT. Use buffered streams for speed. Always close streams using try-with-resources!`,
    commonQuestions: [
      {
        patterns: ['io stream', 'input output stream', 'byte stream', 'character stream', 'file reading', 'file writing', 'streams in java'],
        answer: `## =��� I/O Streams G�� Data Pipelines!

Streams carry data between your program and files/keyboard/network.

### Two Types:
| Byte Stream | Character Stream |
|-------------|-----------------|
| Raw bytes (any file) | Characters (text files) |
| InputStream/OutputStream | Reader/Writer |
| FileInputStream | FileReader |

### Most Common G�� BufferedReader:
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
    fw.write("Hello Java! =��");
}
\`\`\`

=��� Use **buffered** streams = faster (reads in chunks, not one byte at a time)!`
      }
    ]
  },
  {
    topicId: 'u3t2',
    title: 'Serialization & Deserialization',
    keywords: ['serialization', 'deserialization', 'Serializable', 'ObjectInputStream', 'ObjectOutputStream', 'transient', 'serialVersionUID', 'object stream', 'persist'],
    content: `## =��+ Serialization & Deserialization

### =��� Story Time: Freeze-Drying Your Object! =���

Imagine you make a delicious sandwich =�Ѭ. You want to save it for tomorrow. So you **freeze** it (serialization). Tomorrow, you **thaw** it and eat it (deserialization).

In Java:
- **Serialization** = Converting an object into bytes (freezing =���) G�� Save to file or send over network
- **Deserialization** = Converting bytes back into an object (thawing =���) G�� Restore the object

\`\`\`
  Object in Memory          G��    Byte Stream (file/network)    G��    Object in Memory
  Student{name="Rahul"}     G��    [bytes: 01001001...]          G��    Student{name="Rahul"}
       SERIALIZE =���                                                  DESERIALIZE =���
\`\`\`

---

### =��+ How to Serialize

**Step 1:** Implement \`Serializable\` interface (tell Java "this object CAN be frozen")

\`\`\`java
import java.io.*;

// Step 1: Mark the class as Serializable
class Student implements Serializable {
    private static final long serialVersionUID = 1L; // Version ID
    
    String name;
    int age;
    double marks;
    transient String password;  // transient = WON'T be serialized! =���
    
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
    System.out.println("Student saved! =��+");
}
\`\`\`

**Step 3:** Deserialize (read object from file)
\`\`\`java
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("student.ser"))) {
    Student loaded = (Student) ois.readObject();
    System.out.println("Loaded: " + loaded);
    // Student{name='Rahul', age=20, marks=95.5, password=null}
    //                                              G�� null! (transient)
}
\`\`\`

---

### =��+ Important Keywords:

| Keyword | Purpose | Analogy |
|---------|---------|---------|
| \`Serializable\` | Marks a class as serializable | "Freezable" sticker on food =��+n+� |
| \`transient\` | Skips a field during serialization | "Do not freeze" label G��n+� |
| \`serialVersionUID\` | Version number for the class | Expiry date on food =��� |
| \`ObjectOutputStream\` | Writes objects to stream | Freezer machine =��� |
| \`ObjectInputStream\` | Reads objects from stream | Thawing machine =��� |

### =��� Practice Questions
1. What is serialization?
2. What does \`transient\` keyword do?
3. Why do we use \`serialVersionUID\`?
4. Which interface must a class implement to be serializable?

=��� **Key Takeaway:** Serialization = object G�� bytes (save/send). Deserialization = bytes G�� object (restore). Use \`transient\` for sensitive data. Implement \`Serializable\` interface.`,
    commonQuestions: [
      {
        patterns: ['serialization', 'deserialization', 'what is serialization', 'transient', 'Serializable', 'object to byte'],
        answer: `## =��+ Serialization G�� Freeze Your Objects!

**Serialization** = Object G�� Bytes (freeze =��� G�� save to file)
**Deserialization** = Bytes G�� Object (thaw =��� G�� restore)

\`\`\`java
// 1. Mark class as Serializable
class Student implements Serializable {
    String name;
    transient String password;  // WON'T be saved! =���
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

=��� \`transient\` fields become \`null\` / \`0\` after deserialization!`
      }
    ]
  },
  {
    topicId: 'u3t3',
    title: 'Filter & Pipe Streams',
    keywords: ['filter stream', 'pipe stream', 'DataInputStream', 'DataOutputStream', 'PipedInputStream', 'PipedOutputStream', 'FilterInputStream', 'PrintStream', 'buffered', 'data stream'],
    content: `## =��� Filter & Pipe Streams

### =��� Part 1: Filter Streams G�� Adding Special Powers!

**Think of it like water filters** =�ƺ: Raw water passes through a filter, and you get clean drinking water. Similarly, filter streams wrap around basic streams and add extra capabilities!

\`\`\`
Raw Stream (basic)  G��  Filter Stream (enhanced)  G��  Your Program
FileInputStream     G��  BufferedInputStream       G��  Faster reading!
FileInputStream     G��  DataInputStream            G��  Read int, double, boolean!
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
    System.out.println("Data written! G��");
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

G��n+� **Important:** You MUST read in the SAME ORDER you wrote!

---

### =��� Part 2: Pipe Streams G�� Threads Talking to Each Other!

**Think of it like a tin-can telephone** =��P: Two kids (threads) connected by a string. One talks (writes), the other listens (reads)!

\`\`\`
Thread 1 (Writer)  G��G��G��G�� pipe G��G��G��G��  Thread 2 (Reader)
    writes data    G��            G��    reads data
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
                String message = "Hello from Thread 1! =���";
                writeEnd.write(message.getBytes());
                writeEnd.close();
                System.out.println("Writer: Message sent! =���");
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
Writer: Message sent! =���
Reader: Got message: Hello from Thread 1! =���
\`\`\`

---

### =��� Summary Table:

| Stream Type | Purpose | Example Classes |
|-------------|---------|----------------|
| **Buffered** | Speed up I/O | BufferedInputStream, BufferedReader |
| **Data** | Read/write Java types | DataInputStream, DataOutputStream |
| **Print** | Easy printing | PrintStream (System.out!), PrintWriter |
| **Piped** | Thread communication | PipedInputStream, PipedOutputStream |

### =��� Practice Questions
1. What is a filter stream?
2. How do DataInputStream and DataOutputStream work?
3. What are pipe streams used for?
4. Why must you read data in the same order you wrote it?

=��� **Key Takeaway:** Filter streams add extra features to basic streams (like water filters!). DataStreams read/write Java types directly. PipeStreams let threads communicate like a tin-can telephone.`,
    commonQuestions: [
      {
        patterns: ['filter stream', 'pipe stream', 'DataInputStream', 'DataOutputStream', 'PipedStream'],
        answer: `## =��� Filter & Pipe Streams!

### Filter Streams = Adding special powers to basic streams!
\`\`\`java
// DataOutputStream G�� write Java types directly
DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.bin"));
dos.writeInt(42);
dos.writeDouble(3.14);
dos.writeUTF("Hello!");

// DataInputStream G�� read them back (SAME ORDER!)
DataInputStream dis = new DataInputStream(new FileInputStream("data.bin"));
int n = dis.readInt();       // 42
double d = dis.readDouble(); // 3.14
String s = dis.readUTF();    // "Hello!"
\`\`\`

### Pipe Streams = Threads talking to each other! =��P
\`\`\`java
PipedOutputStream out = new PipedOutputStream();
PipedInputStream in = new PipedInputStream(out);
// Thread 1 writes to 'out', Thread 2 reads from 'in'
\`\`\`

=��� Filter streams **wrap** basic streams. Pipe streams connect **threads**.`
      }
    ]
  },
  {
    topicId: 'u3t4',
    title: 'Thread Lifecycle & Creation',
    keywords: ['thread', 'lifecycle', 'new', 'runnable', 'running', 'blocked', 'waiting', 'terminated', 'dead', 'start', 'run', 'sleep', 'join', 'Thread class', 'Runnable interface', 'thread creation'],
    content: `## =��� Thread Lifecycle & Creation

### =��� Story Time: The Restaurant Kitchen =��G��=��

Imagine a restaurant with ONE chef. Orders come in:
- Order 1: Make Pizza =��� (takes 20 min)
- Order 2: Make Salad =��� (takes 5 min)
- Order 3: Make Soup =�� (takes 10 min)

**Without threads (Single-threaded):**
The chef makes pizza first (20 min), THEN salad (5 min), THEN soup (10 min) = **35 minutes total!**

**With threads (Multi-threaded):**
Hire 3 chefs! One makes pizza, one makes salad, one makes soup G�� ALL AT THE SAME TIME = **20 minutes total!** =���

**A thread = a separate chef** that can do work simultaneously!

---

### =��+ Thread Lifecycle (Life Stages of a Thread)

A thread goes through these stages G�� just like a person's life! =���

\`\`\`
   G��G��G��G��G��G��G��G��      start()      G��G��G��G��G��G��G��G��G��G��G��G��
   G�� NEW  G�� G��G��G��G��G��G��G��G��G��G��G��G��G��G��G��   G�� RUNNABLE G��
   G�� Born G��                    G�� Ready    G��
   G��G��G��G��G��G��G��G��                    G��G��G��G��G��G��G��G��G��G��G��G��
                                    G�� CPU assigns time
                                    G�+
                              G��G��G��G��G��G��G��G��G��G��G��G��
                              G�� RUNNING  G��
                              G�� Working  G��
                              G��G��G��G��G��G��G��G��G��G��G��G��
                     sleep()/    G��   G��    run() finishes
                     wait()      G��   G��
                        G��G��G��G��G��G��G��G��G��G��   G��G��G��G��G��G��G��G��G��G��
                        G�+                      G�+
                  G��G��G��G��G��G��G��G��G��G��G��G��G��          G��G��G��G��G��G��G��G��G��G��G��G��G��G��
                  G�� BLOCKED/  G��          G�� TERMINATED G��
                  G�� WAITING   G��          G�� Dead       G��
                  G��G��G��G��G��G��G��G��G��G��G��G��G��          G��G��G��G��G��G��G��G��G��G��G��G��G��G��
                        G�� notify()/
                        G�� sleep ends
                        G��G��G��G�� back to RUNNABLE
\`\`\`

| State | Description | Analogy |
|-------|-------------|---------|
| **NEW** | Thread created but not started | Baby born =�� |
| **RUNNABLE** | Ready to run, waiting for CPU | Standing in queue =��� |
| **RUNNING** | Currently executing | Working at desk =�Ƭ |
| **BLOCKED/WAITING** | Paused (sleeping, waiting for lock) | Sleeping =��� |
| **TERMINATED** | Finished execution | Retired =��� |

---

### =��+ Creating Threads G�� Two Ways!

#### Method 1: Extend Thread Class

\`\`\`java
// Step 1: Create a class that extends Thread
class MyThread extends Thread {
    String taskName;
    
    MyThread(String name) {
        this.taskName = name;
    }
    
    // Step 2: Override the run() method G�� this is what the thread DOES
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
        System.out.println(taskName + " COMPLETED! G��");
    }
}

// Step 3: Create and START threads
public class Main {
    public static void main(String[] args) {
        MyThread chef1 = new MyThread("=��� Pizza Chef");
        MyThread chef2 = new MyThread("=��� Salad Chef");
        MyThread chef3 = new MyThread("=�� Soup Chef");
        
        chef1.start();  // start() G�� creates new thread G�� calls run()
        chef2.start();  // All three run SIMULTANEOUSLY!
        chef3.start();
        
        // G��n+� DON'T use chef1.run() G�� that runs in SAME thread (no parallel!)
    }
}
\`\`\`

**Output (mixed G�� threads run simultaneously!):**
\`\`\`
=��� Pizza Chef - Step 1
=��� Salad Chef - Step 1
=�� Soup Chef - Step 1
=��� Pizza Chef - Step 2
=�� Soup Chef - Step 2
...
\`\`\`

#### Method 2: Implement Runnable Interface (RECOMMENDED! G��)

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
MyTask task = new MyTask("Download =���");
Thread t = new Thread(task);
t.start();

// Even simpler with lambda:
Thread t2 = new Thread(() -> {
    System.out.println("Hello from lambda thread! =�Ļ");
});
t2.start();
\`\`\`

#### Thread vs Runnable:
| Feature | extends Thread | implements Runnable |
|---------|---------------|-------------------|
| Inheritance | Can't extend other class G�� | Can extend another class G�� |
| Flexibility | Less (single inheritance) | More (multiple interfaces) |
| Recommended | For simple cases | **YES G�� best practice!** G�� |

---

### =��+ Important Thread Methods

\`\`\`java
Thread t = new Thread(myTask);

t.start();              // Start the thread (G�� NEW to RUNNABLE)
t.getName();            // Get thread name
t.setName("Worker-1");  // Set thread name
t.setPriority(8);       // Priority: 1 (MIN) to 10 (MAX), default 5
t.isAlive();            // Is thread still running?

Thread.sleep(1000);     // Pause current thread for 1 second
Thread.currentThread(); // Get reference to current thread

t.join();               // Wait for thread t to finish before continuing
\`\`\`

### =��� Practice Questions
1. What are the 5 states of a thread lifecycle?
2. What is the difference between \`start()\` and \`run()\`?
3. Which is better: extending Thread or implementing Runnable?
4. What does \`Thread.sleep()\` do?

=��� **Key Takeaway:** A thread is a separate flow of execution. Use \`start()\` not \`run()\`! Implement Runnable (recommended) or extend Thread. Thread states: New G�� Runnable G�� Running G�� Blocked/Waiting G�� Terminated.`,
    commonQuestions: [
      {
        patterns: ['thread', 'thread lifecycle', 'create thread', 'thread states', 'start vs run', 'Thread vs Runnable', 'multithreading basics'],
        answer: `## =��� Thread Lifecycle & Creation!

### Lifecycle (states):
\`\`\`
NEW G�� RUNNABLE G�� RUNNING G�� BLOCKED/WAITING G�� TERMINATED
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
- \`start()\` = creates new thread G�� calls run() G��
- \`run()\` = runs in SAME thread (not parallel!) G��
- \`Thread.sleep(1000)\` = pause 1 second
- \`t.join()\` = wait for t to finish

=��� Always use \`start()\`, never call \`run()\` directly!`
      }
    ]
  },
  {
    topicId: 'u3t5',
    title: 'Multithreading Advantages & Issues',
    keywords: ['multithreading', 'concurrency', 'parallel', 'advantage', 'disadvantage', 'race condition', 'deadlock', 'starvation', 'context switching', 'thread safety', 'shared resource'],
    content: `## G�� Multithreading Advantages & Issues

### =��� Why Use Multithreading?

Think of your computer like a school =�Ž:
- **Single thread** = One teacher doing everything (teach math, then science, then English... one by one)
- **Multi thread** = Multiple teachers (math teacher, science teacher, English teacher G�� all working simultaneously!)

---

### G�� Advantages of Multithreading

#### 1. Better Resource Utilization =�š
\`\`\`
Without multithreading:
CPU: [Work][Wait for file][Work][Wait for network][Work]
           G�� CPU is IDLE here G�� wasted!

With multithreading:
CPU: [Thread1-Work][Thread2-Work][Thread1-Work][Thread3-Work]
     No idle time G�� always busy! G��
\`\`\`

#### 2. Better User Experience =���n+�
- Download a file while browsing the web
- Play music while typing in a text editor
- Load images in background while scrolling

#### 3. Faster Execution G��
Divide a big task into smaller tasks and run them in parallel!

#### 4. Responsive Applications =���
The UI thread stays responsive while background threads do heavy work.

---

### G�� Issues with Multithreading

#### 1. =���n+� Race Condition
When two threads try to modify the SAME data at the SAME time, results become unpredictable!

\`\`\`
Thread 1: Read balance (1000) G�� Add 500 G�� Write balance (1500)
Thread 2: Read balance (1000) G�� Subtract 200 G�� Write balance (800)

Expected: 1000 + 500 - 200 = 1300
Actual: Could be 1500 OR 800 (whoever writes LAST wins!)
This is a RACE CONDITION! =���n+�=���
\`\`\`

#### 2. =��� Deadlock
Two threads BOTH waiting for each other to release a resource G�� neither can proceed! Like two people at a narrow door, both saying "You go first!" forever =�ܬ=�ܬ

\`\`\`
Thread 1: Has Lock A, needs Lock B =���G��=���
Thread 2: Has Lock B, needs Lock A =���G��=���
Both wait forever! =��� = DEADLOCK
\`\`\`

#### 3. =��+n+� Starvation
A thread never gets CPU time because higher-priority threads always run first. Like a student who never gets to answer because the topper always raises their hand faster! =���

#### 4. =��� Context Switching Overhead
Switching between threads takes time. Too many threads = more time spent switching than actually working! Like a chef trying to cook 100 dishes at once G�� spends all time moving between stoves!

---

### =��� Summary:

| Advantage | Issue |
|-----------|-------|
| Better CPU utilization | Race conditions |
| Responsive UI | Deadlocks |
| Faster execution | Starvation |
| Parallel processing | Context switching overhead |

### =��� Practice Questions
1. What is a race condition?
2. What is deadlock? Give a real-life example.
3. Name 3 advantages of multithreading.
4. What is context switching?

=��� **Key Takeaway:** Multithreading makes programs faster and responsive, but introduces problems like race conditions, deadlocks, and starvation. Use synchronization (next topic!) to solve these problems.`,
    commonQuestions: [
      {
        patterns: ['advantages of multithreading', 'issues with multithreading', 'race condition', 'deadlock', 'starvation', 'why multithreading'],
        answer: `## G�� Multithreading G�� Advantages & Issues!

### G�� Advantages:
1. **Better CPU usage** G�� no idle time
2. **Responsive UI** G�� background work doesn't freeze screen
3. **Faster execution** G�� parallel processing
4. **Better user experience** G�� download + browse simultaneously

### G�� Issues:
1. **Race Condition** =���n+� G�� two threads modify same data G�� unpredictable results
2. **Deadlock** =��� G�� two threads waiting for each other forever
3. **Starvation** =��+n+� G�� a thread never gets CPU time
4. **Context Switching** =��� G�� switching overhead slows down

### Race Condition Example:
\`\`\`
Thread 1: Read balance(1000) G�� Add 500 G�� Write 1500
Thread 2: Read balance(1000) G�� Sub 200 G�� Write 800
Result: 800 (Thread 1's work lost!) G�� RACE CONDITION!
\`\`\`

=��� Solution: Use **synchronized** keyword to prevent race conditions!`
      }
    ]
  },
  {
    topicId: 'u3t6',
    title: 'Thread Programs & Examples',
    keywords: ['thread example', 'thread program', 'producer consumer', 'thread pool', 'executor', 'callable', 'future', 'thread priority', 'daemon thread'],
    content: `## =��+ Thread Programs & Examples

### =��+ Program 1: Simple Thread with Names

\`\`\`java
class NamedThread extends Thread {
    NamedThread(String name) {
        super(name);  // Set thread name
    }
    
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println(getName() + " G�� Count: " + i);
            try { Thread.sleep(300); } catch (InterruptedException e) {}
        }
    }
}

public class Main {
    public static void main(String[] args) {
        NamedThread t1 = new NamedThread("Alpha G��");
        NamedThread t2 = new NamedThread("Beta =���");
        t1.start();
        t2.start();
    }
}
\`\`\`

---

### =��+ Program 2: Thread Priority

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
// Note: Priority is a SUGGESTION G�� OS decides actual order!
\`\`\`

---

### =��+ Program 3: Thread join() G�� Wait for Thread to Finish

\`\`\`java
class DownloadThread extends Thread {
    String fileName;
    
    DownloadThread(String name) {
        this.fileName = name;
    }
    
    public void run() {
        System.out.println("Downloading " + fileName + "...");
        try { Thread.sleep(2000); } catch (InterruptedException e) {}
        System.out.println(fileName + " downloaded! G��");
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

### =��+ Program 4: Producer-Consumer Pattern

**Think of it like a bakery** =��P:
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
            System.out.println("Buffer FULL! Producer waiting... GŦ");
            wait();  // Wait until consumer removes something
        }
        buffer.add(item);
        System.out.println("Produced: " + item + " =��P (Buffer: " + buffer.size() + ")");
        notify();  // Wake up consumer
    }
    
    // Consumer removes item
    synchronized int consume() throws InterruptedException {
        while (buffer.isEmpty()) {
            System.out.println("Buffer EMPTY! Consumer waiting... GŦ");
            wait();  // Wait until producer adds something
        }
        int item = buffer.poll();
        System.out.println("Consumed: " + item + " =��+n+� (Buffer: " + buffer.size() + ")");
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

### =��+ Program 5: Daemon Thread

A daemon thread runs in the background and STOPS when the main program ends.

\`\`\`java
Thread daemon = new Thread(() -> {
    while (true) {
        System.out.println("Background task running... =��+");
        try { Thread.sleep(1000); } catch (InterruptedException e) {}
    }
});
daemon.setDaemon(true);  // Mark as daemon!
daemon.start();

Thread.sleep(3000);  // Main runs for 3 seconds
System.out.println("Main ending G�� daemon will stop automatically! =���");
\`\`\`

### =��� Practice Questions
1. What does \`join()\` do?
2. What is a daemon thread?
3. Explain the producer-consumer problem.
4. What are the values for MIN, NORM, and MAX priority?

=��� **Key Takeaway:** Use \`join()\` to wait for threads. Priority is just a hint (1-10, default 5). Producer-Consumer pattern uses wait()/notify() for coordination. Daemon threads auto-stop when main ends.`,
    commonQuestions: [
      {
        patterns: ['thread program', 'thread example', 'producer consumer', 'thread priority', 'daemon thread', 'join method'],
        answer: `## =��+ Thread Programs!

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

### join() G�� Wait for thread to finish:
\`\`\`java
t.start();
t.join();  // Main waits here until t finishes
\`\`\`

### Daemon Thread G�� Background worker:
\`\`\`java
t.setDaemon(true);  // Auto-stops when main ends
t.start();
\`\`\`

### Producer-Consumer:
- Producer \`wait()\`s when buffer is full
- Consumer \`wait()\`s when buffer is empty
- Both call \`notify()\` after their action

=��� \`join()\` = "Wait for me!" | Daemon = "I'll stop when you stop!"`
      }
    ]
  },
  {
    topicId: 'u3t7',
    title: 'Synchronization',
    keywords: ['synchronization', 'synchronized', 'lock', 'monitor', 'mutex', 'thread safe', 'wait', 'notify', 'notifyAll', 'inter-thread communication', 'atomic', 'volatile'],
    content: `## =��� Synchronization

### =��� Story Time: The Bathroom Lock =�ܬ

Imagine 5 people share ONE bathroom. Without a **lock**:
- Person A enters, Person B also enters G�� CHAOS! =���

With a **lock**:
- Person A enters, LOCKS the door =���
- Person B arrives, sees lock G�� WAITS GŦ
- Person A finishes, UNLOCKS =���
- Person B enters G�� Everything orderly! G��

**Synchronization = putting a lock on shared resources!**

---

### =��+ The Problem (Without Synchronization)

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

// PROBLEM: Both check (1000 >= 800 G��) and BOTH withdraw!
// Balance could be: 200 or even -600! =���
\`\`\`

---

### =��+ The Solution: synchronized Keyword

#### Method 1: Synchronized Method
\`\`\`java
class BankAccount {
    int balance = 1000;
    
    // synchronized = only ONE thread can enter at a time! =���
    synchronized void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " withdrawing " + amount);
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            balance -= amount;
            System.out.println("Balance: " + balance);
        } else {
            System.out.println("Insufficient balance! G��");
        }
    }
}

// Now Thread-1 enters, LOCKS the method
// Thread-2 must WAIT until Thread-1 finishes
// Result: Thread-1 withdraws 800 (balance=200), Thread-2 sees 200 < 800 G�� denied! G��
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

### =��+ wait(), notify(), notifyAll() G�� Inter-Thread Communication

These let threads **talk to each other** G�� "I'm done, your turn!"

\`\`\`java
class SharedPrinter {
    boolean myTurn = true;
    
    // Thread 1 prints even numbers
    synchronized void printEven(int num) throws InterruptedException {
        while (myTurn) {
            wait();  // "Not my turn, I'll wait" =���
        }
        System.out.println("Even: " + num);
        myTurn = true;
        notify();  // "Your turn now!" =���
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
| \`wait()\` | Thread goes to sleep, releases lock | "I'll wait for my turn" =��� |
| \`notify()\` | Wakes up ONE waiting thread | "Next person, your turn!" =��� |
| \`notifyAll()\` | Wakes up ALL waiting threads | "Everyone wake up!" =��� |

G��n+� **Rule:** wait(), notify(), notifyAll() MUST be called inside a synchronized block!

---

### =��� Summary:

| Concept | Purpose | Analogy |
|---------|---------|---------|
| **synchronized method** | Lock entire method | Locking bathroom door =�ܬ |
| **synchronized block** | Lock specific code only | Locking just the medicine cabinet =���n+� |
| **wait()** | Thread pauses & releases lock | "I'll wait" =��� |
| **notify()** | Wake up one waiting thread | "Your turn!" =��� |
| **notifyAll()** | Wake up ALL waiting threads | "Everyone up!" =��� |

### =��� Practice Questions
1. What is synchronization? Why is it needed?
2. Difference between synchronized method and synchronized block?
3. What does wait() do?
4. Why must wait/notify be inside synchronized block?

=��� **Key Takeaway:** Synchronization prevents race conditions by locking shared resources. Use \`synchronized\` to let only one thread access critical code. Use \`wait()/notify()\` for thread coordination. Always lock as little code as possible (synchronized block > synchronized method).`,
    commonQuestions: [
      {
        patterns: ['synchronization', 'synchronized', 'thread safe', 'wait notify', 'lock', 'monitor', 'race condition solution'],
        answer: `## =��� Synchronization G�� The Thread Lock!

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
    wait();    // "I'll wait" =��� (releases lock)
    notify();  // "Your turn!" =��� (wakes one thread)
}
\`\`\`

=��� \`synchronized\` = bathroom lock. \`wait()\` = "I'll wait". \`notify()\` = "Next!"`
      }
    ]
  },
  {
    topicId: 'u3qb',
    title: 'Unit 3 Question Bank (Parts A/B/C)',
    keywords: ['unit 3', 'question bank', 'part a', 'part b', 'part c', 'io streams', 'serialization', 'deserialization', 'multithreading', 'threads', 'java io'],
    content: `## Unit 3 — Question Bank (Structured by Part)

### Part A — 1 Mark (MCQ) with Answers
1) Which class reads characters from a file?
    - a) FileReader  b) FileWriter  c) FileInputStream  d) InputStreamReader  
    **Answer:** a — FileReader is the basic character reader.

2) Which stream set works on character streams?
    - a) InputStream  b) OutputStream  c) Character Stream  d) All of the mentioned  
    **Answer:** c — Reader/Writer classes handle characters.

3) What does an InputStream read?
    - a) Characters  b) Raw bytes  c) Strings  d) Objects  
    **Answer:** b — InputStream deals with raw bytes.

4) Process of extracting/removing object state from a stream?
    - a) Serialization  b) Externalization  c) File Filtering  d) Deserialization  
    **Answer:** d — Deserialization rebuilds the object from bytes.

5) Which interface extends DataInput?
    - a) Serializable  b) Externalization  c) ObjectOutput  d) ObjectInput  
    **Answer:** d — ObjectInput extends DataInput.

6) Streams statements: i) basic streams are input/output; ii) filters can read from one stream and write to another.
    - A) True, True  B) True, False  C) False, True  D) False, False  
    **Answer:** A — Both statements are correct.

7) ______ streams enable thread-to-thread communication.
    - A) Object  B) Piped  C) Pushback  D) Filtered  
    **Answer:** B — Piped streams connect producer/consumer threads.

8) Multithreaded programming means:
    - a) two different processes run simultaneously
    - b) two or more parts of the same process run simultaneously
    - c) many processes access same information
    - d) single process accesses many sources  
    **Answer:** b — Multiple threads share one process.

9) Thread priority type?
    - a) Integer  b) Float  c) double  d) long  
    **Answer:** a — Priorities are integer values.

10) Name of the thread in the given program (Thread.currentThread() print)?
    - a) main  b) Thread  c) System  d) None  
    **Answer:** a — The default thread name is "main".

11) Method to start a thread?
    - a) run()  b) start()  c) execute()  d) init()  
    **Answer:** b — Always call start(); it invokes run() on a new thread.

12) Which method checks if a thread is alive?
    - a) isAlive()  b) check()  c) alive()  d) join()  
    **Answer:** a — isAlive() reports running state.

13) When is IOException triggered?
     - a) Syntax errors  b) JVM crashes  c) I/O operation failures  d) None  
     **Answer:** c — Any failed read/write causes it.

14) What is thread intercommunication used for?
     - a) Sync blocks  b) Serialize data  c) Thread messaging via wait/notify  d) I/O handling  
     **Answer:** c — wait()/notify() coordinate threads.

15) Why avoid monolithic classes?
     - a) Tightly coupled  b) Hard to maintain and test  c) Encourages too many responsibilities  d) All of the above  
     **Answer:** d — Single giant classes hurt cohesion and maintainability.

### Part B — 2 Marks (Short Answers)
1) Differentiate InputStream and Reader.
    **Answer:** InputStream is byte-oriented; Reader is char/Unicode oriented. Use InputStream for binary data, Reader for text.

2) Define multithreading.
    **Answer:** Multiple threads execute concurrently within one process, sharing memory/resources to improve responsiveness.

3) What does Serializable do?
    **Answer:** Marker interface allowing an object's state to be converted to bytes and restored later (serialization/deserialization).

4) Why prefer buffering in I/O?
    **Answer:** Buffered streams reduce system calls by batching reads/writes, improving performance.

5) How do you create and start a thread?
    **Answer:** Either extend Thread and override run(), then call start(); or implement Runnable and pass to new Thread(runnable).start().

6) Purpose of transient keyword?
    **Answer:** Marks fields to skip during serialization (e.g., passwords, derived values).

7) What is serialVersionUID?
    **Answer:** A version identifier used to verify compatibility during deserialization; mismatch throws InvalidClassException.

### Part C — 14 Marks (Descriptive/Programs)
1) Explain Java I/O class hierarchy.
    **Answer (14M):**
    - **Layers:** Core byte streams (InputStream/OutputStream) for raw bytes; core char streams (Reader/Writer) for Unicode text.
    - **Specialized streams:** FileInputStream/FileOutputStream, FileReader/FileWriter (disk I/O). BufferedInputStream/BufferedReader wrap core streams to reduce syscalls. DataInputStream/DataOutputStream add primitive read/write. ObjectInputStream/ObjectOutputStream enable serialization. PrintWriter/PrintStream add formatted printing.
    - **Filters vs sources:** Sources (File*, ByteArray*), filters (Buffered*, Data*, Object*, Pushback*, LineNumber*). Filters wrap sources to add behavior (decorator pattern).
    - **Bridges:** InputStreamReader/OutputStreamWriter convert bytes ↔ chars using charset.
    - **Hierarchy examples:** InputStream → FileInputStream → BufferedInputStream; Reader → BufferedReader; Writer → PrintWriter.
    - **Key benefits:** Modularity (wrap what you need), performance (buffering), correctness (charset handling), extensibility (custom filters).

2) Describe serialization/deserialization steps with code.
    **Answer (14M):**
    - **Mark class:** \`class Person implements Serializable { private static final long serialVersionUID = 1L; String name; transient String password; }\`
    - **Write:**
      \`\`\`java
      try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("user.dat"))) {
          Person p = new Person("Alice", "secret");
          oos.writeObject(p);
      }
      \`\`\`
    - **Read:**
      \`\`\`java
      try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("user.dat"))) {
          Person p2 = (Person) ois.readObject();
      }
      \`\`\`
    - **Rules:** \`serialVersionUID\` for compatibility; \`transient\` to skip sensitive/derived fields; classes of all referenced objects must be Serializable; handle \`IOException\`, \`ClassNotFoundException\`.
    - **Use cases:** Caching, deep copy, sending over sockets/RMI.

3) Write a file copy program using byte streams.
    **Answer (14M):**
    \`\`\`java
    import java.io.*;

    public class FileCopy {
        public static void main(String[] args) {
            if (args.length < 2) {
                System.out.println("Usage: FileCopy <src> <dest>");
                return;
            }
            byte[] buffer = new byte[8192];
            try (InputStream in = new FileInputStream(args[0]);
                 OutputStream out = new FileOutputStream(args[1])) {
                int n;
                while ((n = in.read(buffer)) != -1) {
                    out.write(buffer, 0, n);
                }
                System.out.println("Copy done.");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    \`\`\`
    - Uses core byte streams + buffer for speed; try-with-resources closes streams automatically; handles binary files safely.

4) Explain thread life cycle and priorities.
    **Answer (14M):**
    - **States:** New → Runnable (ready) → Running (scheduled) → Blocked/Waiting/Timed Waiting (e.g., lock wait, \`wait()\`, \`sleep()\`, \`join()\`) → Terminated.
    - **APIs:** \`start()\` moves New→Runnable; scheduler picks to Running; \`sleep(ms)\` timed wait; \`wait()/notify()\` coordination; \`join()\` wait for another thread to finish; \`interrupt()\` signals to exit waits.
    - **Priorities:** Integers 1–10 (\`MIN_PRIORITY\`..\`MAX_PRIORITY\`); hints to scheduler, not a guarantee. Keep CPU-bound work lower, latency-sensitive higher (but avoid priority inversion).
    - **Best practices:** Keep \`run()\` short; avoid blocking while holding locks; use executors instead of raw threads for pools; handle interrupts cleanly.

5) Synchronization example preventing race conditions.
    **Answer (14M):**
    - **Unsafe counter:** multiple threads increment \`count++\` → lost updates.
    - **Fixed with synchronized:**
      \`\`\`java
      class Counter {
          private int count;
          public synchronized void inc() { count++; }
          public synchronized int get() { return count; }
      }
      \`\`\`
    - **Lock granularity:** \`synchronized\` uses the object monitor; keep critical sections small. Alternative: \`ReentrantLock\`, \`AtomicInteger\` for CAS-based increments.
    - **Avoid pitfalls:** No I/O inside locks; document lock order to avoid deadlocks; prefer immutable/shared-nothing when possible.
`
  }
];

export default unit3Knowledge;
