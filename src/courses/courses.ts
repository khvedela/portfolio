// Import markdown files as raw text
import htmlBasicsLesson1 from "./html-basics/lesson-1.md?raw";
import htmlBasicsLesson2 from "./html-basics/lesson-2.md?raw";
import htmlBasicsLesson3 from "./html-basics/lesson-3.md?raw";
import htmlBasicsLesson4 from "./html-basics/lesson-4.md?raw";
import htmlBasicsLesson5 from "./html-basics/lesson-5.md?raw";

export type ExerciseType = 'multiple-choice' | 'code-challenge' | 'text-answer';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

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

// Export all courses
export const courses: Course[] = [
  htmlBasicsCourse
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
