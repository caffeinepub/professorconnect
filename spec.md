# Specification

## Summary
**Goal:** Build ProfessorConnect, a full-stack academic job portal for faculty positions at Indian institutes (IITs, NITs, IISc, IISERs), with a Motoko backend and a multi-page React frontend.

**Planned changes:**
- Create a Motoko backend actor storing faculty job listings (institute, position title, department, location, deadline, apply URL) with query, filter, add, edit, and remove functions; seed with 10+ realistic Engineering/Science listings from Indian institutes
- Build a React frontend with client-side routing for four pages: Home, Jobs, About, Contact
- Persistent navigation bar with "ProfessorConnect" brand/logo on the left and page links on the right; footer with "© 2026 ProfessorConnect. All rights reserved."
- Home page: hero section (brand name, tagline "Find the Latest Assistant Professor Jobs in Engineering and Science", CTA "Browse Jobs" button), key features cards (Latest Faculty Job Listings, Easy Job Search, Centralized Academic Job Portal), and a stats/highlights strip
- Jobs page: card grid fetching all listings from the backend, each card showing institute, position, department, location, deadline, and "Apply Now" button; real-time free-text search bar and filter dropdowns for Institute, Department, Location, and Position Type
- About page: mission, target users (PhD scholars, postdocs, academic professionals), and future vision sections in professional academic tone
- Contact page: Name/Email/Message form with validation and success confirmation; placeholder contact email displayed
- Apply cohesive navy/dark blue, white, and dark gray visual theme with clean sans-serif typography, card shadows, and mobile-first responsive layout
- Use generated logo mark in the navigation bar and hero background illustration on the Home page
