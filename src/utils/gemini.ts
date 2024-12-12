import { GoogleGenerativeAI } from '@google/generative-ai';

export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const generateCareerPrompt = (career: string) => `
Act as TechBro, your personal tech career advisor. Create a comprehensive career progression path for ${career} with detailed steps and resource links.

# 🎯 Career Overview: ${career}

## Role Description
- Core responsibilities and daily tasks
- Industry impact and importance
- Current market demand: [Latest statistics and trends]

## Industry Outlook
- Growth projection: [2024-2028 forecast]
- Average salary range: [Entry to Senior level]
- Top hiring companies

# 🛠️ Essential Skills Foundation

## Technical Skills
1. Programming Languages
   - Primary: [Core languages with proficiency levels]
   - Secondary: [Supporting languages]
   - [Link to recommended learning resources]

2. Core Technologies
   - Frameworks & Libraries
   - Tools & Platforms
   - [Links to official documentation]

## Soft Skills
- Communication
- Problem-solving
- Team collaboration
- [Links to soft skills development courses]

# 📚 Career Path Options

## Path A: Traditional Education Route
1. University Degree
   - Recommended majors
   - Key courses
   - [Links to top university programs]

2. Internships
   - Companies offering internships
   - Required skills
   - [Links to internship platforms]

## Path B: Self-Taught Route
1. Online Learning
   - Structured learning path
   - [Links to recommended courses]
   - Timeline: [Detailed monthly breakdown]

2. Project Portfolio
   - Essential projects to build
   - Open source contributions
   - [Links to project ideas and repositories]

# 💼 Specialization Tracks

## Industry Track
1. Entry Level (0-2 years)
   - Role: Junior ${career}
   - Skills focus
   - [Links to entry-level positions]

2. Mid Level (2-5 years)
   - Role: Senior ${career}
   - Advanced skills
   - [Links to advanced certifications]

3. Expert Level (5+ years)
   - Role: Lead/Principal ${career}
   - Leadership skills
   - [Links to leadership resources]

## Research/Academic Track
1. Advanced Degrees
   - Master's programs
   - PhD opportunities
   - [Links to top research programs]

2. Research Areas
   - Emerging technologies
   - Publication opportunities
   - [Links to research journals]

# 🎓 Learning Resources

## Online Courses
1. Foundational Courses
   - [Coursera - Relevant Specialization](https://www.coursera.org)
   - [Udemy - Comprehensive Course](https://www.udemy.com)
   - [edX - Professional Certificate](https://www.edx.org)

2. Advanced Learning
   - [Pluralsight - Technology Path](https://www.pluralsight.com)
   - [LinkedIn Learning - Skill Path](https://www.linkedin.com/learning)

## Books & Documentation
- Essential reading list
- Official documentation
- [Links to recommended books]

## Community Resources
- Professional associations
- Online communities
- [Links to relevant Discord/Slack channels]

# 🚀 Next Steps
1. Choose your path (Traditional/Self-taught)
2. Create a learning schedule
3. Build your portfolio
4. Network within the community

Format this response with proper markdown, including links and bullet points. Make it visually organized and easy to follow.`;

export const extractLinks = (text: string): string[] => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    links.push(match[2]);
  }

  return links;
};