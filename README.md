# ⚡ VeriResume: ATS Optimization Engine

**VeriResume** is a high-performance full-stack web application designed to automatically tailor resumes to specific job descriptions using LLMs. It generates a pixel-perfect, ATS-compliant Harvard OCS format resume by seamlessly interpolating and rewriting your experiences against targeted technical requirements.

Built with bleeding-edge technologies, VeriResume provides a premium, consumer-grade experience with real-time UI/UX, robust background task processing, and a high-fidelity client-side PDF rendering engine.

## 🚀 Key Features

*   **Intelligent AI Fabrication**: Driven by `nvidia/nemotron-3-super-120b-a12b:free` (via OpenRouter), the engine automatically blends and rewrites project history for 100% job description matching without dropping authentic context.
*   **Harvard OCS Renderer**: Instead of generic templates, VeriResume programmatically renders the industry-standard Harvard A4 plain-text Resume style to ensure maximum Applicant Tracking System (ATS) compatibility.
*   **Intelligent Pagination Engine**: A bespoke block-level pagination algorithm automatically prevents text overflow and slice-cutting by tracking exact Times-New-Roman kerning heights and natively splitting onto multiple distinct pages before export.
*   **Side-by-Side Audit Workflow**: The modern "Audit" dashboard allows users to compare their exact changes and additions in a sticky, side-by-side grid before exporting identical layouts to PDF.
*   **Credits & Transaction Engine**: Manages user limits utilizing a pessimistic credit transaction layer synced to Supabase data models.

## 💻 Tech Stack

### Frontend (User Interface)
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS + Shadcn UI Components
*   **Rendering**: `html-to-image` and `jsPDF` for seamless high-res PDF extraction without color space crashes
*   **Animation**: Native CSS + Radix UI Primitives

### Backend (AI & Logic)
*   **Framework**: Django (Python) + Django REST Framework
*   **Background Processing**: Celery + Redis (for handling slow LLM response iterations securely)
*   **AI Integrations**: OpenRouter (`openai` wrapper package) for highly configurable prompt injection
*   **Parsing**: PyPDF2 and `docx2txt` for ingesting legacy resumes

### Infrastructure (Data & Auth)
*   **Database**: Supabase (PostgreSQL)
*   **Authentication**: Supabase Auth (Magic Links, OAuth)
*   **Storage**: Supabase Storage Buckets

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/veriresume.git
   cd veriresume
   ```

2. **Frontend Setup:**
   Navigate into the Next.js workspace and install dependencies.
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

3. **Backend Setup:**
   Navigate to the Django workspace, create a virtual environment, and boot it.
   ```bash
   cd Backend
   python -m venv venv
   source venv/Scripts/activate # or venv/bin/activate on Mac
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

4. **Environment Variables:**
   You will need to construct `.env` files in both the `Frontend/` and `Backend/` directories.
   *   **Frontend**: Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   *   **Backend**: Requires `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `OPENAI_API_KEY` (mapped to OpenRouter).

## 📄 License

This project is licensed under the MIT License.