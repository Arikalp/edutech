<div align="center">

<br/>

# EduAgent AI

**The AI co-pilot built for live classrooms.**

EduAgent turns a teacher's spoken lecture into structured learning — transcribing speech in real time, generating quiz questions on the fly, and producing AI-assisted session notes automatically. All while the class is still in session.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![LiveKit](https://img.shields.io/badge/LiveKit-WebRTC-1B1F2E?style=for-the-badge&logo=webrtc)](https://livekit.io/)
[![Firebase](https://img.shields.io/badge/Firebase_v12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<br/>

</div>

---
## Developed By -> Team Code Thrifters
| Name | GitHub |
|------|--------|
| Sankalp Saini | [@Arikalp](https://github.com/Arikalp) |
| Utsav Singh | [@githubutsav](https://github.com/githubutsav) |
| Tushar Bajpai | [@Tushar-Bajpai](https://github.com/Tushar-Bajpai) |
| Subrat Dwivedi | [@subrat-dwi](https://github.com/subrat-dwi) |



### Everything about this Project -> [Document](https://docs.google.com/document/d/1UXwLvzFhOpdLDYMYuY9UnDAbN8R_D5fVX8iI4Tp-yKo/edit?usp=sharing)


---

## The Problem

Most edtech tools are built *around* the classroom — LMS platforms, homework trackers, gradebooks. They capture what happens before and after a lesson, but the lesson itself stays a black box.

Teachers end up doing double work: teach the class, then manually write notes, create follow-up quizzes, and assess comprehension. The cognitive overhead is real, and it pulls focus away from students.

**EduAgent flips this.** It sits inside the live class, listening, and turns what the teacher is already saying into structured learning material — automatically.

---

## What It Does

### 🎙️ Live Transcription
Audio from the teacher's microphone is transcribed in real time during a LiveKit session. No post-processing, no waiting until the class ends — the transcript builds as the lecture unfolds.

### ⚡ Automatic Quiz Generation
The live transcript is continuously fed into an AI pipeline that extracts key concepts and generates quiz questions in real time. Students can take the quiz mid-session or at the end of class — directly inside the platform.

### 📝 AI-Generated Session Notes
At the end of a session, EduAgent compiles the full transcript into clean, structured notes with AI assistance. Teachers get an exportable summary they can share with students or archive for future reference.

### 🎥 Full-Featured Virtual Classroom
Built on LiveKit's WebRTC infrastructure, the classroom supports multi-party video, active speaker highlighting, and a real-time chat sidebar — the full video conferencing experience with zero third-party dependency.

### 💬 In-Session AI Chatbot
A floating AI assistant is available throughout the session. Teachers and students can ask questions about the ongoing lecture, clarify concepts, or query past session content.

### 📊 Session History & Analytics
Every session is archived. Teachers can review past transcripts, revisit AI-generated notes, and access quiz performance breakdowns per student. The dashboard surfaces overall engagement and mastery signals over time.

### 🔒 Authentication & Role Management
Firebase Auth handles email/password and Google Sign-in. The platform supports distinct Teacher and Student roles with separate dashboard views and permissions.

> **Developer Mock Mode:** Running without Firebase credentials? The app automatically falls back to a localStorage-based mock mode — full UI exploration with zero setup.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (React 19, App Router) |
| Styling | Tailwind CSS v4 + custom CSS animations |
| Real-Time Video | LiveKit React SDK + `livekit-server-sdk` |
| Auth & Database | Firebase v12 (Auth, Firestore) |
| AI Pipeline | Groq API (transcription, quiz gen, notes) |
| Animations | Framer Motion + CSS keyframes |
| Testing | Vitest |
| State Management | Zustand (`useAppStore`) |

---

## Architecture

```
┌────────────────────────────────────────────────────────┐
│                     Browser Client                     │
│                                                        │
│  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐  │
│  │  VideoRoom  │   │  QuizWidget  │   │  ChatBot    │  │
│  │  (LiveKit)  │   │  (real-time) │   │  (floating) │  │
│  └──────┬──────┘   └──────┬───────┘   └──────┬──────┘  │
└─────────│─────────────────│──────────────────│─────────┘
          │                 │                  │
          ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│               Next.js API Routes (Edge)                 │
│                                                         │
│  /transcribe  /generate-quiz  /analyze-quiz             │
│  /generate-notes              /chat  /livekit/token     │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┼──────────────┐
          ▼            ▼              ▼
    LiveKit SFU     Groq API      Firebase
    (WebRTC)       (AI tasks)    (Auth + Firestore)
```

**Why this scales:**
- LiveKit's SFU architecture means clients publish media once — bandwidth grows at O(1) per client, not O(N²) like peer-to-peer mesh.
- Next.js API routes deploy as serverless functions, handling traffic spikes elastically with zero idle cost.
- AI tasks (transcription, quiz gen, note compilation) are decoupled from the render thread — the UI stays responsive regardless of processing time.
- Firestore handles real-time sync and horizontal scaling at the database layer automatically.

---

## Project Structure

```
edutech/
├── app/
│   ├── api/
│   │   ├── transcribe/          # Real-time audio → text
│   │   ├── generate-quiz/       # Transcript → quiz questions
│   │   ├── analyze-quiz/        # Score + evaluate quiz responses
│   │   ├── generate-notes/      # Transcript → session notes
│   │   ├── chat/                # In-session AI chatbot
│   │   └── livekit/token/       # LiveKit JWT token generator
│   ├── classroom/[roomId]/      # Live video session page
│   ├── create-quiz/[roomCode]/  # Quiz creation flow
│   ├── dashboard/               # Teacher & student workspaces
│   ├── profile/                 # Session archives & analytics
│   └── components/
│       ├── VideoRoom.tsx         # Multi-party LiveKit component
│       ├── TeacherDashboard.tsx  # Teacher control panel
│       ├── StudentDashboard.tsx  # Student-facing view
│       ├── FloatingChatbot.tsx   # In-session AI assistant
│       ├── TakeQuizModal.tsx     # Student quiz interface
│       ├── QuizReviewModal.tsx   # Post-quiz review
│       └── ...                  # Auth, modals, onboarding, UI
├── lib/
│   ├── firestore.ts             # Firestore helpers
│   ├── transcript.ts            # Transcript processing utilities
│   └── utils.ts
├── __tests__/                   # Vitest test suite
├── Firebaseconfig.ts
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
- **Node.js** `v18+` or `v20+`
- **Firebase project** with Authentication (Email + Google) and Firestore enabled
- **LiveKit** Cloud account or self-hosted instance

### 1. Clone & Install

```bash
git clone https://github.com/your-org/edutech.git
cd edutech
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_measurement_id"

# LiveKit
LIVEKIT_URL="wss://your-project.livekit.cloud"
LIVEKIT_API_KEY="your_livekit_api_key"
LIVEKIT_API_SECRET="your_livekit_api_secret"
NEXT_PUBLIC_LIVEKIT_URL="wss://your-project.livekit.cloud"
```

> Omit Firebase keys to run in **Developer Mock Mode** — all auth and data operations are simulated in `localStorage`.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Run Tests

```bash
npx vitest
```

---

## Roadmap

These features are designed and scoped — implementation is the next step.

- **Class Energy Analytics** — Real-time engagement scoring based on participation signals, with automatic alerts when attention drops.
- **Attention Recovery Prompts** — Context-aware suggestions for polls, movement breaks, or discussion prompts when the session loses momentum.
- **Multilingual Support** — Live language-switch suggestions based on detected student comprehension signals.
- **Local Analogy Engine** — On-the-fly generation of region-specific, culturally relevant analogies to reinforce difficult concepts.
- **Student Progress Tracking** — Cross-session mastery graphs, topic-level heatmaps, and personalized homework recommendations.

---

## Design System

EduAgent uses a custom dark design system with glassmorphic UI components and smooth micro-animations.

| Token | Value |
|---|---|
| Background | `#121318` / `#090A0F` |
| Signature Gradient | `#A07CFE` → `#FE8495` → `#FFD270` |
| Primary Accent | `#cfbcff` (soft lavender) |
| Secondary Accent | `#ffb2ba` (soft salmon) |
| Glass Effect | `backdrop-blur: 24px` + glowing outline |

---

## License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2026 Team Code Thrifters

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">
  Built for <strong>OSC EdTech 3.0 Hackathon</strong>
</div>