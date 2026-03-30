// Unit 4: GUI Programming - Complete Knowledge Base (Teacher-Style)
const unit4Knowledge = [
  {
    topicId: 'u4t1',
    title: 'AWT Components & Hierarchy',
    keywords: ['AWT', 'Abstract Window Toolkit', 'Component', 'Container', 'Frame', 'Panel', 'Button', 'Label', 'TextField', 'TextArea', 'Checkbox', 'Choice', 'List', 'GUI', 'window', 'component hierarchy'],
    content: `## 🖥️ AWT Components & Hierarchy

### 📖 Story Time: Building Your Own Window!

Remember using a computer for the first time? You saw **windows**, **buttons**, **text boxes**, **menus**... all the visual things you click and interact with? That's called a **GUI** (Graphical User Interface, pronounced "gooey" 😄).

**AWT (Abstract Window Toolkit)** is Java's original toolkit for building GUIs — like a box of LEGO pieces 🧱 that you use to build windows and buttons!

---

### 🔷 AWT Component Hierarchy

Think of it like a **family tree** 🌳:

\`\`\`
                      Object
                        │
                    Component          ← The grandparent of ALL GUI parts
                   /         \\
             Container     Button, Label, TextField, etc.
            /         \\        (individual components)
        Window       Panel
       /      \\
    Frame    Dialog
    (main     (pop-up
   window!)   windows)
\`\`\`

| Class | What It Is | Analogy |
|-------|-----------|---------|
| **Component** | Base class for all GUI elements | The DNA 🧬 |
| **Container** | Can hold other components | A box 📦 that holds items |
| **Frame** | Main application window | Your room 🏠 |
| **Panel** | Groups components together | A shelf 🗄️ |
| **Button** | Clickable button | A doorbell 🔔 |
| **Label** | Displays text | A name tag 🏷️ |
| **TextField** | Single-line text input | A blank space on a form _____ |
| **TextArea** | Multi-line text input | A writing pad 📝 |

---

### 🔷 Creating Your First Window!

\`\`\`java
import java.awt.*;

public class MyFirstWindow {
    public static void main(String[] args) {
        // Step 1: Create the frame (window)
        Frame frame = new Frame("My First Java Window! 🎉");
        
        // Step 2: Set size (width, height in pixels)
        frame.setSize(400, 300);
        
        // Step 3: Set layout (how components are arranged)
        frame.setLayout(new FlowLayout());
        
        // Step 4: Create components
        Label nameLabel = new Label("Enter your name:");
        TextField nameField = new TextField(20);  // 20 columns wide
        Button greetBtn = new Button("Say Hello!");
        TextArea outputArea = new TextArea(5, 30);  // 5 rows, 30 cols
        
        // Step 5: Add components to the frame
        frame.add(nameLabel);
        frame.add(nameField);
        frame.add(greetBtn);
        frame.add(outputArea);
        
        // Step 6: Make it visible!
        frame.setVisible(true);
    }
}
\`\`\`

---

### 🔷 All AWT Components:

#### Input Components:
\`\`\`java
// TextField — single line input
TextField tf = new TextField("Default text", 20);
String text = tf.getText();     // Get the text
tf.setText("New text");          // Set the text

// TextArea — multi-line input
TextArea ta = new TextArea("Default text", 5, 30);
ta.append("More text\\n");        // Add text at end

// Checkbox — tick box ✅
Checkbox cb1 = new Checkbox("Java", true);   // Pre-checked
Checkbox cb2 = new Checkbox("Python", false);

// CheckboxGroup — radio buttons (only one can be selected)
CheckboxGroup group = new CheckboxGroup();
Checkbox male = new Checkbox("Male", group, true);
Checkbox female = new Checkbox("Female", group, false);

// Choice — dropdown list 
Choice colors = new Choice();
colors.add("Red");
colors.add("Green");
colors.add("Blue");

// List — scrollable list
List fruits = new List(4, true);  // 4 visible, multi-select
fruits.add("Apple 🍎");
fruits.add("Banana 🍌");
fruits.add("Orange 🍊");
\`\`\`

#### Display Components:
\`\`\`java
// Label — display text
Label title = new Label("Welcome to Java! 🌟");

// Button — clickable
Button btn = new Button("Click Me!");
\`\`\`

#### Container Components:
\`\`\`java
// Panel — group components
Panel panel = new Panel();
panel.setLayout(new FlowLayout());
panel.add(new Button("OK"));
panel.add(new Button("Cancel"));

frame.add(panel);  // Add panel to frame
\`\`\`

### 🧪 Practice Questions
1. What is AWT?
2. What is the difference between Frame and Panel?
3. Name 5 AWT components with their purpose.
4. How do you create a dropdown list in AWT?

💡 **Key Takeaway:** AWT is Java's GUI toolkit. Frame = window, Panel = group container. Components: Button, Label, TextField, TextArea, Checkbox, Choice, List. Always remember: Create → Configure → Add → setVisible(true)!`,
    commonQuestions: [
      {
        patterns: ['awt', 'Abstract Window Toolkit', 'awt components', 'GUI components', 'frame panel button', 'awt hierarchy'],
        answer: `## 🖥️ AWT — Java's GUI Building Blocks!

AWT = Abstract Window Toolkit — builds windows, buttons, text fields, etc.

### Hierarchy:
\`\`\`
Component → Container → Window → Frame (main window)
                     → Panel (group of components)
\`\`\`

### Common Components:
| Component | Purpose | Example |
|-----------|---------|---------|
| Frame | Main window | \`new Frame("Title")\` |
| Button | Clickable | \`new Button("Click")\` |
| Label | Show text | \`new Label("Name:")\` |
| TextField | Input line | \`new TextField(20)\` |
| TextArea | Multi-line input | \`new TextArea(5,30)\` |
| Checkbox | Tick box | \`new Checkbox("Java")\` |
| Choice | Dropdown | \`new Choice()\` |

### Basic Window:
\`\`\`java
Frame f = new Frame("My App");
f.setSize(400, 300);
f.add(new Button("Hello!"));
f.setVisible(true);
\`\`\`

💡 Recipe: Create → setSize → add components → setVisible(true)!`
      }
    ]
  },
  {
    topicId: 'u4t2',
    title: 'Layout Managers',
    keywords: ['layout', 'FlowLayout', 'BorderLayout', 'GridLayout', 'CardLayout', 'GridBagLayout', 'layout manager', 'arrange', 'north south east west center'],
    content: `## 📐 Layout Managers

### 📖 Story Time: Arranging Furniture in a Room

When you move into a new house, you need to **arrange furniture** 🪑. You could:
- Put everything **in a line** (left to right) → FlowLayout
- Put things in **5 zones** (top, bottom, left, right, center) → BorderLayout
- Arrange in a **grid** (like a chess board) → GridLayout

**Layout Managers** decide HOW components are arranged inside a container.

---

### 🔷 1. FlowLayout (Default for Panel)

**Arranges components left-to-right, like words in a sentence 📝**

\`\`\`
┌──────────────────────────────┐
│ [Button1] [Button2] [Button3]│
│ [Button4] [Button5]          │
└──────────────────────────────┘
When no space → wraps to next line!
\`\`\`

\`\`\`java
Frame f = new Frame("FlowLayout Demo");
f.setLayout(new FlowLayout());  // Left to right
// f.setLayout(new FlowLayout(FlowLayout.CENTER));   // Centered
// f.setLayout(new FlowLayout(FlowLayout.LEFT, 10, 5));  // Left, gaps

f.add(new Button("One"));
f.add(new Button("Two"));
f.add(new Button("Three"));
f.add(new Button("Four"));
f.add(new Button("Five"));

f.setSize(300, 200);
f.setVisible(true);
\`\`\`

---

### 🔷 2. BorderLayout (Default for Frame!)

**Divides the container into 5 zones** like a compass 🧭

\`\`\`
┌──────────────────────────────┐
│           NORTH               │
├──────┬───────────────┬───────┤
│      │               │       │
│ WEST │    CENTER      │ EAST  │
│      │               │       │
├──────┴───────────────┴───────┤
│           SOUTH               │
└──────────────────────────────┘
\`\`\`

\`\`\`java
Frame f = new Frame("BorderLayout Demo");
f.setLayout(new BorderLayout());  // This is default for Frame!

f.add(new Button("↑ Menu Bar"), BorderLayout.NORTH);
f.add(new Button("← Sidebar"), BorderLayout.WEST);
f.add(new Button("📝 Main Content"), BorderLayout.CENTER);
f.add(new Button("→ Ads"), BorderLayout.EAST);
f.add(new Button("↓ Status Bar"), BorderLayout.SOUTH);

f.setSize(400, 300);
f.setVisible(true);
\`\`\`

⚠️ CENTER takes ALL remaining space! Each zone holds only 1 component (use Panel for multiple).

---

### 🔷 3. GridLayout

**Arranges components in a grid (rows × columns)** like a spreadsheet 📊

\`\`\`
┌─────────┬─────────┬─────────┐
│ Button1  │ Button2  │ Button3  │
├─────────┼─────────┼─────────┤
│ Button4  │ Button5  │ Button6  │
├─────────┼─────────┼─────────┤
│ Button7  │ Button8  │ Button9  │
└─────────┴─────────┴─────────┘
All cells are EQUAL size!
\`\`\`

\`\`\`java
Frame f = new Frame("Calculator Layout");
f.setLayout(new GridLayout(4, 3, 5, 5));  // 4 rows, 3 cols, 5px gaps

// Add 12 buttons
String[] buttons = {"7","8","9","4","5","6","1","2","3","0",".","="};
for (String text : buttons) {
    f.add(new Button(text));
}

f.setSize(300, 400);
f.setVisible(true);
\`\`\`

---

### 🔷 4. CardLayout

**Like a deck of cards** 🃏 — shows one "card" (panel) at a time, user switches between them.

\`\`\`java
Frame f = new Frame("CardLayout Demo");
CardLayout cards = new CardLayout();
Panel cardPanel = new Panel(cards);

// Create different "cards"
Panel card1 = new Panel();
card1.add(new Label("📄 Page 1: Welcome!"));
Panel card2 = new Panel();
card2.add(new Label("📄 Page 2: About Us"));

cardPanel.add(card1, "page1");
cardPanel.add(card2, "page2");

// Switch between cards
cards.show(cardPanel, "page1");  // Show page 1
// cards.next(cardPanel);        // Show next card
// cards.previous(cardPanel);    // Show previous card
\`\`\`

---

### 📊 Layout Manager Comparison:

| Layout | How It Works | Best For | Default In |
|--------|-------------|----------|-----------|
| **FlowLayout** | Left to right, wraps | Simple forms | Panel |
| **BorderLayout** | 5 zones (N,S,E,W,C) | Application windows | Frame |
| **GridLayout** | Equal-sized grid | Calculators, keypads | — |
| **CardLayout** | One at a time (tabs) | Wizards, tab views | — |
| **GridBagLayout** | Most flexible grid | Complex layouts | — |

### 🧪 Practice Questions
1. Which layout is default for Frame? For Panel?
2. How does FlowLayout arrange components?
3. What are the 5 zones in BorderLayout?
4. When would you use GridLayout?

💡 **Key Takeaway:** Layout managers auto-arrange components. FlowLayout = line-by-line. BorderLayout = 5 zones (default for Frame). GridLayout = equal grid. CardLayout = one at a time. Use Panel inside BorderLayout for complex layouts!`,
    commonQuestions: [
      {
        patterns: ['layout manager', 'FlowLayout', 'BorderLayout', 'GridLayout', 'CardLayout', 'layout in java'],
        answer: `## 📐 Layout Managers — Arranging Components!

### FlowLayout (default for Panel):
Left to right, wraps when full → 📝 like words in a sentence

### BorderLayout (default for Frame):
\`\`\`
    [NORTH]
[WEST][CENTER][EAST]
    [SOUTH]
\`\`\`

### GridLayout:
Equal-size grid like a calculator → \`new GridLayout(3, 3)\`

### CardLayout:
Shows one panel at a time → like tabs

\`\`\`java
frame.setLayout(new FlowLayout());            // Line by line
frame.setLayout(new BorderLayout());          // 5 zones
frame.setLayout(new GridLayout(3, 3));        // 3x3 grid
\`\`\`

💡 BorderLayout = default for Frame. FlowLayout = default for Panel.`
      }
    ]
  },
  {
    topicId: 'u4t3',
    title: 'Event Handling',
    keywords: ['event', 'listener', 'ActionListener', 'MouseListener', 'KeyListener', 'WindowListener', 'event handling', 'actionPerformed', 'event source', 'event handler', 'adapter', 'WindowAdapter'],
    content: `## 🎯 Event Handling

### 📖 Story Time: The Doorbell System 🔔

When someone presses your **doorbell** (button click):
1. The doorbell **detects** the press (Event Source)
2. It **sends a signal** to the speaker (Event Object)
3. The speaker **rings** (Event Handler/Listener)

In Java:
- **Event Source** = the component (Button, TextField, etc.)
- **Event Object** = the information about what happened
- **Event Listener** = the code that responds to the event

\`\`\`
User clicks button  →  Java creates ActionEvent  →  Your listener code runs!
   (Source)              (Event Object)                (Handler)
\`\`\`

---

### 🔷 The Delegation Event Model

Java follows the **Delegation Model** — the component DELEGATES (hands off) the event to a listener.

\`\`\`
Step 1: Create a component (Button)
Step 2: Create a listener (ActionListener)
Step 3: Register the listener with the component (btn.addActionListener(...))
Step 4: When event occurs → listener's method is automatically called!
\`\`\`

---

### 🔷 ActionListener (Most Common!)

Used for: Buttons clicks, Enter key in TextField

\`\`\`java
import java.awt.*;
import java.awt.event.*;

public class ButtonClickDemo extends Frame implements ActionListener {
    TextField nameField;
    Label greetLabel;
    
    ButtonClickDemo() {
        setTitle("Event Handling Demo 🎯");
        setLayout(new FlowLayout());
        
        nameField = new TextField(15);
        Button greetBtn = new Button("Say Hello!");
        greetLabel = new Label("                    ");
        
        // REGISTER listener — "Hey button, tell ME when you're clicked!"
        greetBtn.addActionListener(this);
        
        add(new Label("Name:"));
        add(nameField);
        add(greetBtn);
        add(greetLabel);
        
        setSize(350, 150);
        setVisible(true);
    }
    
    // This method runs AUTOMATICALLY when button is clicked!
    @Override
    public void actionPerformed(ActionEvent e) {
        String name = nameField.getText();
        greetLabel.setText("Hello, " + name + "! 👋");
    }
    
    public static void main(String[] args) {
        new ButtonClickDemo();
    }
}
\`\`\`

---

### 🔷 MouseListener

\`\`\`java
// Handles: click, press, release, enter, exit
class MouseDemo extends Frame implements MouseListener {
    Label status = new Label("Move your mouse! 🖱️");
    
    MouseDemo() {
        add(status);
        addMouseListener(this);  // Register on frame
        setSize(300, 200);
        setVisible(true);
    }
    
    public void mouseClicked(MouseEvent e) {
        status.setText("Clicked at (" + e.getX() + "," + e.getY() + ") 🎯");
    }
    public void mousePressed(MouseEvent e)  { status.setText("Pressed! 👇"); }
    public void mouseReleased(MouseEvent e) { status.setText("Released! 👆"); }
    public void mouseEntered(MouseEvent e)  { status.setText("Mouse entered! 🔵"); }
    public void mouseExited(MouseEvent e)   { status.setText("Mouse left! 🔴"); }
}
\`\`\`

---

### 🔷 KeyListener
\`\`\`java
class KeyDemo extends Frame implements KeyListener {
    Label display = new Label("Press any key...");
    
    KeyDemo() {
        add(display);
        addKeyListener(this);
        setSize(300, 150);
        setVisible(true);
    }
    
    public void keyPressed(KeyEvent e)  { display.setText("Key pressed: " + e.getKeyChar()); }
    public void keyReleased(KeyEvent e) { display.setText("Key released: " + e.getKeyChar()); }
    public void keyTyped(KeyEvent e)    { display.setText("Key typed: " + e.getKeyChar()); }
}
\`\`\`

---

### 🔷 WindowListener & Adapter Classes

**Problem:** WindowListener has 7 methods but you usually only need 1 (windowClosing)!
**Solution:** Use **WindowAdapter** — provides empty implementations, override only what you need!

\`\`\`java
// Long way (must implement ALL 7 methods) 😫
frame.addWindowListener(new WindowListener() {
    public void windowClosing(WindowEvent e) { System.exit(0); }
    public void windowOpened(WindowEvent e) {}      // empty!
    public void windowClosed(WindowEvent e) {}      // empty!
    public void windowIconified(WindowEvent e) {}   // empty!
    public void windowDeiconified(WindowEvent e) {} // empty!
    public void windowActivated(WindowEvent e) {}   // empty!
    public void windowDeactivated(WindowEvent e) {} // empty!
});

// Short way using Adapter! ✨
frame.addWindowListener(new WindowAdapter() {
    public void windowClosing(WindowEvent e) {
        System.exit(0);  // Only override what you need!
    }
});
\`\`\`

---

### 📊 Event Listener Summary:

| Listener | Methods | Used For |
|----------|---------|----------|
| **ActionListener** | actionPerformed() | Button click, Enter key |
| **MouseListener** | mouseClicked/Pressed/Released/Entered/Exited | Mouse events |
| **KeyListener** | keyPressed/Released/Typed | Keyboard events |
| **WindowListener** | windowClosing/Opened/Closed/... | Window events |
| **ItemListener** | itemStateChanged() | Checkbox, Choice changes |

### 🧪 Practice Questions
1. What is the Delegation Event Model?
2. What interface is used for button clicks?
3. What is an adapter class? Why is it useful?
4. How do you close a Frame on clicking the X button?

💡 **Key Takeaway:** Event handling: Source → Event → Listener. Register listener using \`addXxxListener()\`. Use Adapter classes to avoid implementing empty methods. ActionListener is the most common listener!`,
    commonQuestions: [
      {
        patterns: ['event handling', 'ActionListener', 'MouseListener', 'KeyListener', 'event model', 'listener', 'adapter class', 'WindowListener'],
        answer: `## 🎯 Event Handling — Responding to User Actions!

### The pattern:
\`\`\`
User action → Event created → Listener called → Your code runs!
\`\`\`

### Most Common — ActionListener (button click):
\`\`\`java
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Button clicked! 🎯");
    }
});
\`\`\`

### Listeners:
| Listener | For |
|----------|-----|
| ActionListener | Button clicks |
| MouseListener | Mouse click/enter/exit |
| KeyListener | Key press/release |
| WindowListener | Window close/open |

### Adapter (shortcut — override only what you need):
\`\`\`java
frame.addWindowListener(new WindowAdapter() {
    public void windowClosing(WindowEvent e) {
        System.exit(0);  // Close window
    }
});
\`\`\`

💡 Source → addListener() → Event → Handler method!`
      }
    ]
  },
  {
    topicId: 'u4t4',
    title: 'Applet Lifecycle',
    keywords: ['applet', 'lifecycle', 'init', 'start', 'stop', 'destroy', 'paint', 'Applet class', 'web browser', 'HTML', 'applet tag'],
    content: `## 🌐 Applet Lifecycle

### 📖 What is an Applet?

An **Applet** is a small Java program that runs inside a **web browser** 🌐. Think of it like a **mini-game embedded in a webpage**!

⚠️ **Note:** Applets are now **deprecated** (outdated). Modern web uses JavaScript. But they're important for exams and understanding Java's GUI history!

---

### 🔷 Applet Lifecycle — 5 Stages

Think of an applet like a **TV show** 📺:

\`\`\`
init()         start()         paint()         stop()         destroy()
  │               │               │               │               │
  ▼               ▼               ▼               ▼               ▼
Set up the    Show starts!    Draw on       Commercial       Show
stage 🎬      🎬 ACTION!     screen 🎨     break ⏸️        cancelled 🗑️
(called once) (can be called  (draws GUI)   (user leaves    (closing
               multiple times)              page)            browser)
               
Born → Running → Painting → Paused → Dead
\`\`\`

| Method | When Called | Purpose | Analogy |
|--------|-----------|---------|---------|
| **init()** | ONCE when applet loads | Initialize variables, set layout | Setting up stage 🎬 |
| **start()** | After init(), every time page is visited | Start animations, operations | Press Play ▶️ |
| **paint(Graphics g)** | When applet needs to draw/redraw | Draw graphics, text | Drawing on canvas 🎨 |
| **stop()** | When user leaves the page | Pause operations | Press Pause ⏸️ |
| **destroy()** | When browser closes | Free resources, cleanup | Press Stop ⏹️ |

---

### 🔷 Creating an Applet

\`\`\`java
import java.applet.Applet;
import java.awt.*;

public class MyApplet extends Applet {
    String message;
    
    // Called ONCE when applet loads
    public void init() {
        message = "Hello from Applet! 🌐";
        setBackground(Color.YELLOW);
        System.out.println("init() called - Setting up! 🎬");
    }
    
    // Called each time applet becomes visible
    public void start() {
        System.out.println("start() called - Running! ▶️");
    }
    
    // Called to draw on the applet
    public void paint(Graphics g) {
        g.setColor(Color.BLUE);
        g.setFont(new Font("Arial", Font.BOLD, 20));
        g.drawString(message, 50, 50);          // Text at (50,50)
        g.setColor(Color.RED);
        g.drawRect(30, 30, 200, 40);            // Rectangle border
        g.fillOval(100, 100, 80, 80);           // Filled circle
    }
    
    // Called when user leaves the page
    public void stop() {
        System.out.println("stop() called - Paused! ⏸️");
    }
    
    // Called when browser closes
    public void destroy() {
        System.out.println("destroy() called - Goodbye! 🗑️");
    }
}
\`\`\`

### Running an Applet

**Method 1: Using HTML**
\`\`\`html
<html>
<body>
    <applet code="MyApplet.class" width="300" height="200">
    </applet>
</body>
</html>
\`\`\`

**Method 2: Using appletviewer**
\`\`\`bash
appletviewer MyApplet.html
\`\`\`

---

### 🔷 Graphics Class Methods

\`\`\`java
public void paint(Graphics g) {
    // Drawing shapes
    g.drawLine(10, 10, 100, 100);       // Line from (10,10) to (100,100)
    g.drawRect(20, 20, 150, 100);       // Rectangle outline
    g.fillRect(20, 20, 150, 100);       // Filled rectangle
    g.drawOval(50, 50, 100, 80);        // Oval outline
    g.fillOval(50, 50, 100, 80);        // Filled oval
    g.drawArc(10, 10, 100, 100, 0, 90); // Arc
    
    // Text
    g.drawString("Hello!", 50, 50);     // Text at position
    g.setFont(new Font("Arial", Font.BOLD, 16));
    
    // Colors
    g.setColor(Color.RED);
    g.setColor(new Color(255, 128, 0));  // Custom RGB
}
\`\`\`

### 🧪 Practice Questions
1. What are the 5 methods in the applet lifecycle?
2. Which method is called only once?
3. Difference between \`start()\` and \`init()\`?
4. How do you run an applet?

💡 **Key Takeaway:** Applet lifecycle: init() → start() → paint() → stop() → destroy(). init() runs once, start()/stop() can run multiple times. Use Graphics class to draw shapes and text. Applets are deprecated but important for exams!`,
    commonQuestions: [
      {
        patterns: ['applet', 'applet lifecycle', 'init start stop destroy', 'what is applet', 'applet methods'],
        answer: `## 🌐 Applet Lifecycle!

An applet is a Java program that runs in a web browser (deprecated now).

### Lifecycle: 5 methods
\`\`\`
init() → start() → paint() → stop() → destroy()
Setup    Run       Draw      Pause     Cleanup
🎬       ▶️        🎨        ⏸️        🗑️
\`\`\`

| Method | When | How Many Times |
|--------|------|---------------|
| init() | Applet loads | ONCE only |
| start() | Page visited | Multiple times |
| paint() | Needs drawing | Multiple times |
| stop() | Leave page | Multiple times |
| destroy() | Browser closes | ONCE only |

\`\`\`java
public class MyApplet extends Applet {
    public void init() { /* setup */ }
    public void start() { /* begin */ }
    public void paint(Graphics g) {
        g.drawString("Hello!", 50, 50);
    }
    public void stop() { /* pause */ }
    public void destroy() { /* cleanup */ }
}
\`\`\`

💡 init() = called ONCE. start()/stop() = called MANY times.`
      }
    ]
  },
  {
    topicId: 'u4t5',
    title: 'Applet Parameters & Communication',
    keywords: ['applet parameter', 'getParameter', 'param tag', 'HTML', 'applet communication', 'applet context', 'showDocument', 'showStatus'],
    content: `## 📡 Applet Parameters & Communication

### 📖 Passing Information to an Applet

**Think of it like giving instructions to a waiter** 🧑‍🍳:
- You tell the waiter: "Table for 2, window seat, no spice please."
- The waiter takes your **parameters** and acts on them.

Similarly, you pass parameters from HTML to the Applet!

---

### 🔷 Passing Parameters from HTML

\`\`\`html
<html>
<body>
    <applet code="GreetingApplet.class" width="400" height="200">
        <!-- Parameters = instructions for the applet -->
        <param name="username" value="Rahul">
        <param name="color" value="blue">
        <param name="fontSize" value="24">
    </applet>
</body>
</html>
\`\`\`

### 🔷 Reading Parameters in Java

\`\`\`java
import java.applet.Applet;
import java.awt.*;

public class GreetingApplet extends Applet {
    String name;
    Color textColor;
    int size;
    
    public void init() {
        // Read parameters from HTML
        name = getParameter("username");
        if (name == null) name = "Guest";  // Default value!
        
        String colorStr = getParameter("color");
        if ("blue".equals(colorStr)) textColor = Color.BLUE;
        else if ("red".equals(colorStr)) textColor = Color.RED;
        else textColor = Color.BLACK;
        
        String sizeStr = getParameter("fontSize");
        size = (sizeStr != null) ? Integer.parseInt(sizeStr) : 16;
    }
    
    public void paint(Graphics g) {
        g.setColor(textColor);
        g.setFont(new Font("Arial", Font.BOLD, size));
        g.drawString("Hello, " + name + "! Welcome! 🌟", 20, 50);
    }
}
\`\`\`

---

### 🔷 Applet Communication Methods

\`\`\`java
// Show a message in browser's status bar
showStatus("Loading data... Please wait! ⏳");

// Open a new URL in the browser
getAppletContext().showDocument(new URL("https://google.com"));

// Open URL in new tab/window
getAppletContext().showDocument(new URL("https://google.com"), "_blank");

// Get information about the applet
getDocumentBase();  // URL of the HTML page
getCodeBase();      // URL where the .class file is
\`\`\`

---

### 📊 Parameter Methods:

| Method | Purpose | Returns |
|--------|---------|---------|
| \`getParameter("name")\` | Get HTML parameter value | String (or null) |
| \`showStatus("msg")\` | Show in browser status bar | void |
| \`getDocumentBase()\` | URL of HTML page | URL |
| \`getCodeBase()\` | URL of class file | URL |
| \`getAppletContext()\` | Browser context | AppletContext |

### 🧪 Practice Questions
1. How do you pass parameters to an applet from HTML?
2. What does \`getParameter()\` return if the parameter doesn't exist?
3. How do you navigate to a new URL from an applet?

💡 **Key Takeaway:** Use \`<param>\` tags in HTML to pass values to applets. Read them with \`getParameter()\`. Always check for null (parameter might not exist). Use \`getAppletContext().showDocument()\` for navigation.`,
    commonQuestions: [
      {
        patterns: ['applet parameter', 'getParameter', 'param tag', 'pass parameter', 'applet communication'],
        answer: `## 📡 Applet Parameters — HTML → Java!

### HTML side (pass parameters):
\`\`\`html
<applet code="MyApplet.class" width="300" height="200">
    <param name="username" value="Rahul">
    <param name="color" value="red">
</applet>
\`\`\`

### Java side (read parameters):
\`\`\`java
public void init() {
    String name = getParameter("username");  // "Rahul"
    if (name == null) name = "Guest";         // Default!
}
\`\`\`

### Useful methods:
| Method | Purpose |
|--------|---------|
| \`getParameter("name")\` | Get HTML param value |
| \`showStatus("msg")\` | Status bar message |
| \`showDocument(url)\` | Navigate to URL |

💡 Always check for \`null\` — parameter might not exist!`
      }
    ]
  },
  {
    topicId: 'u4t6',
    title: 'Swing Components',
    keywords: ['Swing', 'JFrame', 'JButton', 'JLabel', 'JTextField', 'JTextArea', 'JPanel', 'JComboBox', 'JTable', 'JMenuBar', 'JMenu', 'JMenuItem', 'JOptionPane', 'look and feel', 'lightweight', 'javax.swing'],
    content: `## 🎨 Swing Components

### 📖 AWT vs Swing — The Upgrade!

**AWT** was Java's FIRST GUI toolkit. But it had problems:
- Looked different on Windows vs Mac vs Linux 😕
- Limited components
- Heavy (used OS-native components)

**Swing** is the IMPROVED version! 🚀

| Feature | AWT | Swing |
|---------|-----|-------|
| Package | \`java.awt\` | \`javax.swing\` |
| Prefix | None | **J** (JButton, JFrame...) |
| Weight | Heavyweight (OS-native) | Lightweight (Java-drawn) |
| Look | Different on each OS | Same everywhere ✅ |
| Components | Basic | Rich (tables, trees, tabs!) |
| Speed | Faster | Slightly slower |

**Simple rule:** Swing = AWT components with a **"J" prefix** + more features!

---

### 🔷 Basic Swing Window

\`\`\`java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class SwingDemo extends JFrame {
    
    SwingDemo() {
        // Frame settings
        setTitle("Swing Demo 🎨");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  // Close properly!
        setLayout(new FlowLayout());
        
        // Create components (all start with "J"!)
        JLabel nameLabel = new JLabel("Enter your name:");
        JTextField nameField = new JTextField(15);
        JButton greetBtn = new JButton("Greet! 🎉");
        JLabel resultLabel = new JLabel("...");
        
        // Style the button
        greetBtn.setBackground(new Color(70, 130, 180));
        greetBtn.setForeground(Color.WHITE);
        
        // Add action listener
        greetBtn.addActionListener(e -> {
            String name = nameField.getText();
            resultLabel.setText("Hello, " + name + "! Welcome! 🌟");
        });
        
        // Add to frame
        add(nameLabel);
        add(nameField);
        add(greetBtn);
        add(resultLabel);
        
        setVisible(true);
    }
    
    public static void main(String[] args) {
        new SwingDemo();
    }
}
\`\`\`

---

### 🔷 Swing Components Gallery

\`\`\`java
// JLabel — display text/image
JLabel label = new JLabel("Welcome! 🌟");
label.setFont(new Font("Arial", Font.BOLD, 18));
label.setForeground(Color.BLUE);

// JButton — clickable button
JButton btn = new JButton("Click Me!");
btn.setToolTipText("Click this button to continue");

// JTextField — single-line input
JTextField field = new JTextField("Type here...", 20);

// JPasswordField — hidden input
JPasswordField passField = new JPasswordField(15);

// JTextArea — multi-line input
JTextArea area = new JTextArea(5, 20);
JScrollPane scroll = new JScrollPane(area);  // Add scrollbar!

// JCheckBox — tick boxes
JCheckBox cb = new JCheckBox("I agree to terms", false);

// JRadioButton — select one only
ButtonGroup group = new ButtonGroup();
JRadioButton rb1 = new JRadioButton("Male");
JRadioButton rb2 = new JRadioButton("Female");
group.add(rb1);
group.add(rb2);

// JComboBox — dropdown
String[] colors = {"Red", "Green", "Blue"};
JComboBox<String> combo = new JComboBox<>(colors);

// JList — scrollable list
String[] fruit = {"Apple", "Banana", "Cherry"};
JList<String> list = new JList<>(fruit);
\`\`\`

---

### 🔷 JOptionPane — Popup Dialogs!

\`\`\`java
// Message dialog (just information)
JOptionPane.showMessageDialog(null, "Welcome to Java! 🎉");

// Input dialog (ask for input)
String name = JOptionPane.showInputDialog("What is your name?");

// Confirm dialog (Yes/No/Cancel)
int choice = JOptionPane.showConfirmDialog(null, 
    "Are you sure?", "Confirm", JOptionPane.YES_NO_OPTION);
if (choice == JOptionPane.YES_OPTION) {
    System.out.println("User said Yes! ✅");
}
\`\`\`

---

### 🔷 JMenuBar — Application Menus

\`\`\`java
JMenuBar menuBar = new JMenuBar();

JMenu fileMenu = new JMenu("File");
fileMenu.add(new JMenuItem("New"));
fileMenu.add(new JMenuItem("Open"));
fileMenu.add(new JMenuItem("Save"));
fileMenu.addSeparator();  // Horizontal line
fileMenu.add(new JMenuItem("Exit"));

JMenu editMenu = new JMenu("Edit");
editMenu.add(new JMenuItem("Cut"));
editMenu.add(new JMenuItem("Copy"));
editMenu.add(new JMenuItem("Paste"));

menuBar.add(fileMenu);
menuBar.add(editMenu);

frame.setJMenuBar(menuBar);
\`\`\`

---

### 📊 AWT to Swing Mapping:

| AWT Component | Swing Equivalent |
|--------------|-----------------|
| Frame | **JFrame** |
| Panel | **JPanel** |
| Button | **JButton** |
| Label | **JLabel** |
| TextField | **JTextField** |
| TextArea | **JTextArea** |
| Checkbox | **JCheckBox** |
| Choice | **JComboBox** |
| List | **JList** |
| MenuBar | **JMenuBar** |
| Dialog | **JDialog** |

### 🧪 Practice Questions
1. What is the difference between AWT and Swing?
2. What prefix do Swing components use?
3. How do you create a popup dialog in Swing?
4. What is JOptionPane?

💡 **Key Takeaway:** Swing is the improved version of AWT. All Swing components start with "J". Use \`setDefaultCloseOperation(EXIT_ON_CLOSE)\` for proper window closing. JOptionPane creates easy popup dialogs. Swing looks the same on all platforms!`,
    commonQuestions: [
      {
        patterns: ['swing', 'JFrame', 'JButton', 'swing vs awt', 'swing component', 'JOptionPane', 'javax.swing'],
        answer: `## 🎨 Swing — Modern Java GUI!

### AWT vs Swing:
| AWT | Swing |
|-----|-------|
| \`java.awt\` | \`javax.swing\` |
| No prefix | **J** prefix (JButton, JFrame) |
| Heavyweight | Lightweight |
| Looks different on each OS | Same everywhere ✅ |

### Quick Example:
\`\`\`java
JFrame f = new JFrame("My App");
f.setSize(400, 300);
f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
f.add(new JButton("Click Me!"));
f.setVisible(true);
\`\`\`

### JOptionPane (popup dialogs):
\`\`\`java
JOptionPane.showMessageDialog(null, "Hello! 🎉");
String name = JOptionPane.showInputDialog("Name?");
int yn = JOptionPane.showConfirmDialog(null, "Sure?");
\`\`\`

### Components: JLabel, JButton, JTextField, JTextArea, JCheckBox, JComboBox, JRadioButton, JList, JMenuBar

💡 Swing = AWT + "J" prefix + more features + consistent look!`
      }
    ]
  },
  {
    topicId: 'u4qb',
    title: 'Unit 4 Question Bank (Parts A/B/C)',
    keywords: ['unit 4', 'question bank', 'part a', 'part b', 'part c', 'mcq', 'awt', 'swing', 'layout', 'applet', 'event handling', 'gui'],
    content: `## Unit 4 — Question Bank (Structured by Part)

### Part A — 1 Mark (MCQ) with Answers
1) Which package contains core AWT classes?
    - a) java.gui  b) java.awt  c) javax.swing  d) java.ui  
    **Answer:** b — All AWT components live in java.awt.

2) Default layout for a Frame?
    - a) FlowLayout  b) BorderLayout  c) GridLayout  d) CardLayout  
    **Answer:** b — Frame uses BorderLayout by default.

3) Default layout for a Panel?
    - a) FlowLayout  b) BorderLayout  c) GridLayout  d) Null layout  
    **Answer:** a — Panel defaults to FlowLayout.

4) Which is **lightweight** (drawn in Java, not by OS)?
    - a) AWT Button  b) Frame  c) Swing JButton  d) Dialog  
    **Answer:** c — Swing components are lightweight.

5) Which listener handles button clicks?
    - a) MouseListener  b) ActionListener  c) KeyListener  d) WindowListener  
    **Answer:** b — Button presses fire ActionEvents.

6) Applet lifecycle order?
    - a) start → init → paint → stop → destroy
    - b) init → start → paint → stop → destroy
    - c) paint → init → start → destroy → stop
    - d) init → paint → start → stop → destroy  
    **Answer:** b — init runs once, then start, paint; stop/destroy close things down.

7) Layout with five regions (N, S, E, W, Center)?
    - a) FlowLayout  b) GridLayout  c) BorderLayout  d) CardLayout  
    **Answer:** c — BorderLayout splits into five zones.

8) Method to close a JFrame when user clicks X?
    - a) disposeOnClose()  b) exitOnClose()  c) setDefaultCloseOperation()  d) close()  
    **Answer:** c — Call \`setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);\`.

9) Which component is a top-level Swing window?
    - a) JPanel  b) JButton  c) JLabel  d) JFrame  
    **Answer:** d — JFrame is the top-level container.

10) Which layout shows one panel at a time (like cards)?
     - a) CardLayout  b) GridLayout  c) FlowLayout  d) BorderLayout  
     **Answer:** a — CardLayout flips between panels.

11) Which thread should update Swing components?
     - a) Main thread  b) Event Dispatch Thread (EDT)  c) Garbage collector thread  d) Any worker thread  
     **Answer:** b — All Swing UI updates belong on the EDT.

12) Which class lets you override only the needed window-listener methods?
     - a) ActionEvent  b) WindowAdapter  c) MouseListener  d) Runnable  
     **Answer:** b — Adapter classes provide empty implementations.

13) Which method reads a value passed via the \`<param>\` tag in an applet?
     - a) readParam()  b) getParam()  c) getParameter()  d) getValue()  
    **Answer:** c — Use \`getParameter("name")\` to fetch HTML parameters.

14) Which layout is best for wizard-style multi-step forms?
     - a) BorderLayout  b) GridLayout  c) CardLayout  d) FlowLayout  
     **Answer:** c — CardLayout swaps panels like pages.

15) Which Swing container holds the top-level menus?
     - a) JPanel  b) JMenuBar  c) JMenuItem  d) JMenu  
     **Answer:** b — JMenuBar hosts menus like File/Edit.

### Part B — 2 Marks (Short Answers)
1) Differentiate AWT and Swing.  
    **Answer:** AWT (java.awt) is heavyweight, OS-rendered; Swing (javax.swing) is lightweight, pluggable look-and-feel, uses "J" prefixed components and richer widgets.

2) Define event source, event object, and listener.  
    **Answer:** Source = component raising the event, Event object = details (type, time, source), Listener = interface implementation handling the callback.

3) What do adapter classes provide?  
    **Answer:** Default (empty) implementations of listener interfaces so you override only needed methods (e.g., WindowAdapter, MouseAdapter).

4) Checkbox vs RadioButton?  
    **Answer:** Checkbox allows independent selection; radio buttons belong to a ButtonGroup to enforce single selection.

5) When would you choose GridLayout over FlowLayout?  
    **Answer:** Use GridLayout for uniform cell sizes (keypads, tables); FlowLayout for left-to-right wrapping content like simple forms.

6) How do you read parameters inside an applet?  
    **Answer:** Use \`getParameter("name")\`, null-check the value, parse as needed inside init/start.

7) What triggers repainting in AWT/Swing?  
    **Answer:** Calling \`repaint()\` schedules a paint; resizing, uncovering, or state changes can also trigger repaint via the EDT.

8) Why is Event Dispatch Thread (EDT) important in Swing?  
    **Answer:** All UI updates and listener callbacks must run on the EDT to avoid race conditions and inconsistent UI state.

9) Heavyweight vs lightweight components?  
    **Answer:** Heavyweight uses native OS peers (AWT Button, Frame), can flicker; lightweight (Swing JButton, JPanel) renders in Java for consistent look and easier layering.

10) Difference between \`paint()\`, \`repaint()\`, and \`update()\`?  
    **Answer:** \`repaint()\` schedules a refresh; \`update()\` (called before paint) clears background; \`paint()\` does actual drawing. In Swing, override \`paintComponent()\` for custom painting.

11) How do you ensure code runs on the Swing EDT?  
    **Answer:** Wrap UI updates in \`SwingUtilities.invokeLater(() -> {/* UI work */});\` or create components inside \`invokeLater\` to avoid threading bugs.

### Part C — 14 Marks (Descriptive/Programs)
1) Explain the delegation event model with a button click example.  
    **Answer (14M):**
    The **Delegation Event Model** is the event-handling mechanism used in Java AWT/Swing. A GUI component (the **event source**) generates an **event object** and **delegates** handling to registered **listener** objects.

    #### Key terms
    - **Source:** component that fires events (Button/JButton).
    - **Event object:** contains details (ActionEvent, MouseEvent, KeyEvent).
    - **Listener:** interface with callback methods (ActionListener, MouseListener, etc.).
    - **Registration:** source connects to listener using methods like \`addActionListener(...)\`.
    - **EDT (Swing):** Swing events and UI updates happen on the Event Dispatch Thread.

    #### Flow of a button click
    1. User clicks the button.
    2. Source creates an ActionEvent.
    3. Source notifies all registered ActionListener objects.
    4. Listener runs \`actionPerformed(...)\` and updates UI.

    #### Example (Swing button click)
    \`\`\`java
    import javax.swing.*;
    import java.awt.*;
    import java.awt.event.*;

    public class ButtonClickDemo {
        public static void main(String[] args) {
            SwingUtilities.invokeLater(() -> {
                JFrame f = new JFrame("Event Model Demo");
                f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                JLabel status = new JLabel("Not clicked", SwingConstants.CENTER);
                JButton btn = new JButton("Click");

                btn.addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        status.setText("Clicked! Source = " + e.getSource().getClass().getSimpleName());
                    }
                });

                f.setLayout(new BorderLayout());
                f.add(status, BorderLayout.CENTER);
                f.add(btn, BorderLayout.SOUTH);
                f.setSize(350, 160);
                f.setLocationRelativeTo(null);
                f.setVisible(true);
            });
        }
    }
    \`\`\`

    **Conclusion:** Delegation model = source fires event objects and delegates handling to listener callbacks registered by the program.

2) Design a Swing login form.  
    **Answer (14M):**
    A Swing login form contains fields for **username** and **password**, along with action buttons. A clean UI uses nested panels and layout managers.

    #### Components
    - JFrame (top-level window)
    - JLabel for captions
    - JTextField for username
    - JPasswordField for password
    - JButton for Login and Reset
    - JOptionPane for feedback

    #### Layout plan
    - JFrame: BorderLayout
    - Center: Form panel with GridLayout(2,2)
    - South: Buttons panel with FlowLayout

    #### Program
    \`\`\`java
    import javax.swing.*;
    import java.awt.*;

    public class LoginUI {
        public static void main(String[] args) {
            SwingUtilities.invokeLater(() -> {
                JFrame f = new JFrame("Login");
                f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                JTextField user = new JTextField(15);
                JPasswordField pass = new JPasswordField(15);

                JPanel form = new JPanel(new GridLayout(2, 2, 10, 10));
                form.setBorder(BorderFactory.createEmptyBorder(15, 15, 10, 15));
                form.add(new JLabel("Username:"));
                form.add(user);
                form.add(new JLabel("Password:"));
                form.add(pass);

                JButton login = new JButton("Login");
                JButton reset = new JButton("Reset");
                JPanel actions = new JPanel(new FlowLayout(FlowLayout.RIGHT));
                actions.add(reset);
                actions.add(login);

                login.addActionListener(e -> {
                    String u = user.getText().trim();
                    String p = new String(pass.getPassword());
                    if (u.isEmpty() || p.isEmpty()) {
                        JOptionPane.showMessageDialog(f, "Enter username and password", "Error", JOptionPane.ERROR_MESSAGE);
                        return;
                    }
                    if (u.equals("admin") && p.equals("1234")) {
                        JOptionPane.showMessageDialog(f, "Login successful", "OK", JOptionPane.INFORMATION_MESSAGE);
                    } else {
                        JOptionPane.showMessageDialog(f, "Invalid credentials", "Failed", JOptionPane.WARNING_MESSAGE);
                    }
                });

                reset.addActionListener(e -> {
                    user.setText("");
                    pass.setText("");
                    user.requestFocus();
                });

                f.setLayout(new BorderLayout());
                f.add(form, BorderLayout.CENTER);
                f.add(actions, BorderLayout.SOUTH);
                f.pack();
                f.setLocationRelativeTo(null);
                f.setVisible(true);
            });
        }
    }
    \`\`\`

    **Conclusion:** Use proper layouts + validation in ActionListeners and show feedback using JOptionPane.

3) Compare FlowLayout, BorderLayout, GridLayout, and CardLayout with use-cases.  
    **Answer (14M):**
    Layout managers arrange components automatically.

    #### FlowLayout
    - Places components in a row and wraps.
    - Default for Panel/JPanel.
    - Use: small toolbars, simple forms.

    #### BorderLayout
    - Five regions: NORTH, SOUTH, EAST, WEST, CENTER.
    - Default for Frame/JFrame.
    - Use: main windows with header/footer + center content.

    #### GridLayout
    - Uniform grid (rows × columns), same-size cells.
    - Use: calculator keypad, button matrices.

    #### CardLayout
    - Multiple panels (cards), only one visible.
    - Use: wizards, multi-step screens.

    #### Short comparison table
    | Layout | Best for | Key property |
    |---|---|---|
    | FlowLayout | small component groups | wrap behavior |
    | BorderLayout | window regions | 5 fixed zones |
    | GridLayout | uniform grids | equal cell sizes |
    | CardLayout | multi-page UI | one card visible |

    **Conclusion:** Real GUIs nest panels: e.g., BorderLayout frame + GridLayout form + FlowLayout buttons.

4) Write an applet to read a number param and draw its square with a rectangle and circle.  
    **Answer (14M):**
    An applet can read values from HTML using \`getParameter()\` and draw graphics using the \`Graphics\` object inside \`paint()\`.

    #### Program
    \`\`\`java
    import java.applet.Applet;
    import java.awt.*;

    public class ParamSquareApplet extends Applet {
        int n = 0;
        int sq = 0;

        public void init() {
            try {
                String s = getParameter("num");
                if (s != null) {
                    n = Integer.parseInt(s);
                    sq = n * n;
                }
            } catch (Exception e) {
                n = 0;
                sq = 0;
            }
        }

        public void paint(Graphics g) {
            g.drawString("Number = " + n, 20, 20);
            g.drawString("Square = " + sq, 20, 40);

            g.drawRect(20, 60, 120, 50);
            g.drawString("Rectangle", 30, 125);

            g.drawOval(170, 60, 60, 60);
            g.drawString("Circle", 182, 135);
        }
    }
    \`\`\`

    #### HTML parameter (concept)
    \`\`\`html
    <applet code="ParamSquareApplet.class" width="260" height="170">
      <param name="num" value="7" />
    </applet>
    \`\`\`

    **Conclusion:** Read params in init(), compute results, and draw shapes/text in paint(Graphics).

5) Build an AWT calculator keypad UI.  
    **Answer (14M):**
    A calculator keypad UI uses a **GridLayout** for keys and a **TextField** display. Events are handled using ActionListener.

    #### UI structure
    - Frame: BorderLayout
    - North: TextField display
    - Center: Panel (GridLayout 4×4) for digits/operators

    #### Sample program (basic operations)
    \`\`\`java
    import java.awt.*;
    import java.awt.event.*;

    public class SimpleCalcAWT extends Frame implements ActionListener {
        TextField display = new TextField();
        double first = 0;
        String op = "";

        public SimpleCalcAWT() {
            setTitle("AWT Calculator");
            setLayout(new BorderLayout());
            display.setEditable(false);
            add(display, BorderLayout.NORTH);

            Panel pad = new Panel(new GridLayout(4, 4, 5, 5));
            String[] keys = {
                "7","8","9","/",
                "4","5","6","*",
                "1","2","3","-",
                "C","0","=","+"
            };
            for (String k : keys) {
                Button b = new Button(k);
                b.addActionListener(this);
                pad.add(b);
            }
            add(pad, BorderLayout.CENTER);

            addWindowListener(new WindowAdapter() {
                public void windowClosing(WindowEvent e) { dispose(); }
            });

            setSize(300, 350);
            setVisible(true);
        }

        public void actionPerformed(ActionEvent e) {
            String cmd = e.getActionCommand();
            if (cmd.matches("[0-9]")) {
                display.setText(display.getText() + cmd);
                return;
            }
            if (cmd.equals("C")) {
                display.setText("");
                first = 0;
                op = "";
                return;
            }
            if (cmd.equals("=")) {
                double second = display.getText().isEmpty() ? 0 : Double.parseDouble(display.getText());
                double res = 0;
                if (op.equals("+")) res = first + second;
                else if (op.equals("-")) res = first - second;
                else if (op.equals("*")) res = first * second;
                else if (op.equals("/")) res = (second == 0) ? 0 : first / second;
                display.setText(String.valueOf(res));
                op = "";
                return;
            }
            // operator pressed
            first = display.getText().isEmpty() ? 0 : Double.parseDouble(display.getText());
            op = cmd;
            display.setText("");
        }

        public static void main(String[] args) {
            new SimpleCalcAWT();
        }
    }
    \`\`\`

    **Conclusion:** GridLayout is perfect for keypad buttons; ActionListener converts clicks into calculation steps.

6) Create a two-page wizard using Swing + CardLayout.  
    **Answer (14M):**
    A wizard shows one page at a time (Step 1, Step 2, ...). \`CardLayout\` manages multiple panels like a stack of cards.

    #### Program (two cards)
    \`\`\`java
    import javax.swing.*;
    import java.awt.*;

    public class TwoPageWizard {
        public static void main(String[] args) {
            SwingUtilities.invokeLater(() -> {
                JFrame f = new JFrame("Wizard");
                f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                CardLayout cl = new CardLayout();
                JPanel cards = new JPanel(cl);

                JPanel page1 = new JPanel(new GridLayout(2, 2, 10, 10));
                page1.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));
                JTextField name = new JTextField();
                JTextField dept = new JTextField();
                page1.add(new JLabel("Name:"));
                page1.add(name);
                page1.add(new JLabel("Department:"));
                page1.add(dept);

                JLabel review = new JLabel("Review", SwingConstants.CENTER);
                JPanel page2 = new JPanel(new BorderLayout());
                page2.add(review, BorderLayout.CENTER);

                cards.add(page1, "P1");
                cards.add(page2, "P2");

                JButton prev = new JButton("Previous");
                JButton next = new JButton("Next");

                prev.addActionListener(e -> cl.show(cards, "P1"));
                next.addActionListener(e -> {
                    review.setText("Name: " + name.getText() + " | Dept: " + dept.getText());
                    cl.show(cards, "P2");
                });

                JPanel footer = new JPanel(new FlowLayout(FlowLayout.RIGHT));
                footer.add(prev);
                footer.add(next);

                f.setLayout(new BorderLayout());
                f.add(cards, BorderLayout.CENTER);
                f.add(footer, BorderLayout.SOUTH);
                f.setSize(450, 220);
                f.setLocationRelativeTo(null);
                f.setVisible(true);
            });
        }
    }
    \`\`\`

    **Conclusion:** CardLayout simplifies multi-step screens. Next/Previous buttons switch cards and can update the review page before navigation.
`
  }
];

export default unit4Knowledge;
