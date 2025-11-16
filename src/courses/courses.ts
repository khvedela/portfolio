// Import markdown files as raw text
import htmlBasicsLesson1 from "./html-basics/lesson-1.md?raw";
import htmlBasicsLesson2 from "./html-basics/lesson-2.md?raw";
import htmlBasicsLesson3 from "./html-basics/lesson-3.md?raw";
import htmlBasicsLesson4 from "./html-basics/lesson-4.md?raw";
import htmlBasicsLesson5 from "./html-basics/lesson-5.md?raw";

import cssBasicsLesson1 from "./css-basics/lesson-1.md?raw";
import cssBasicsLesson2 from "./css-basics/lesson-2.md?raw";
import cssBasicsLesson3 from "./css-basics/lesson-3.md?raw";
import cssBasicsLesson4 from "./css-basics/lesson-4.md?raw";
import cssBasicsLesson5 from "./css-basics/lesson-5.md?raw";

import jsBasicsLesson1 from "./javascript-basics/lesson-1.md?raw";
import jsBasicsLesson2 from "./javascript-basics/lesson-2.md?raw";
import jsBasicsLesson3 from "./javascript-basics/lesson-3.md?raw";
import jsBasicsLesson4 from "./javascript-basics/lesson-4.md?raw";
import jsBasicsLesson5 from "./javascript-basics/lesson-5.md?raw";

export type ExerciseType = 'multiple-choice' | 'code-challenge' | 'text-answer';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseCategory = 'Web Development Basics' | 'Advanced Web Development' | 'Backend Development' | 'Other';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  hint?: string;
  options?: string[]; // For multiple choice
  correctAnswer: string | number; // Index for MC, code/text for others
  explanation?: string; // Shown after answering
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  content: string; // Markdown content
  duration: number; // minutes
  exercises: Exercise[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  difficulty: DifficultyLevel;
  duration: number; // total hours
  tags: string[];
  thumbnail?: string;
  published: boolean;
  lessons: Lesson[];
  learningOutcomes: string[];
}

// HTML Basics Course
const htmlBasicsCourse: Course = {
  id: "html-basics",
  title: "What is HTML? Building Your First Web Page",
  description: "Learn the fundamentals of HTML from scratch. No prior experience needed. Build real web pages and understand the foundation of every website.",
  category: "Web Development Basics",
  difficulty: "beginner",
  duration: 2.5, // hours
  tags: ["html", "web-development", "beginner", "frontend"],
  published: true,
  learningOutcomes: [
    "Understand what HTML is and how it works",
    "Create properly structured HTML documents",
    "Use common HTML elements (headings, paragraphs, links, images)",
    "Build semantic, accessible web pages",
    "Apply HTML best practices"
  ],
  lessons: [
    {
      id: "what-is-html",
      courseId: "html-basics",
      title: "What is HTML?",
      order: 1,
      duration: 15,
      content: htmlBasicsLesson1,
      exercises: [
        {
          id: "html-definition",
          type: "multiple-choice",
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
          ],
          correctAnswer: 0,
          explanation: "HTML stands for HyperText Markup Language. It's the standard markup language for creating web pages."
        },
        {
          id: "html-purpose",
          type: "multiple-choice",
          question: "What is the primary purpose of HTML?",
          options: [
            "To style web pages",
            "To structure content on web pages",
            "To add interactivity to web pages",
            "To store data in databases"
          ],
          correctAnswer: 1,
          explanation: "HTML is used to structure content on web pages. CSS handles styling, and JavaScript adds interactivity."
        }
      ]
    },
    {
      id: "html-structure",
      courseId: "html-basics",
      title: "HTML Document Structure",
      order: 2,
      duration: 20,
      content: htmlBasicsLesson2,
      exercises: [
        {
          id: "doctype-purpose",
          type: "multiple-choice",
          question: "Why do we need <!DOCTYPE html> at the start of an HTML document?",
          options: [
            "It's optional and not really needed",
            "It tells the browser which version of HTML we're using",
            "It makes the page load faster",
            "It adds security to the website"
          ],
          correctAnswer: 1,
          explanation: "<!DOCTYPE html> tells the browser that this is an HTML5 document, ensuring it renders correctly in standards mode."
        },
        {
          id: "basic-structure",
          type: "code-challenge",
          question: "Create a basic HTML document structure with a title 'My First Page' and a heading that says 'Hello World'.",
          hint: "Start with <!DOCTYPE html>, then add <html>, <head>, and <body> tags. Put the title in <head> and the heading in <body>.",
          correctAnswer: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
          explanation: "This is the basic structure every HTML page needs: DOCTYPE declaration, html tag wrapping everything, head for metadata, and body for visible content."
        }
      ]
    },
    {
      id: "text-elements",
      courseId: "html-basics",
      title: "Working with Text: Headings and Paragraphs",
      order: 3,
      duration: 25,
      content: htmlBasicsLesson3,
      exercises: [
        {
          id: "heading-levels",
          type: "multiple-choice",
          question: "How many heading levels does HTML provide?",
          options: [
            "3 levels (h1, h2, h3)",
            "6 levels (h1 through h6)",
            "10 levels (h1 through h10)",
            "Unlimited levels"
          ],
          correctAnswer: 1,
          explanation: "HTML provides 6 heading levels from <h1> (most important) to <h6> (least important)."
        },
        {
          id: "create-article",
          type: "code-challenge",
          question: "Create a simple article structure with a main heading 'The Web', a subheading 'How it Works', and a paragraph explaining something about the web.",
          hint: "Use <h1> for the main heading, <h2> for the subheading, and <p> for the paragraph.",
          correctAnswer: `<h1>The Web</h1>
<h2>How it Works</h2>
<p>The web is a system of interconnected documents and resources, linked by hyperlinks and accessed via the internet.</p>`,
          explanation: "This shows proper heading hierarchy - h1 for the main topic, h2 for subsections, and p for body text."
        }
      ]
    },
    {
      id: "links-images",
      courseId: "html-basics",
      title: "Links and Images: Connecting the Web",
      order: 4,
      duration: 30,
      content: htmlBasicsLesson4,
      exercises: [
        {
          id: "link-attribute",
          type: "multiple-choice",
          question: "Which attribute specifies the destination of a link?",
          options: [
            "src",
            "href",
            "link",
            "url"
          ],
          correctAnswer: 1,
          explanation: "The 'href' attribute (hypertext reference) specifies where the link points to."
        },
        {
          id: "create-link",
          type: "code-challenge",
          question: "Create a link to 'https://google.com' with the text 'Search Google' that opens in a new tab.",
          hint: "Use the <a> tag with href and target attributes. Use target='_blank' for new tab.",
          correctAnswer: `<a href="https://google.com" target="_blank">Search Google</a>`,
          explanation: "The target='_blank' attribute makes links open in a new tab. Always include descriptive link text for accessibility."
        }
      ]
    },
    {
      id: "semantic-html",
      courseId: "html-basics",
      title: "Semantic HTML: Writing Meaningful Code",
      order: 5,
      duration: 25,
      content: htmlBasicsLesson5,
      exercises: [
        {
          id: "semantic-benefits",
          type: "multiple-choice",
          question: "What is a key benefit of using semantic HTML?",
          options: [
            "It makes your website load faster",
            "It helps search engines and screen readers understand your content",
            "It automatically styles your website",
            "It prevents hackers from attacking your site"
          ],
          correctAnswer: 1,
          explanation: "Semantic HTML provides meaning to your content structure, improving accessibility and SEO."
        },
        {
          id: "semantic-structure",
          type: "code-challenge",
          question: "Create a semantic structure for a blog post with a header containing a title, a main section with content, and a footer with copyright.",
          hint: "Use <header>, <main>, and <footer> tags. Add <h1> in header, <p> in main, and <p> in footer.",
          correctAnswer: `<header>
  <h1>My Blog Post</h1>
</header>
<main>
  <p>This is the main content of my blog post.</p>
</main>
<footer>
  <p>&copy; 2025 My Blog</p>
</footer>`,
          explanation: "Semantic elements like header, main, and footer clearly define the purpose of each section, making your HTML more meaningful."
        }
      ]
    }
  ]
};

// CSS Basics Course
const cssBasicsCourse: Course = {
  id: "css-basics",
  title: "CSS Fundamentals: Styling the Web",
  description: "Master CSS from the ground up. Learn to style beautiful, responsive websites with modern CSS techniques including Flexbox and responsive design.",
  category: "Web Development Basics",
  difficulty: "beginner",
  duration: 3,
  tags: ["css", "web-development", "styling", "frontend", "responsive"],
  published: true,
  learningOutcomes: [
    "Understand how CSS works and different ways to apply styles",
    "Master CSS selectors and specificity",
    "Use the box model for proper spacing and sizing",
    "Apply colors and typography effectively",
    "Build responsive layouts with Flexbox",
    "Create mobile-first responsive designs"
  ],
  lessons: [
    {
      id: "intro-to-css",
      courseId: "css-basics",
      title: "Introduction to CSS",
      order: 1,
      duration: 20,
      content: cssBasicsLesson1,
      exercises: [
        {
          id: "css-stands-for",
          type: "multiple-choice",
          question: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
          ],
          correctAnswer: 1,
          explanation: "CSS stands for Cascading Style Sheets. The 'cascading' refers to how styles flow down and can override each other."
        },
        {
          id: "best-css-method",
          type: "multiple-choice",
          question: "Which is the best practice for adding CSS to a website?",
          options: [
            "Inline styles (style attribute)",
            "Internal styles (style tag)",
            "External stylesheet (separate .css file)",
            "All methods are equally good"
          ],
          correctAnswer: 2,
          explanation: "External stylesheets are best practice because they keep content separate from presentation and allow styles to be reused across multiple pages."
        }
      ]
    },
    {
      id: "css-selectors",
      courseId: "css-basics",
      title: "CSS Selectors",
      order: 2,
      duration: 25,
      content: cssBasicsLesson2,
      exercises: [
        {
          id: "class-selector-syntax",
          type: "multiple-choice",
          question: "How do you select elements with class 'button' in CSS?",
          options: [
            "#button",
            ".button",
            "button",
            "*button"
          ],
          correctAnswer: 1,
          explanation: "Class selectors use a dot (.) prefix. So .button selects all elements with class='button'."
        },
        {
          id: "create-selector",
          type: "code-challenge",
          question: "Write CSS to make all paragraphs inside an article element have a gray color (#666).",
          hint: "Use a descendant selector (space between selectors) to target paragraphs inside articles.",
          correctAnswer: `article p {
  color: #666;
}`,
          explanation: "The descendant selector (space) targets all p elements that are inside article elements, at any nesting level."
        }
      ]
    },
    {
      id: "box-model",
      courseId: "css-basics",
      title: "The CSS Box Model",
      order: 3,
      duration: 30,
      content: cssBasicsLesson3,
      exercises: [
        {
          id: "box-model-layers",
          type: "multiple-choice",
          question: "What is the correct order of the box model from inside to outside?",
          options: [
            "Margin, Border, Padding, Content",
            "Content, Padding, Border, Margin",
            "Content, Border, Padding, Margin",
            "Padding, Content, Border, Margin"
          ],
          correctAnswer: 1,
          explanation: "From inside out: Content (the actual content), Padding (space inside), Border (the edge), Margin (space outside)."
        },
        {
          id: "box-sizing-fix",
          type: "code-challenge",
          question: "Write CSS to make a box with class 'container' that is 400px wide with 20px padding and a 2px border, where the total width stays exactly 400px.",
          hint: "Use box-sizing: border-box to include padding and border in the width.",
          correctAnswer: `.container {
  width: 400px;
  padding: 20px;
  border: 2px solid black;
  box-sizing: border-box;
}`,
          explanation: "box-sizing: border-box makes width include padding and border, so the total width is exactly 400px instead of 444px."
        }
      ]
    },
    {
      id: "colors-typography",
      courseId: "css-basics",
      title: "Colors and Typography",
      order: 4,
      duration: 25,
      content: cssBasicsLesson4,
      exercises: [
        {
          id: "best-color-format",
          type: "multiple-choice",
          question: "Which CSS color format is best for creating color variations by adjusting lightness?",
          options: [
            "Named colors (red, blue, etc.)",
            "Hexadecimal (#ff0000)",
            "RGB (rgb(255, 0, 0))",
            "HSL (hsl(0, 100%, 50%))"
          ],
          correctAnswer: 3,
          explanation: "HSL (Hue, Saturation, Lightness) is most intuitive because you can easily adjust the lightness value to create darker or lighter variations of the same color."
        },
        {
          id: "typography-scale",
          type: "code-challenge",
          question: "Create a CSS rule for the body element with a readable font stack (sans-serif), base font size of 16px, and line-height of 1.6 for better readability.",
          hint: "Use font-family with a font stack, font-size in pixels, and line-height as a unitless number.",
          correctAnswer: `body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}`,
          explanation: "A good font stack provides fallbacks, 16px is a standard readable size, and line-height of 1.5-1.8 improves readability significantly."
        }
      ]
    },
    {
      id: "flexbox-responsive",
      courseId: "css-basics",
      title: "Flexbox and Responsive Design",
      order: 5,
      duration: 35,
      content: cssBasicsLesson5,
      exercises: [
        {
          id: "flexbox-center",
          type: "multiple-choice",
          question: "Which combination of flexbox properties centers items both horizontally and vertically?",
          options: [
            "align-items: center; justify-content: center;",
            "align-content: center; justify-items: center;",
            "vertical-align: middle; text-align: center;",
            "margin: auto; padding: auto;"
          ],
          correctAnswer: 0,
          explanation: "justify-content centers along the main axis (horizontal by default) and align-items centers along the cross axis (vertical by default)."
        },
        {
          id: "responsive-layout",
          type: "code-challenge",
          question: "Create a flex container with class 'cards' that wraps items to new lines and has 20px gap between items.",
          hint: "Use display: flex, flex-wrap: wrap, and gap: 20px",
          correctAnswer: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}`,
          explanation: "flex-wrap: wrap allows items to move to new lines when there's not enough space, and gap creates consistent spacing between all items."
        }
      ]
    }
  ]
};

// JavaScript Basics Course
const jsBasicsCourse: Course = {
  id: "javascript-basics",
  title: "JavaScript Essentials: Programming the Web",
  description: "Learn JavaScript from scratch and make your websites interactive. Master variables, functions, DOM manipulation, events, and data structures.",
  category: "Web Development Basics",
  difficulty: "beginner",
  duration: 4,
  tags: ["javascript", "programming", "web-development", "frontend", "dom"],
  published: true,
  learningOutcomes: [
    "Understand JavaScript fundamentals and syntax",
    "Write functions and work with scope",
    "Manipulate the DOM to create interactive pages",
    "Handle user events effectively",
    "Work with arrays and objects",
    "Apply modern JavaScript features"
  ],
  lessons: [
    {
      id: "intro-to-javascript",
      courseId: "javascript-basics",
      title: "Introduction to JavaScript",
      order: 1,
      duration: 25,
      content: jsBasicsLesson1,
      exercises: [
        {
          id: "javascript-purpose",
          type: "multiple-choice",
          question: "What is the primary purpose of JavaScript?",
          options: [
            "To style web pages",
            "To structure web content",
            "To add interactivity and behavior to websites",
            "To manage databases"
          ],
          correctAnswer: 2,
          explanation: "JavaScript adds interactivity and dynamic behavior to websites. HTML structures content, CSS styles it, and JavaScript makes it interactive."
        },
        {
          id: "variable-declaration",
          type: "code-challenge",
          question: "Create a constant variable named 'siteName' with the value 'My Website' and a regular variable 'visitors' with the value 100.",
          hint: "Use const for values that won't change and let for values that might change.",
          correctAnswer: `const siteName = "My Website";
let visitors = 100;`,
          explanation: "Use const for constants that won't be reassigned, and let for variables that might change. Avoid using var in modern JavaScript."
        }
      ]
    },
    {
      id: "functions",
      courseId: "javascript-basics",
      title: "Functions: Reusable Code",
      order: 2,
      duration: 30,
      content: jsBasicsLesson2,
      exercises: [
        {
          id: "function-return",
          type: "multiple-choice",
          question: "What does a function return if there is no return statement?",
          options: [
            "0",
            "null",
            "undefined",
            "false"
          ],
          correctAnswer: 2,
          explanation: "Functions without a return statement implicitly return undefined."
        },
        {
          id: "create-function",
          type: "code-challenge",
          question: "Create a function named 'greetUser' that takes a name parameter and returns a greeting message like 'Hello, [name]!'.",
          hint: "Use function declaration or arrow function, take one parameter, and return a string with template literals.",
          correctAnswer: `function greetUser(name) {
  return \`Hello, \${name}!\`;
}`,
          explanation: "Functions can return values. Template literals (backticks) make it easy to embed variables in strings."
        }
      ]
    },
    {
      id: "dom-manipulation",
      courseId: "javascript-basics",
      title: "DOM Manipulation",
      order: 3,
      duration: 35,
      content: jsBasicsLesson3,
      exercises: [
        {
          id: "query-selector",
          type: "multiple-choice",
          question: "Which method is most flexible for selecting elements in the DOM?",
          options: [
            "getElementById()",
            "getElementsByClassName()",
            "querySelector()",
            "getElementsByTagName()"
          ],
          correctAnswer: 2,
          explanation: "querySelector() is most flexible because it accepts any CSS selector, making it powerful and versatile."
        },
        {
          id: "change-content",
          type: "code-challenge",
          question: "Write code to select an element with id 'title' and change its text content to 'Welcome!'.",
          hint: "Use document.querySelector or getElementById, then set textContent property.",
          correctAnswer: `const title = document.querySelector('#title');
title.textContent = 'Welcome!';`,
          explanation: "querySelector with # selects by ID, and textContent safely sets the text content of an element."
        }
      ]
    },
    {
      id: "events",
      courseId: "javascript-basics",
      title: "Events: User Interactions",
      order: 4,
      duration: 30,
      content: jsBasicsLesson4,
      exercises: [
        {
          id: "prevent-default",
          type: "multiple-choice",
          question: "What does e.preventDefault() do in an event handler?",
          options: [
            "Stops the event from bubbling up",
            "Prevents the default browser action",
            "Removes the event listener",
            "Cancels all future events"
          ],
          correctAnswer: 1,
          explanation: "e.preventDefault() prevents the default browser behavior (like form submission or link navigation) but allows your code to run."
        },
        {
          id: "add-event-listener",
          type: "code-challenge",
          question: "Add a click event listener to a button with id 'myButton' that logs 'Button clicked!' to the console.",
          hint: "Select the button, then use addEventListener with 'click' event and a function that calls console.log.",
          correctAnswer: `const button = document.querySelector('#myButton');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});`,
          explanation: "addEventListener attaches event handlers without overwriting existing ones. Arrow functions provide a clean syntax for callbacks."
        }
      ]
    },
    {
      id: "arrays-objects",
      courseId: "javascript-basics",
      title: "Arrays and Objects",
      order: 5,
      duration: 40,
      content: jsBasicsLesson5,
      exercises: [
        {
          id: "array-method",
          type: "multiple-choice",
          question: "Which array method creates a new array with all elements that pass a test?",
          options: [
            "map()",
            "filter()",
            "reduce()",
            "forEach()"
          ],
          correctAnswer: 1,
          explanation: "filter() creates a new array containing only elements that pass the test function. map() transforms elements, reduce() combines them, and forEach() just iterates."
        },
        {
          id: "work-with-objects",
          type: "code-challenge",
          question: "Create an object named 'user' with properties: name (string), age (number), and isActive (boolean set to true).",
          hint: "Use object literal syntax with curly braces, key-value pairs separated by colons.",
          correctAnswer: `const user = {
  name: "John",
  age: 25,
  isActive: true
};`,
          explanation: "Objects store data as key-value pairs. Property names don't need quotes (unless they have special characters), and values can be any type."
        }
      ]
    }
  ]
};

// Export all courses
export const courses: Course[] = [
  htmlBasicsCourse,
  cssBasicsCourse,
  jsBasicsCourse
];

// Utility functions
export const getCourse = (courseId: string): Course | undefined => {
  return courses.find(course => course.id === courseId);
};

export const getLesson = (courseId: string, lessonId: string): Lesson | undefined => {
  const course = getCourse(courseId);
  return course?.lessons.find(lesson => lesson.id === lessonId);
};

export const getNextLesson = (courseId: string, currentLessonId: string): Lesson | undefined => {
  const course = getCourse(courseId);
  if (!course) return undefined;
  
  const currentLesson = course.lessons.find(l => l.id === currentLessonId);
  if (!currentLesson) return undefined;
  
  return course.lessons.find(l => l.order === currentLesson.order + 1);
};

export const getPreviousLesson = (courseId: string, currentLessonId: string): Lesson | undefined => {
  const course = getCourse(courseId);
  if (!course) return undefined;
  
  const currentLesson = course.lessons.find(l => l.id === currentLessonId);
  if (!currentLesson) return undefined;
  
  return course.lessons.find(l => l.order === currentLesson.order - 1);
};

export const getPublishedCourses = (): Course[] => {
  return courses.filter(course => course.published);
};

export const getCoursesByDifficulty = (difficulty: DifficultyLevel): Course[] => {
  return courses.filter(course => course.difficulty === difficulty);
};

export const getCoursesByTag = (tag: string): Course[] => {
  return courses.filter(course => 
    course.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};
