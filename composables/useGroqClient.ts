import Groq from 'groq-sdk';
import type { AIToeflIntegratedFeedback, ToeflIntegratedContent } from '@/types/toeflWriting';
import type { 
  AIToeflIndependentFeedback, 
  IndependentWritingPrompt, 
  // IndependentPromptStyle, // Not used directly here, can be removed if not needed elsewhere from this import
} from '@/types/toeflWriting';

// Define interfaces for IELTS Writing feedback
export interface IeltsWritingCriterionScore {
  criterion: string;
  score: number; // Could be a band score (e.g., 0-9) or a sub-score
  feedback: string;
  suggestions?: string[]; // Optional suggestions for this criterion
}

export interface IeltsWritingFeedback { // For essays (Task 2 Academic & General)
  overallBandScore: number;
  summary: string;
  taskAchievement: IeltsWritingCriterionScore;
  coherenceAndCohesion: IeltsWritingCriterionScore;
  lexicalResource: IeltsWritingCriterionScore;
  grammaticalRangeAndAccuracy: IeltsWritingCriterionScore;
  essayStructure?: IeltsWritingCriterionScore; 
  argumentDevelopment?: IeltsWritingCriterionScore;
}

// New interface for IELTS General Training Letter Feedback (Task 1)
export interface IeltsGeneralLetterFeedback {
  overallBandScore: number;
  summary: string;
  taskAchievement: IeltsWritingCriterionScore; // Covers all bullet points
  coherenceAndCohesion: IeltsWritingCriterionScore;
  lexicalResource: IeltsWritingCriterionScore;
  grammaticalRangeAndAccuracy: IeltsWritingCriterionScore;
  toneAppropriateness: IeltsWritingCriterionScore; // Specific to letter writing
}
export interface IeltsWritingCriterionScore {
  criterion: string;
  score: number; // Could be a band score (e.g., 0-9) or a sub-score
  feedback: string;
  suggestions?: string[]; // Optional suggestions for this criterion
}

export interface IeltsWritingFeedback { // For essays (Task 2 Academic & General)
  overallBandScore: number;
  summary: string;
  taskAchievement: IeltsWritingCriterionScore;
  coherenceAndCohesion: IeltsWritingCriterionScore;
  lexicalResource: IeltsWritingCriterionScore;
  grammaticalRangeAndAccuracy: IeltsWritingCriterionScore;
  essayStructure?: IeltsWritingCriterionScore; 
  argumentDevelopment?: IeltsWritingCriterionScore;
}
export interface predefinedIndependentPrompts {
  id: string;
  style: string;
  title: string;
  question: string;       
} 

export interface MbtiQuestion {
  id: string;
  optionA: string;
  optionB: string;
  keyA: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  keyB: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
}

export interface VocabularyQuestion {
  id: string; // e.g., 'antonim-1'
  type: 'Antonim' | 'Analogi' | 'Idiom' | 'Pembentukan Kata' | 'Pengelompokan Kata' | 'Ejaan' | 'Sinonim';
  questionText: string;
  options: { id: string; text: string }[]; // e.g., [{id: 'a', text: 'Option A'}, ...]
  correctAnswerId: string; // e.g., 'a'
  explanation: string;
}
export interface SnbtPdOption {
  text: string;
  id: string; // e.g., 'a', 'b', 'c', 'd'
}

export interface SnbtPdQuestion {
  id: string;
  questionText: string;
  options: SnbtPdOption[];
  correctAnswerId: string; // id of the correct SnbtPdOption
  questionType: 'Syllogism' | 'Equivalence' | 'Negation' | 'Conclusion' | 'GeneralDeductive';
  explanation?: string; // Optional explanation for the answer
}

export interface SnbtPdQuiz {
  questions: SnbtPdQuestion[];
}
export interface SnbtPenalaranInduktifQuestion {
  id: string;
  question_text: string;
  topic: 'Generalisasi' | 'Analogi' | 'Sebab-Akibat';
  options: { id: string; text: string }[];
  correct_answer_id: string;
  explanation: string;
}
export interface SnbtPpuOption {
  text: string;
  id: string; // e.g., 'a', 'b', 'c', 'd', 'e'
}

export interface SnbtPpuQuestion {
  id: string;
  topic: 'Sinonim & Antonim' | 'Ide Pokok & Makna' | 'Kata & Bentuk Kata' | 'Kesesuaian Wacana' | 'Hubungan Antar Paragraf' | 'Umum';
  passage?: string; // Optional passage for context-based questions
  questionText: string;
  options: SnbtPpuOption[];
  correctAnswerId: string; // id of the correct SnbtPpuOption
  explanation?: string; // Optional explanation for the answer
}

export interface SnbtPpuQuiz {
  questions: SnbtPpuQuestion[];
}
export interface SnbtPenalaranKuantitatifQuestion {
  id: string;
  question_text: string;
  topic: 'Kuantitas' | 'Hubungan Matematika Sederhana' | 'Operasi Aritmetika Dasar';
  options: { id: string; text: string }[];
  correct_answer_id: string;
  explanation: string;
}
export interface IndonesianLiteracyQuestion {
  id: string;
  questionText: string;
  topic: 'Pemahaman Bacaan' | 'Struktur Kalimat' | 'Idiom & Peribahasa' | 'Sinonim & Antonim';
  passage?: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
}
export interface EnglishLiteracyQuestion {
  id: string;
  questionText: string;
  topic: 'Vocabulary' | 'Reading Comprehension' | 'Inference' | 'Idioms' | 'Grammar';
  passage?: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
}
export interface SnbtLiterasiMatematikaQuestion {
  id: string; // e.g., "lm_q1"
  questionText: string; // The main question text, can include LaTeX for formulas e.g. \\frac{a}{b}
  topic: 'Aljabar & Fungsi' | 'Geometri & Pengukuran' | 'Teori Bilangan' | 'Kombinatorika & Peluang' | 'Analisis Data & Statistika';
  // Optional: if the question refers to a specific diagram/table image that would be manually added later
  // diagramUrl?: string; 
  options: { id: string; text: string }[]; // e.g., [{id: 'a', text: 'Option A (can include LaTeX)'}, ...]
  correctAnswerId: string; // e.g., 'a'
  explanation: string; // Detailed step-by-step explanation in Indonesian (can include LaTeX)
}
export interface SnbtUltraKuantitatifQuestion {
  id: string; // e.g., "uq_q1"
  questionText: string; // The main question text, can include LaTeX for formulas e.g. \\frac{a}{b}
  topic: 'Operasi Numerik & Aljabar Lanjut' | 'Interpretasi Data Kompleks' | 'Logika & Pola Abstrak' | 'Rasio, Laju & Campuran Multivariabel' | 'Matematika Keuangan Lanjut';
  // Optional: if the question refers to a specific diagram/table image that would be manually added later
  // diagramUrl?: string; 
  options: { id: string; text: string }[]; // e.g., [{id: 'a', text: 'Option A (can include LaTeX)'}, {id: 'b', text: 'Option B'}, {id: 'c', text: 'Option C'}, {id: 'd', text: 'Option D'}]
  correctAnswerId: string; // e.g., 'a'
  explanation: string; // Detailed step-by-step explanation in Indonesian (can include LaTeX)
}

export interface SnbtPenalaranMatematikaQuestion {
  id: string; // e.g., "pm_q1"
  questionText: string; // The main question text, can include LaTeX for formulas e.g. \\frac{a}{b}
  topic: 'Bilangan' | 'Himpunan & Pola Bilangan' | 'Aljabar & Fungsi' | 'Aritmetika Sosial, Perbandingan & Rasio' | 'Persamaan Garis Lurus & Fungsi' | 'Pengukuran & Geometri' | 'Data & Ketidakpastian';
  // Optional: if the question refers to a specific diagram/table image that would be manually added later
  // diagramUrl?: string; 
  options: { id: string; text: string }[]; // e.g., [{id: 'a', text: 'Option A (can include LaTeX)'}, {id: 'b', text: 'Option B'}, {id: 'c', text: 'Option C'}, {id: 'd', text: 'Option D'}]
  correctAnswerId: string; // e.g., 'a'
  explanation: string; // Detailed step-by-step explanation in Indonesian (can include LaTeX)
}

export const useGroqClient = () => {
  // Ensure API key is taken from public runtime config
  const groqApiKey = "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";


  const groq = new Groq({
    apiKey: groqApiKey,
    dangerouslyAllowBrowser: true, // Necessary for client-side usage
  });

  const chatCompletion = async (systemPrompt: string, userPrompt: string): Promise<Groq.Chat.Completions.ChatCompletion> => {
    if (!groqApiKey) {
      // Simulate a delay and return a mock error response if API key is missing
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error('Groq API key not configured. Cannot process request.');
    }
    try {
      return await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        model: 'qwen-qwq-32b', // Or your preferred model
        temperature: 0.7,
        top_p: 1,
        stream: false,
        response_format: { type: "json_object" }, // if you want to enforce JSON output
      });
    } catch (error) {
      console.error('Error fetching chat completion from Groq:', error);
      throw error;
    }
  };
async function generateVocabularyQuestions(): Promise<VocabularyQuestion[]> {
    const questionTypes = [
      'Antonim',
      'Analogi',
      'Idiom',
      'Pembentukan Kata',
      'Pengelompokan Kata',
      'Ejaan',
      'Sinonim',
    ];

    // Refined System Prompt
    const systemPrompt = `Anda adalah AI yang ahli dalam membuat soal latihan kosakata bahasa Indonesia. Buatlah DELAPAN soal pilihan ganda (dengan empat opsi jawaban A, B, C, D) untuk tipe-tipe berikut: ${questionTypes.join(', ')}. Pastikan ada satu soal untuk setiap tipe.
    Format output HARUS berupa sebuah array JSON yang valid (JSON array of objects). Setiap objek dalam array mewakili satu soal dan HARUS memiliki properti berikut:
    1.  \`id\`: ID unik untuk soal (string, contoh: 'antonim-1').
    2.  \`type\`: Tipe soal (string, salah satu dari: 'Antonim', 'Analogi', 'Idiom', 'Pembentukan Kata', 'Pengelompokan Kata', 'Ejaan', 'Sinonim').
    3.  \`questionText\`: Teks pertanyaan utama (string).
    4.  \`options\`: Array berisi objek pilihan jawaban (array of objects), masing-masing dengan \`id\` (string, contoh: 'a', 'b', 'c', 'd') dan \`text\` (string, teks pilihan).
    5.  \`correctAnswerId\`: ID dari pilihan jawaban yang benar (string, contoh: 'c').
    6.  \`explanation\`: Penjelasan singkat mengapa jawaban tersebut benar (string).

    Contoh SATU objek soal dalam array JSON:
    {
      "id": "sinonim-1",
      "type": "Sinonim",
      "questionText": "Sinonim dari kata 'bahagia' adalah...",
      "options": [
        {"id": "a", "text": "Sedih"},
        {"id": "b", "text": "Gembira"},
        {"id": "c", "text": "Marah"},
        {"id": "d", "text": "Takut"}
      ],
      "correctAnswerId": "b",
      "explanation": "Gembira memiliki arti yang sama dengan bahagia."
    }
    Pastikan output adalah array JSON yang valid dengan DELAPAN soal unik, satu untuk setiap tipe yang diminta. Jangan sertakan teks atau penjelasan lain di luar array JSON itu sendiri.`;

    const userPrompt = "Tolong buatkan 8 soal kosakata sesuai instruksi dalam format array JSON.";

    try {
      const response = await chatCompletion(systemPrompt, userPrompt);
      const responseContent = response.choices[0]?.message?.content;
      
      if (!responseContent) {
        console.error('Respons Groq kosong.');
        throw new Error('Respons dari AI kosong. Coba lagi.');
      }

      try {
        // Attempt to parse the content directly as it should be a JSON array string
        const questions = JSON.parse(responseContent).soal;
        
        if (Array.isArray(questions) && questions.length === 8) { // Check for 8 questions
          // Basic validation for each question structure (can be more thorough)
          const isValidStructure = questions.every(q => 
            q.id && q.type && q.questionText && Array.isArray(q.options) && 
            q.options.every((opt: any) => opt.id && opt.text) && 
            q.correctAnswerId && q.explanation
          );
          if (!isValidStructure) {
            console.error('Struktur data soal dari Groq tidak lengkap atau tidak sesuai:', questions);
            throw new Error('Format data soal dari AI tidak lengkap. Coba lagi.');
          }
          return questions.map((q, index) => ({ ...q, id: q.id || `${q.type.toLowerCase().replace(/\s+/g, '-')}-${index + 1}` }));
        } else if (Array.isArray(questions)) {
            console.error('Jumlah soal dari Groq tidak sesuai harapan:', questions.length, 'soal diterima. Response mentah:', responseContent);
            throw new Error(`Gagal mendapatkan jumlah soal yang benar dari AI. Diterima ${questions.length} soal, diharapkan 8. Coba lagi.`);
        }
        console.error('Format JSON soal tidak valid (bukan array) dari Groq:', responseContent);
        throw new Error('Format JSON soal dari AI bukan array. Coba lagi.');
      } catch (jsonError: any) {
        console.error('Gagal mem-parse JSON soal dari Groq:', jsonError.message, 'Response mentah:', responseContent);
        throw new Error('Gagal memproses format soal dari AI. Coba lagi.');
      }
    } catch (e: any) {
      console.error('Groq API Error (generateVocabularyQuestions):', e.message);
      // Re-throw the original error or a more user-friendly one
      throw new Error(`Terjadi kesalahan saat menghubungi AI: ${e.message}. Coba lagi.`);
    }
  }
  async function generateSnbtPenalaranInduktifQuestions(): Promise<SnbtPenalaranInduktifQuestion[]> {


    const systemPrompt = `
      Anda adalah asisten AI yang ahli dalam membuat soal-soal Tes Potensi Skolastik (TPS) untuk Seleksi Nasional Berdasarkan Tes (SNBT) di Indonesia, khususnya untuk subtes Penalaran Induktif.
      Tugas Anda adalah membuat 10 soal pilihan ganda yang berkualitas tinggi dalam bahasa Indonesia.
      Setiap soal harus menguji salah satu dari tiga jenis penalaran induktif berikut:
      1.  Generalisasi: Menyimpulkan pernyataan umum dari fakta-fakta khusus. Contoh format: "A, B, C merupakan X; maka D juga X."
      2.  Analogi: Membandingkan dua pasangan unsur, mencari hubungan yang sama pada pasangan berikutnya. Contoh format: "Air : Cair = Es : ?"
      3.  Sebab-Akibat (Hubungan Kausal): Menentukan kesimpulan kausal yang logis dari rangkaian fakta atau peristiwa. Contoh format: "X menimbulkan Y, maka jika X terjadi, Z?"

      Pastikan soal-soal mencakup ketiga jenis penalaran tersebut secara seimbang jika memungkinkan, atau setidaknya ada variasi.
      Setiap soal harus memiliki:
      - "id": string (nomor soal, e.g., "pi_q1", "pi_q2", ... "pi_q10")
      - "question_text": string (teks pertanyaan yang jelas dan lengkap, bisa berupa teks singkat atau paragraf jika diperlukan untuk konteks)
      - "topic": string (salah satu dari 'Generalisasi', 'Analogi', 'Sebab-Akibat')
      - "options": array of objects, masing-masing dengan "id" (e.g., "a", "b", "c", "d", "e") dan "text" (teks pilihan jawaban). Harus ada 5 pilihan jawaban.
      - "correct_answer_id": string (id dari pilihan jawaban yang benar)
      - "explanation": string (penjelasan rinci mengapa jawaban tersebut benar dan mengapa pilihan lain salah, dalam bahasa Indonesia)

      Format output HARUS berupa JSON array yang valid. Contoh satu soal:
      {
        "id": "pi_q1",
        "question_text": "Semua hewan mamalia menyusui anaknya. Kucing adalah hewan mamalia. Maka kesimpulan yang paling tepat adalah...",
        "topic": "Generalisasi",
        "options": [
          { "id": "a", "text": "Kucing tidak menyusui anaknya." },
          { "id": "b", "text": "Kucing menyusui anaknya." },
          { "id": "c", "text": "Semua hewan menyusui adalah kucing." },
          { "id": "d", "text": "Anak kucing tidak disusui." },
          { "id": "e", "text": "Tidak dapat disimpulkan." }
        ],
        "correct_answer_id": "b",
        "explanation": "Ini adalah contoh generalisasi. Karena kucing adalah mamalia, dan semua mamalia menyusui anaknya, maka kucing menyusui anaknya."
      }
      Pastikan ada 10 soal dalam array JSON.
    `;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Buatkan saya 10 soal Penalaran Induktif untuk SNBT sesuai dengan instruksi sistem.',
          },
        ],
        model: 'llama-3.3-70b-versatile', // Pastikan model ini tersedia dan sesuai
        temperature: 0.7,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' }, // Meminta output JSON
      });

      const content = chatCompletion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from Groq API.');
      }

      // Groq API dengan response_format: { type: 'json_object' } akan mengembalikan string JSON
      // yang mungkin perlu di-parse lagi jika ia membungkus array dalam sebuah objek (misal, {"questions": [...]})
      // atau jika ia langsung mengembalikan array sebagai string.
      // Kita asumsikan model akan mengembalikan objek dengan properti yang berisi array soal, atau langsung array soal.
      let parsedQuestions: SnbtPenalaranInduktifQuestion[];
      try {
        const responseObject = JSON.parse(content);
        // Coba cari array soal dalam properti umum seperti 'questions' atau 'data'
        if (Array.isArray(responseObject)) {
          parsedQuestions = responseObject;
        } else if (responseObject.questions && Array.isArray(responseObject.questions)) {
          parsedQuestions = responseObject.questions;
        } else if (responseObject.data && Array.isArray(responseObject.data)) {
          parsedQuestions = responseObject.data;
        } else {
          // Jika tidak ada properti yang dikenal, coba cari array pertama dalam objek
          const firstArrayInObject = Object.values(responseObject).find(Array.isArray);
          if (firstArrayInObject) {
            parsedQuestions = firstArrayInObject as SnbtPenalaranInduktifQuestion[];
          } else {
            console.error('Unexpected JSON structure from Groq API:', responseObject);
            throw new Error('Failed to parse questions from Groq API response: No recognizable array of questions found.');
          }
        }
      } catch (e) {
        console.error('Failed to parse JSON from Groq API:', e, '\nRaw content:', content);
        throw new Error('Failed to parse questions from Groq API response.');
      }

      // Validasi sederhana
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        console.error('Parsed questions are not an array or empty:', parsedQuestions);
        throw new Error('No questions generated or invalid format.');
      }

      return parsedQuestions;
    } catch (error) {
      console.error('Error generating SNBT Penalaran Induktif questions:', error);
      // Sembunyikan detail error API dari client jika perlu
      throw new Error('Failed to generate SNBT Penalaran Induktif questions. Please try again later.');
    }
  }

  async function generateSnbtPengetahuanUmumQuestions(): Promise<SnbtPpuQuiz | null> {
    try {
      const systemPrompt = `
Anda adalah AI yang ahli dalam membuat soal-soal Tes Potensi Skolastik (TPS) untuk Seleksi Nasional Berdasarkan Tes (SNBT), khususnya subtes Penalaran Umum bagian Pengetahuan dan Pemahaman Umum (PPU).
Tujuan tes PPU adalah mengukur kemampuan memahami, menilai, dan mengomunikasikan pengetahuan yang dianggap penting di lingkungan budaya Indonesia.

Buatlah 20 soal pilihan ganda yang unik dan beragam untuk PPU. Setiap soal harus memiliki:
1.  ID unik (id), contoh "q1", "q2", dst.
2.  Topik soal (topic), pilih salah satu dari: 'Sinonim & Antonim', 'Ide Pokok & Makna', 'Kata & Bentuk Kata', 'Kesesuaian Wacana', 'Hubungan Antar Paragraf', atau 'Umum' jika tidak spesifik.
3.  Teks bacaan (passage) jika soal memerlukan konteks dari sebuah teks. Ini opsional.
4.  Teks pertanyaan (questionText).
5.  4 atau 5 pilihan jawaban (options), masing-masing dengan 'text' dan 'id' (misalnya 'a', 'b', 'c', 'd', 'e').
6.  Satu jawaban yang benar (correctAnswerId), yang merujuk ke 'id' pilihan yang benar.
7.  (Opsional) Penjelasan singkat mengapa jawaban tersebut benar (explanation).

Berikut adalah deskripsi dan contoh untuk setiap topik:
-   **Sinonim & Antonim**: Padanan kata (makna dekat) & lawan kata. Contoh soal: "Kata 'gigih' paling mendekati sinonim dari..."
-   **Ide Pokok & Makna**: Menentukan ide utama, simpulan, makna konteks. Contoh soal: "Paragraf kedua teks tersebut mengemukakan..."
-   **Kata & Bentuk Kata**: Afiks (imbuhan), derivasi, kata ulang. Contoh soal: "Bentuk kata yang benar untuk 'ke-ajar-an' adalah..." (Catatan: tipe soal bisa pilihan ganda atau isian singkat, tapi untuk API ini, buatlah selalu pilihan ganda).
-   **Kesesuaian Wacana**: Kohesi (rangkaian kata) & koherensi (keselarasan gagasan). Contoh soal: "Kata penghubung yang tepat untuk melanjutkan kalimat berikut adalah..."
-   **Hubungan Antar Paragraf**: Rujukan, pengembangan ide, transisi paragraf. Contoh soal: "Paragraf ketiga berfungsi sebagai ... terhadap paragraf sebelumnya."

Pastikan soal-soal bervariasi dalam tingkat kesulitan dan mencakup berbagai aspek dari tipe-tipe soal tersebut. Distribusikan jumlah soal secara merata antar topik jika memungkinkan.
Format output harus berupa JSON object yang valid dengan struktur berikut: { "questions": [ { "id": "q1", "topic": "Sinonim & Antonim", "questionText": "...", "options": [{"id": "a", "text": "..."}, ...], "correctAnswerId": "c", "explanation": "..." }, ... ] }
Pastikan ada tepat 20 soal.
Pastikan setiap soal memiliki \`id\` yang unik (misalnya, "q1", "q2", ..., "q20").
Pastikan setiap pilihan dalam soal memiliki \`id\` yang unik dalam konteks soal tersebut (misalnya, "a", "b", "c", "d").
`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Tolong buatkan 20 soal Pengetahuan dan Pemahaman Umum (PPU) sesuai dengan instruksi sistem.',
          },
        ],
        model: 'llama-3.3-70b-versatile', // Or your preferred model like 'llama-3.3-70b-versatile'
        temperature: 0.7,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const responseContent = chatCompletion.choices[0]?.message?.content;
      if (responseContent) {
        const parsedResponse = JSON.parse(responseContent) as SnbtPpuQuiz;
        if (parsedResponse.questions && parsedResponse.questions.length === 20) {
          return parsedResponse;
        }
        console.error('Invalid response structure or question count from Groq API for PPU:', parsedResponse);
        return null;
      }
      return null;
    } catch (error) {
      console.error('Error generating SNBT Pengetahuan Umum questions:', error);
      return null;
    }
  }

  // Specific function to generate TOEFL Integrated Writing content
  const generateIntegratedWritingContent = async (): Promise<ToeflIntegratedContent> => {
    const systemPrompt = `You are an expert TOEFL content generator. Create a complete TOEFL iBT Integrated Writing task set. 
    The reading passage should be academic, 230-300 words, presenting a clear stance or explanation on a topic. 
    The lecture should be a 1.5-2 minute audio script (provide the transcript) that challenges or casts doubt on specific points in the reading passage. 
    The lecture must directly address and counter at least 2-3 distinct points from the reading. 
    Provide a title for the reading passage. 
    The writing prompt is always: "Summarize the points made in the lecture, and explain how they relate to specific points in the reading." 
    Output the content as a JSON object with keys: "readingPassageTitle", "readingPassageText", "lectureTranscript", "writingPrompt". Make the topic complex and challenging, suitable for advanced ESL learners. For example, a debate on socio-economic theories, environmental policies, or historical interpretations. Ensure the arguments and counter-arguments are nuanced and require careful synthesis.`;
    
    const userPrompt = "Generate a new TOEFL Integrated Writing task set with a challenging academic topic.";

    const response = await chatCompletion(systemPrompt, userPrompt);
    const content = response.choices[0]?.message?.content;
    if (content) {
      try {
        const parsedContent = JSON.parse(content) as Partial<ToeflIntegratedContent>;
        return {
            readingPassageTitle: parsedContent.readingPassageTitle || "Default Reading Title",
            readingPassageText: parsedContent.readingPassageText || "Default reading passage text...",
            lectureTranscript: parsedContent.lectureTranscript || "Default lecture transcript...",
            lectureAudioSrc: '', // Add a placeholder or generate audio link separately
            writingPrompt: parsedContent.writingPrompt || "Summarize the points made in the lecture, and explain how they relate to specific points in the reading."
        };
      } catch (e) {
        console.error("Failed to parse Integrated Writing content from Groq:", e);
        throw new Error("Failed to parse content from AI.");
      }
    }
    throw new Error("No content received from Groq for Integrated Writing task.");
  };
 // Function to generate MBTI questions
  const generateMbtiQuestions = async (): Promise<MbtiQuestion[]> => {
    const systemPrompt = `Anda adalah psikolog ahli yang membuat tes kepribadian MBTI. Buatlah TEPAT 16 pasang pertanyaan MBTI dalam bahasa Indonesia yang berkualitas tinggi.
    
    Setiap pertanyaan harus:
    1. Memiliki dua pilihan (A dan B) yang kontras
    2. Mengukur dimensi MBTI: E vs I, S vs N, T vs F, J vs P
    3. Menggunakan situasi nyata dan relatable
    4. Ditulis dalam bahasa Indonesia yang natural
    
    Format output HARUS berupa array JSON dengan struktur:
    {
      "questions": [
        {
          "id": "q1",
          "optionA": "Pernyataan pilihan A",
          "optionB": "Pernyataan pilihan B", 
          "keyA": "E",
          "keyB": "I"
        }
      ]
    }
    
    Pastikan ada 4 pertanyaan untuk setiap dimensi (E/I, S/N, T/F, J/P). Gunakan kunci yang tepat untuk setiap pilihan.`;

    const userPrompt = "Buatlah 16 pertanyaan MBTI berkualitas tinggi dalam bahasa Indonesia.";

    try {
      const response = await chatCompletion(systemPrompt, userPrompt);
      const responseContent = response.choices[0]?.message?.content;
      
      if (!responseContent) {
        throw new Error('Respons dari AI kosong.');
      }

      const parsed = JSON.parse(responseContent);
      const questions = parsed.questions || parsed;
      
      if (!Array.isArray(questions) || questions.length !== 16) {
        throw new Error(`Jumlah pertanyaan tidak sesuai. Diterima ${questions.length}, diharapkan 16.`);
      }

      // Validate structure
      const isValidStructure = questions.every(q => 
        q.id && q.optionA && q.optionB && q.keyA && q.keyB &&
        ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].includes(q.keyA) &&
        ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].includes(q.keyB)
      );
      
      if (!isValidStructure) {
        throw new Error('Struktur pertanyaan tidak valid.');
      }

      return questions;
    } catch (error: any) {
      console.error('Error generating MBTI questions:', error);
      throw new Error(`Gagal menghasilkan pertanyaan MBTI: ${error.message}`);
    }
  };

  // Function to get MBTI type description
  const getMbtiTypeDescription = async (mbtiType: string): Promise<string> => {
    const systemPrompt = `Anda adalah psikolog ahli MBTI. Berikan deskripsi singkat dan akurat tentang tipe kepribadian MBTI dalam bahasa Indonesia. Deskripsi harus:
    1. Panjang 2-3 paragraf (150-200 kata)
    2. Menjelaskan karakteristik utama
    3. Menyebutkan kekuatan dan area pengembangan
    4. Menggunakan bahasa yang positif dan membangun
    5. Mudah dipahami oleh orang awam`;

    const userPrompt = `Jelaskan tipe kepribadian MBTI ${mbtiType} dalam bahasa Indonesia. Respond in JSON format: { "short_summary": "Summary" }`;

    try {
      const response = await chatCompletion(systemPrompt, userPrompt);
      const description = response.choices[0]?.message?.content;
      
      if (!description) {
        throw new Error('Gagal mendapatkan deskripsi tipe MBTI.');
      }

      return description.trim();
    } catch (error: any) {
      console.error('Error getting MBTI description:', error);
      throw new Error(`Gagal mendapatkan deskripsi MBTI: ${error.message}`);
    }
  };
  // Specific function to get feedback on the student's essay
  const getIntegratedWritingFeedback = async (readingText: string, lectureText: string, studentEssay: string): Promise<AIToeflIntegratedFeedback> => {
    const systemPrompt = `You are an expert TOEFL iBT Integrated Writing evaluator. 
    The user will provide the original reading passage, the lecture transcript, and their essay. 
    Evaluate the essay based on the following criteria: 
    1. Task Fulfillment: Does the essay accurately summarize the main points of the lecture and explain how they relate to specific points in the reading? Does it address the prompt directly? (Score out of 100)
    2. Organization and Development: Is the essay well-organized with a clear introduction, body paragraphs that connect reading and lecture points, and a conclusion? Are ideas well-developed and supported? (Score out of 100)
    3. Language Use: Is the language accurate (grammar, vocabulary)? Is sentence structure varied and complex? Is the tone appropriately academic? (Score out of 100)
    4. Cohesion and Coherence: Do ideas flow logically? Are transitions used effectively between sentences and paragraphs? (Score out of 100)
    5. Reading-Lecture Integration: How effectively does the essay synthesize information from both sources, highlighting contrasts or relationships? (Score out of 100)
    
    Provide an overall score (e.g., on a 0-100 scale, or a TOEFL band 0-5 if you can map it). 
    Provide a brief overall summary. 
    For each criterion, provide a score (0-100), specific feedback, and 1-2 actionable suggestions for improvement. 
    
    Output the feedback as a JSON object matching this structure:
    {
      "overallScore": number, // e.g. 85 (0-100) or 4.0 (0-5 for TOEFL scale)
      "summary": "string",
      "taskFulfillment": { "criterion": "Task Fulfillment", "score": number, "feedback": "string", "suggestions": ["string"] },
      "organizationAndDevelopment": { "criterion": "Organization and Development", "score": number, "feedback": "string", "suggestions": ["string"] },
      "languageUse": { "criterion": "Language Use", "score": number, "feedback": "string", "suggestions": ["string"] },
      "cohesionAndCoherence": { "criterion": "Cohesion and Coherence", "score": number, "feedback": "string", "suggestions": ["string"] },
      "readingLectureIntegration": { "criterion": "Reading-Lecture Integration", "score": number, "feedback": "string", "suggestions": ["string"] }
    }
    Be very critical and provide detailed, constructive feedback. The essay word limit is around 300 words.`;

    const userPrompt = `Reading Passage:\n${readingText}\n\nLecture Transcript:\n${lectureText}\n\nStudent's Essay:\n${studentEssay}`;

    if (!groqApiKey) {
      // Fallback feedback if API key is missing
      console.warn('Groq API key missing, returning placeholder feedback.');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      return {
        overallScore: 75,
        summary: "This is placeholder feedback. The essay shows some understanding but needs improvement in integrating lecture points with the reading passage.",
        taskFulfillment: { criterion: "Task Fulfillment", score: 70, feedback: "The essay attempts to summarize lecture points but could more clearly connect them to specific reading arguments.", suggestions: ["Ensure each lecture point directly addresses a corresponding point from the reading."] },
        organizationAndDevelopment: { criterion: "Organization and Development", score: 80, feedback: "Organization is generally clear, but transitions between ideas could be smoother.", suggestions: ["Use more varied transition words and phrases."] },
        languageUse: { criterion: "Language Use", score: 75, feedback: "Grammar is mostly accurate, but some sentences are a bit simple. Vocabulary could be more academic.", suggestions: ["Try to incorporate more complex sentence structures.", "Use a wider range of academic vocabulary."] },
        cohesionAndCoherence: { criterion: "Cohesion and Coherence", score: 70, feedback: "Ideas are somewhat connected, but the overall flow could be improved.", suggestions: ["Ensure each paragraph has a clear topic sentence."] },
        readingLectureIntegration: { criterion: "Reading-Lecture Integration", score: 65, feedback: "The integration of reading and lecture points is present but lacks depth. The essay tends to summarize them separately rather than synthesizing.", suggestions: ["Explicitly state how a lecture point challenges or supports a reading point.", "Use phrases like 'The lecturer challenges this by stating...' or 'In contrast to the reading, the lecture argues...' "] }
      };
    }

    const response = await chatCompletion(systemPrompt, userPrompt);
    const feedbackContent = response.choices[0]?.message?.content;

    if (feedbackContent) {
      try {
        return JSON.parse(feedbackContent) as AIToeflIntegratedFeedback;
      } catch (e) {
        console.error("Failed to parse AI feedback from Groq:", e);
        throw new Error("Failed to parse AI feedback.");
      }
    }
    throw new Error("No feedback received from Groq.");
  };

  const predefinedIndependentPrompts: IndependentWritingPrompt[] = [
    {
      id: 'agree-disagree-1',
      style: 'Agree/Disagree',
      title: 'Education: Standardized Testing',
      question: '"Standardized tests are the most effective way to measure a student\'s academic abilities and potential for future success." Do you agree or disagree with this statement? Use specific reasons and examples to support your position. Ensure your essay is at least 300 words long and presents a well-reasoned argument.'
    },
    {
      id: 'preference-1',
      style: 'Preference',
      title: 'Lifestyle: Urban vs. Rural Living',
      question: 'Some people prefer to live in large, bustling cities, while others prefer the tranquility of rural areas. Which do you prefer and why? Discuss the advantages of your preferred living environment and explain why it suits you better than the alternative. Provide specific examples and details in your response of at least 300 words.'
    },
    {
      id: 'problem-solution-1',
      style: 'Problem-Solution',
      title: 'Environment: Plastic Pollution',
      question: 'Plastic pollution in oceans and landfills is a significant global environmental problem. What do you believe are the primary causes of this issue, and what are some feasible solutions that individuals, communities, and governments can implement to mitigate it? Develop your ideas with specific examples in an essay of at least 300 words.'
    },
    {
      id: 'advantage-disadvantage-1',
      style: 'Advantage-Disadvantage',
      title: 'Technology: Social Media Impact',
      question: 'Social media platforms have become integral to modern communication. Discuss the main advantages and disadvantages of the widespread use of social media on individuals and society. Which do you think outweighs the other and why? Support your discussion with concrete examples in an essay of at least 300 words.'
    },
    {
      id: 'describe-explain-1',
      style: 'Describe & Explain',
      title: 'Culture: Importance of Arts',
      question: 'Describe a piece of art (e.g., a painting, a song, a book, a film) that has had a significant impact on you. Explain why it is meaningful to you and what broader insights or understanding it has provided. Ensure your essay is at least 300 words and clearly conveys your personal connection and reflections.'
    }
  ];

  async function generateSnbtPenalaranDeduktifQuestions(): Promise<SnbtPdQuiz | null> {
    try {
      const systemPrompt = `
Anda adalah AI yang ahli dalam membuat soal-soal Tes Potensi Skolastik (TPS) untuk Seleksi Nasional Berdasarkan Tes (SNBT), khususnya subtes Penalaran Umum bagian Penalaran Deduktif.
Penalaran Deduktif adalah kemampuan bernalar secara logis dari premis-premis yang telah diketahui untuk menarik kesimpulan yang pasti. Tes ini mengukur cara berpikir berdasarkan proposisi (pernyataan penuh) dan hubungan antar-proposisi.

Buatlah 10 soal pilihan ganda yang unik dan beragam untuk Penalaran Deduktif. Setiap soal harus memiliki:
1.  Teks pertanyaan (questionText).
2.  4 atau 5 pilihan jawaban (options), masing-masing dengan 'text' dan 'id' (misalnya 'a', 'b', 'c', 'd', 'e').
3.  Satu jawaban yang benar (correctAnswerId), yang merujuk ke 'id' pilihan yang benar.
4.  Tipe soal (questionType) dari salah satu berikut: 'Syllogism', 'Equivalence', 'Negation', 'Conclusion', atau 'GeneralDeductive' jika tidak spesifik.
5.  (Opsional) Penjelasan singkat mengapa jawaban tersebut benar (explanation).

Berikut adalah karakteristik dan contoh untuk setiap tipe soal:
-   **Silogisme**: Dua premis → satu kesimpulan; gunakan modus ponens/tollens. Contoh: "Premis 1: Jika hari ini hujan, maka jalanan basah. Premis 2: Hari ini hujan. Kesimpulan: Jalanan basah."
-   **Ekuivalensi**: Tentukan pernyataan yang setara makna. Contoh: "'Jika P maka Q' ekuivalen dengan '~P atau Q'."
-   **Negasi**: Ubah premis menjadi bentuk kontrapositif atau negasi langsung. Contoh: "Negasi dari 'Semua kucing berwarna hitam' adalah 'Ada kucing yang tidak berwarna hitam'. Kontrapositif dari 'Jika P maka Q' adalah 'Jika ~Q maka ~P'."
-   **Kesimpulan**: Pilih simpulan yang logis dan pasti dari semua premis yang diberikan. Hindari kesimpulan yang terlalu umum atau terlalu ekstrem.

Pastikan soal-soal bervariasi dalam tingkat kesulitan dan mencakup berbagai aspek dari tipe-tipe soal tersebut.
Format output harus berupa JSON object yang valid dengan struktur berikut: { "questions": [ { "id": "q1", "questionText": "...", "options": [{"id": "a", "text": "..."}, ...], "correctAnswerId": "c", "questionType": "Syllogism", "explanation": "..." }, ... ] }
Pastikan ada tepat 10 soal.
Pastikan setiap soal memiliki "id" yang unik (misalnya, "q1", "q2", ..., "q10").
Pastikan setiap pilihan dalam soal memiliki "id" yang unik dalam konteks soal tersebut (misalnya, "a", "b", "c", "d").
`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Tolong buatkan 10 soal Penalaran Deduktif sesuai dengan instruksi sistem.',
          },
        ],
        model: 'llama-3.3-70b-versatile', // User specified llama-3.3-70b-versatile, but it might not be available. Using a close alternative.
        temperature: 0.7,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const responseContent = chatCompletion.choices[0]?.message?.content;
      if (responseContent) {
        const parsedResponse = JSON.parse(responseContent) as SnbtPdQuiz;
        // Basic validation
        if (parsedResponse.questions && parsedResponse.questions.length === 10) {
          return parsedResponse;
        }
        console.error('Invalid response structure or question count from Groq API:', parsedResponse);
        return null;
      }
      return null;
    } catch (error) {
      console.error('Error generating SNBT Penalaran Deduktif questions:', error);
      return null;
    }
  }

  const generateIndependentWritingPrompts = async (count: number = 5): Promise<IndependentWritingPrompt[]> => {
    // For now, we return a predefined list. 
    // You can extend this to call Groq to generate dynamic prompts if needed.
    // If calling Groq, ensure the system prompt asks for varied, challenging questions across the 5 styles.
    // And that the output is a JSON array of objects matching IndependentWritingPrompt.
    console.log("Using predefined independent writing prompts.");
    return predefinedIndependentPrompts.slice(0, count);
    
    // Example Groq call (if you want dynamic prompts):
    /*
    const systemPrompt = `You are a TOEFL content creator specializing in Independent Writing prompts. 
    Generate ${count} unique and challenging essay prompts suitable for the TOEFL iBT Independent Writing task. 
    Ensure a variety of prompt styles: "Agree/Disagree", "Preference", "Problem-Solution", "Advantage-Disadvantage", and "Describe & Explain". 
    Each prompt should require a response of at least 300 words and encourage critical thinking and detailed examples. 
    Format the output as a JSON array, where each object has "id" (a unique string), "style" (one of the 5 types), "title" (a short descriptive title for a dropdown menu, max 5 words), and "question" (the full prompt text).
    Make the topics intellectually stimulating and relevant to a global audience of test-takers.`;
    const userPrompt = `Generate ${count} TOEFL Independent Writing prompts.`;
    
    if (!groqApiKey) {
      console.warn('Groq API key missing, returning predefined prompts.');
      return predefinedIndependentPrompts.slice(0, count);
    }

    const response = await chatCompletion(systemPrompt, userPrompt);
    const content = response.choices[0]?.message?.content;
    if (content) {
      try {
        const parsedPrompts = JSON.parse(content) as IndependentWritingPrompt[];
        if (Array.isArray(parsedPrompts) && parsedPrompts.length > 0) {
          return parsedPrompts;
        }
        console.warn("Received empty or invalid prompt array from Groq, using predefined.");
        return predefinedIndependentPrompts.slice(0, count);
      } catch (e) {
        console.error("Failed to parse independent prompts from Groq:", e);
        return predefinedIndependentPrompts.slice(0, count); // Fallback
      }
    }
    console.warn("No content for prompts from Groq, using predefined.");
    return predefinedIndependentPrompts.slice(0, count); // Fallback
    */
  };

  const getIndependentWritingFeedback = async (promptQuestion: string, studentEssay: string): Promise<AIToeflIndependentFeedback> => {
    const systemPrompt = `You are an expert TOEFL iBT Independent Writing evaluator. 
    The user will provide the essay prompt and their response (target 300-350 words). 
    Evaluate the essay based on the following criteria: 
    1. Task Response: How well does the essay address the prompt? Are the main ideas relevant and well-supported? (Score out of 100)
    2. Organization and Development: Is the essay well-organized with a clear thesis, logical paragraph structure (introduction, body, conclusion), and well-developed ideas? (Score out of 100)
    3. Language Use: Is grammar accurate? Is vocabulary precise and varied? Is sentence structure complex and fluent? Is the tone appropriately academic? (Score out of 100)
    4. Cohesion and Coherence: Do ideas flow logically? Are transitions used effectively? Is the essay easy to follow? (Score out of 100)
    
    Provide an overall score (e.g., on a 0-100 scale, or a TOEFL band 0-5 if you can map it). 
    Provide a brief overall summary. 
    For each of the 4 criteria, provide a score (0-100), specific feedback on strengths and weaknesses, and 2-3 actionable suggestions for improvement. 
    
    Output the feedback as a JSON object matching this structure:
    {
      "overallScore": number, 
      "summary": "string",
      "taskResponse": { "criterion": "Task Response", "score": number, "feedback": "string", "suggestions": ["string"] },
      "organizationAndDevelopment": { "criterion": "Organization and Development", "score": number, "feedback": "string", "suggestions": ["string"] },
      "languageUse": { "criterion": "Language Use", "score": number, "feedback": "string", "suggestions": ["string"] },
      "cohesionAndCoherence": { "criterion": "Cohesion and Coherence", "score": number, "feedback": "string", "suggestions": ["string"] }
    }
    Be critical and constructive. Focus on providing practical advice.`;

    const userPrompt = `Essay Prompt:\n${promptQuestion}\n\nStudent's Essay:\n${studentEssay}`;

    if (!groqApiKey) {
      console.warn('Groq API key missing, returning placeholder feedback for Independent Writing.');
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      return {
        overallScore: 78,
        summary: "This is placeholder feedback. The essay generally addresses the prompt but could improve in developing supporting arguments and using more varied language.",
        taskResponse: { criterion: "Task Response", score: 80, feedback: "The essay understands the prompt and presents a clear stance. Supporting examples could be more specific.", suggestions: ["Elaborate on your examples with more detail.", "Ensure all parts of the prompt are fully addressed."] },
        organizationAndDevelopment: { criterion: "Organization and Development", score: 75, feedback: "The essay has a standard structure, but paragraph development could be more robust. Some ideas feel underdeveloped.", suggestions: ["Ensure each body paragraph has a clear topic sentence and sufficient supporting details.", "Consider using a stronger concluding paragraph to summarize and reinforce your thesis."] },
        languageUse: { criterion: "Language Use", score: 77, feedback: "Grammar is generally good, but there are some repetitive sentence structures. Vocabulary is adequate but could be more sophisticated.", suggestions: ["Vary your sentence beginnings and structures.", "Incorporate more precise academic vocabulary relevant to the topic."] },
        cohesionAndCoherence: { criterion: "Cohesion and Coherence", score: 80, feedback: "Transitions between paragraphs are present, but connections between sentences within paragraphs could be smoother.", suggestions: ["Use a wider range of transitional phrases.", "Double-check for logical flow between ideas."] }
      };
    }

    const response = await chatCompletion(systemPrompt, userPrompt);
    const feedbackContent = response.choices[0]?.message?.content;

    if (feedbackContent) {
      try {
        return JSON.parse(feedbackContent) as AIToeflIndependentFeedback;
      } catch (e) {
        console.error("Failed to parse AI Independent Writing feedback from Groq:", e);
        throw new Error("Failed to parse AI feedback.");
      }
    }
    throw new Error("No feedback received from Groq for Independent Writing.");
  };

const getIeltsWritingFeedback = async (taskType: 'Task 1' | 'Task 2', prompt: string, studentResponse: string): Promise<IeltsWritingFeedback> => {
  if (!groqApiKey) {
    console.warn('Groq API key missing, returning placeholder IELTS feedback.');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    // Return a mock/placeholder feedback structure
    return {
      overallBandScore: 6.5,
      summary: "This is placeholder feedback. The response shows good potential but requires development in lexical resource and grammatical accuracy.",
      taskAchievement: { criterion: "Task Achievement", score: 7, feedback: "The main features of the data / aspects of the prompt were addressed.", suggestions: ["Ensure all parts of the prompt are fully covered."] },
      coherenceAndCohesion: { criterion: "Coherence and Cohesion", score: 6, feedback: "Ideas are generally well-organized, but paragraphing or linking could be improved.", suggestions: ["Use a wider range of cohesive devices."] },
      lexicalResource: { criterion: "Lexical Resource", score: 6, feedback: "Vocabulary is adequate but sometimes repetitive or imprecise.", suggestions: ["Incorporate more varied and topic-specific vocabulary."] },
      grammaticalRangeAndAccuracy: { criterion: "Grammatical Range and Accuracy", score: 6, feedback: "There are some grammatical errors that occasionally impede communication.", suggestions: ["Review common grammatical structures and practice proofreading."] }
    };
  }

  // Define system prompts based on task type
  let systemPrompt = '';
  if (taskType === 'Task 1') {
    systemPrompt = `You are an expert IELTS Academic Writing Task 1 evaluator. 
    The user will provide the task description/data and their response (around 150 words).
    Evaluate the response based on the official IELTS band descriptors for Task 1:
    1. Task Achievement (TA): How accurately and appropriately the response addresses the requirements of the task. Does it provide an overview? Does it accurately report the main features/trends, making comparisons where relevant? (Band 0-9)
    2. Coherence and Cohesion (CC): How well the information and ideas are organized and linked. Is there a clear progression? Is paragraphing logical? Are cohesive devices used effectively? (Band 0-9)
    3. Lexical Resource (LR): The range and accuracy of vocabulary used. Is there a wide range of vocabulary? Is it used appropriately and accurately? (Band 0-9)
    4. Grammatical Range and Accuracy (GRA): The range and accuracy of grammatical structures used. Are sentences complex and varied? Are there minimal errors? (Band 0-9)

    Provide an overall band score (0-9, can be .5 bands e.g., 6.5).
    Provide a brief overall summary.
    For each of the four criteria (TA, CC, LR, GRA), provide a band score (0-9), specific feedback explaining the score, and 1-2 actionable suggestions for improvement.
    Output the feedback as a JSON object matching this structure:
    {
      "overallBandScore": number, // e.g. 6.5
      "summary": "string",
      "taskAchievement": { "criterion": "Task Achievement", "score": number, "feedback": "string", "suggestions": ["string"] },
      "coherenceAndCohesion": { "criterion": "Coherence and Cohesion", "score": number, "feedback": "string", "suggestions": ["string"] },
      "lexicalResource": { "criterion": "Lexical Resource", "score": number, "feedback": "string", "suggestions": ["string"] },
      "grammaticalRangeAndAccuracy": { "criterion": "Grammatical Range and Accuracy", "score": number, "feedback": "string", "suggestions": ["string"] }
    }
    Be very critical and provide detailed, constructive feedback aligned with IELTS standards.`;
  } else { // Task 2
    systemPrompt = `You are an expert IELTS Academic Writing Task 2 evaluator. 
    The user will provide the essay question and their response (around 250 words).
    Evaluate the response based on the official IELTS band descriptors for Task 2:
    1. Task Response (TR): How well the response addresses all parts of the task. Is there a clear position? Are ideas relevant, developed, and supported? (Band 0-9)
    2. Coherence and Cohesion (CC): How well the information and ideas are organized and linked. Is there a clear progression throughout the essay? Is paragraphing logical? Are cohesive devices used effectively? (Band 0-9)
    3. Lexical Resource (LR): The range and accuracy of vocabulary used. Is there a wide range of vocabulary? Is it used appropriately and accurately, including less common items and collocations? (Band 0-9)
    4. Grammatical Range and Accuracy (GRA): The range and accuracy of grammatical structures used. Are sentences complex and varied? Are there minimal errors that do not impede communication? (Band 0-9)

    Provide an overall band score (0-9, can be .5 bands e.g., 6.5).
    Provide a brief overall summary.
    For each of the four criteria (TR, CC, LR, GRA), provide a band score (0-9), specific feedback explaining the score, and 1-2 actionable suggestions for improvement.
    Output the feedback as a JSON object matching this structure:
    {
      "overallBandScore": number, // e.g. 6.5
      "summary": "string",
      "taskAchievement": { "criterion": "Task Response", "score": number, "feedback": "string", "suggestions": ["string"] }, // Note: Key is taskAchievement for consistency, but criterion name is Task Response
      "coherenceAndCohesion": { "criterion": "Coherence and Cohesion", "score": number, "feedback": "string", "suggestions": ["string"] },
      "lexicalResource": { "criterion": "Lexical Resource", "score": number, "feedback": "string", "suggestions": ["string"] },
      "grammaticalRangeAndAccuracy": { "criterion": "Grammatical Range and Accuracy", "score": number, "feedback": "string", "suggestions": ["string"] }
    }
    Be very critical and provide detailed, constructive feedback aligned with IELTS standards.`;
  }

  const userPromptContent = `Task Prompt/Data:\n${prompt}\n\nStudent's Response:\n${studentResponse}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPromptContent },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    });

    const feedbackContent = response.choices[0]?.message?.content;
    if (feedbackContent) {
      try {
        // Ensure the key for Task 2's first criterion is consistently 'taskAchievement' in the parsed object,
        // even if the AI returns 'taskResponse' based on the prompt text.
        let parsed = JSON.parse(feedbackContent) as IeltsWritingFeedback;
        if (taskType === 'Task 2' && parsed.taskAchievement && parsed.taskAchievement.criterion === "Task Response") {
          // This is fine, we'll use it as is. The interface uses 'taskAchievement' as the key.
        } else if (taskType === 'Task 2' && (parsed as any).taskResponse) {
          // If AI used 'taskResponse' as key, map it to 'taskAchievement'
          parsed.taskAchievement = (parsed as any).taskResponse;
          delete (parsed as any).taskResponse;
          if(parsed.taskAchievement) parsed.taskAchievement.criterion = "Task Response";
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse IELTS AI feedback from Groq:", e);
        throw new Error("Failed to parse AI feedback.");
      }
    }
    throw new Error("No feedback received from Groq for IELTS Writing task.");
  } catch (error) {
    console.error('Error fetching IELTS writing feedback from Groq:', error);
    throw error;
  }
};
const getIeltsGeneralLetterFeedback = async (letterPrompt: string, letterText: string, letterStyle: 'Formal' | 'Semi-Formal' | 'Informal'): Promise<IeltsGeneralLetterFeedback> => {
    const systemPrompt = `You are an expert IELTS General Training Writing Task 1 (Letter Writing) evaluator.
    The user will provide the letter prompt (including bullet points) and their written letter.
    The letter style is: ${letterStyle}.
    Evaluate the letter (around 150 words) based on the following criteria:
    1. Task Achievement: Does the letter address all parts of the prompt (all bullet points)? Is the purpose of the letter clear? (Score 0-9)
    2. Coherence and Cohesion: Is the letter well-organized and easy to follow? Are ideas linked appropriately? (Score 0-9)
    3. Lexical Resource: Is the vocabulary appropriate for the letter's purpose and style? Is there a good range of vocabulary used accurately? (Score 0-9)
    4. Grammatical Range and Accuracy: Are sentences grammatically correct? Is there a good range of sentence structures? (Score 0-9)
    5. Tone Appropriateness: Is the tone of the letter (Formal, Semi-Formal, or Informal) appropriate for the specified style and recipient? (Score 0-9)

    Provide an overall band score (0-9).
    Provide a brief overall summary.
    For each criterion, provide a band score (0-9), specific feedback, and 1-2 actionable suggestions for improvement.

    Output the feedback as a JSON object matching this structure:
    {
      "overallBandScore": number, // 0-9
      "summary": "string",
      "taskAchievement": { "criterion": "Task Achievement", "score": number, "feedback": "string", "suggestions": ["string"] },
      "coherenceAndCohesion": { "criterion": "Coherence and Cohesion", "score": number, "feedback": "string", "suggestions": ["string"] },
      "lexicalResource": { "criterion": "Lexical Resource", "score": number, "feedback": "string", "suggestions": ["string"] },
      "grammaticalRangeAndAccuracy": { "criterion": "Grammatical Range and Accuracy", "score": number, "feedback": "string", "suggestions": ["string"] },
      "toneAppropriateness": { "criterion": "Tone Appropriateness", "score": number, "feedback": "string", "suggestions": ["string"] }
    }
    Be critical and provide detailed, constructive feedback. The letter should be at least 150 words.`;

    const userPromptContent = `Letter Prompt:\n${letterPrompt}\n\nStudent's Letter (Style: ${letterStyle}):\n${letterText}`;

    if (!groqApiKey) {
      console.warn('Groq API key missing, returning placeholder feedback for General Letter.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        overallBandScore: 6.5,
        summary: "Placeholder: Good attempt, but ensure all bullet points are fully developed and maintain a consistent tone.",
        taskAchievement: { criterion: "Task Achievement", score: 6, feedback: "Addresses most points but could expand on the third bullet point.", suggestions: ["Fully develop each bullet point from the prompt."] },
        coherenceAndCohesion: { criterion: "Coherence and Cohesion", score: 7, feedback: "Generally well-organized.", suggestions: ["Ensure smooth transitions between paragraphs."] },
        lexicalResource: { criterion: "Lexical Resource", score: 6, feedback: "Vocabulary is adequate but could be more varied for a higher score.", suggestions: ["Use a wider range of topic-specific vocabulary."] },
        grammaticalRangeAndAccuracy: { criterion: "Grammatical Range and Accuracy", score: 7, feedback: "Good grammatical control with minor errors.", suggestions: ["Proofread carefully for subject-verb agreement."] },
        toneAppropriateness: { criterion: "Tone Appropriateness", score: 6, feedback: `The tone is mostly ${letterStyle.toLowerCase()}, but some phrases are slightly too informal/formal.`, suggestions: [`Consistently maintain a ${letterStyle.toLowerCase()} tone throughout the letter.`] }
      };
    }

    const response = await chatCompletion(systemPrompt, userPromptContent);
    const feedbackContent = response.choices[0]?.message?.content;

    if (feedbackContent) {
      try {
        return JSON.parse(feedbackContent) as IeltsGeneralLetterFeedback;
      } catch (e) {
        console.error("Failed to parse AI General Letter feedback from Groq:", e);
        throw new Error("Failed to parse AI General Letter feedback.");
      }
    }
    throw new Error("No feedback received from Groq for General Letter.");
  };
  async function generateSnbtPenalaranKuantitatifQuestions(): Promise<SnbtPenalaranKuantitatifQuestion[]> {

    const systemPrompt = `
      Anda adalah asisten AI yang ahli dalam membuat soal-soal Tes Potensi Skolastik (TPS) untuk Seleksi Nasional Berdasarkan Tes (SNBT) di Indonesia, khususnya untuk subtes Penalaran Kuantitatif.
      Tugas Anda adalah membuat 10 soal pilihan ganda yang berkualitas tinggi dalam bahasa Indonesia.
      Setiap soal harus menguji salah satu dari tiga jenis kemampuan penalaran kuantitatif berikut:
      1.  Kuantitas: Melibatkan perbandingan, rasio, dan proporsi.
      2.  Hubungan matematika sederhana: Melibatkan konversi satuan dan deret bilangan.
      3.  Operasi aritmetika dasar: Melibatkan penjumlahan, pengurangan, perkalian, pembagian, dan persen.

      Pastikan soal-soal mencakup ketiga jenis kemampuan tersebut secara seimbang jika memungkinkan, atau setidaknya ada variasi.
      Setiap soal harus memiliki:
      - "id": string (nomor soal, e.g., "pk_q1", "pk_q2", ... "pk_q10")
      - "question_text": string (teks pertanyaan yang jelas dan lengkap, bisa berupa soal cerita atau soal numerik langsung)
      - "topic": string (salah satu dari 'Kuantitas', 'Hubungan Matematika Sederhana', 'Operasi Aritmetika Dasar')
      - "options": array of objects, masing-masing dengan "id" (e.g., "a", "b", "c", "d", "e") dan "text" (teks pilihan jawaban, bisa berupa angka atau pernyataan). Harus ada 5 pilihan jawaban.
      - "correct_answer_id": string (id dari pilihan jawaban yang benar)
      - "explanation": string (penjelasan rinci langkah-langkah penyelesaian dan mengapa jawaban tersebut benar, dalam bahasa Indonesia)

      Format output HARUS berupa JSON array yang valid. Contoh satu soal:
      {
        "id": "pk_q1",
        "question_text": "Sebuah toko memberikan diskon 20% untuk semua barang. Jika harga awal sebuah baju adalah Rp150.000, berapakah harga baju tersebut setelah diskon?",
        "topic": "Operasi Aritmetika Dasar",
        "options": [
          { "id": "a", "text": "Rp100.000" },
          { "id": "b", "text": "Rp110.000" },
          { "id": "c", "text": "Rp120.000" },
          { "id": "d", "text": "Rp130.000" },
          { "id": "e", "text": "Rp140.000" }
        ],
        "correct_answer_id": "c",
        "explanation": "Diskon = 20% dari Rp150.000 = 0.20 * 150.000 = Rp30.000. Harga setelah diskon = Rp150.000 - Rp30.000 = Rp120.000."
      }
      Pastikan ada 10 soal dalam array JSON.
    `;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Buatkan saya 10 soal Penalaran Kuantitatif untuk SNBT sesuai dengan instruksi sistem.',
          },
        ],
        model: 'llama-3.3-70b-versatile', // Pastikan model ini tersedia dan sesuai
        temperature: 0.6, // Sedikit lebih rendah untuk soal matematika agar lebih presisi
        max_tokens: 4000,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const content = chatCompletion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from Groq API.');
      }

      let parsedQuestions: SnbtPenalaranKuantitatifQuestion[];
      try {
        const responseObject = JSON.parse(content);
        if (Array.isArray(responseObject)) {
          parsedQuestions = responseObject;
        } else if (responseObject.questions && Array.isArray(responseObject.questions)) {
          parsedQuestions = responseObject.questions;
        } else if (responseObject.data && Array.isArray(responseObject.data)) {
          parsedQuestions = responseObject.data;
        } else {
          const firstArrayInObject = Object.values(responseObject).find(Array.isArray);
          if (firstArrayInObject) {
            parsedQuestions = firstArrayInObject as SnbtPenalaranKuantitatifQuestion[];
          } else {
            console.error('Unexpected JSON structure from Groq API:', responseObject);
            throw new Error('Failed to parse questions from Groq API response: No recognizable array of questions found.');
          }
        }
      } catch (e) {
        console.error('Failed to parse JSON from Groq API:', e, '\nRaw content:', content);
        throw new Error('Failed to parse questions from Groq API response.');
      }

      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        console.error('Parsed questions are not an array or empty:', parsedQuestions);
        throw new Error('No questions generated or invalid format.');
      }

      return parsedQuestions;
    } catch (error) {
      console.error('Error generating SNBT Penalaran Kuantitatif questions:', error);
      throw new Error('Failed to generate SNBT Penalaran Kuantitatif questions. Please try again later.');
    }
  }
async function generateSnbtLiterasiIndonesiaQuestions(): Promise<IndonesianLiteracyQuestion[]> {
    const systemPrompt = `
Anda adalah asisten AI ahli yang bertugas membuat soal Literasi Bahasa Indonesia tingkat tinggi untuk SNBT (Seleksi Nasional Berdasarkan Tes) di Indonesia.
Buatlah 30 soal pilihan ganda yang sangat menantang. Setiap soal harus memiliki empat pilihan jawaban (A, B, C, D).

Soal harus mencakup kategori berikut:
1.  **Pemahaman Bacaan (Teks Panjang)**: Menganalisis teks kompleks (sastra, ilmiah populer, berita), menyimpulkan ide pokok, informasi tersirat, tujuan penulis, dan hubungan antarbagian teks. Sertakan teks bacaan yang cukup panjang (2-4 paragraf).
2.  **Struktur Kalimat Kompleks & Ragam Bahasa Baku**: Mengidentifikasi kalimat efektif, penggunaan konjungsi yang tepat, ejaan dan tanda baca (PUEBI), serta kebakuan kata.
3.  **Makna Idiomatik dan Peribahasa**: Memahami makna idiom, ungkapan, dan peribahasa dalam konteks kalimat atau wacana singkat.
4.  **Sinonim/Antonim Tingkat Lanjut**: Menentukan sinonim atau antonim kata-kata yang jarang digunakan atau memiliki nuansa makna spesifik.

Pastikan soal-soal terdistribusi secara merata di antara kategori-kategori ini. Setiap soal harus memiliki format JSON berikut:
-   "id": string (unik, contoh: "lit_id_q1", "lit_id_q2", ..., "lit_id_q30")
-   "questionText": string (teks pertanyaan yang jelas dan lengkap)
-   "topic": string (salah satu dari: 'Pemahaman Bacaan', 'Struktur Kalimat', 'Idiom & Peribahasa', 'Sinonim & Antonim')
-   "passage": string (opsional, WAJIB untuk 'Pemahaman Bacaan', berisi teks bacaan)
-   "options": array objek, masing-masing dengan "id" ("a", "b", "c", "d") dan "text" (teks pilihan jawaban)
-   "correctAnswerId": string (id dari pilihan jawaban yang benar)
-   "explanation": string (penjelasan rinci dalam Bahasa Indonesia mengapa jawaban tersebut benar dan mengapa pilihan lain salah, termasuk analisis teks jika relevan)

Buatlah soal yang benar-benar sulit dan menguji kemampuan analisis mendalam, bukan sekadar hafalan. Gunakan kosakata yang kaya dan struktur kalimat yang bervariasi.

Format output HARUS berupa objek JSON dengan sebuah array bernama "questions" yang berisi tepat 30 soal.

Contoh struktur satu soal:
{
  "id": "lit_id_q1",
  "questionText": "Makna ungkapan 'kabar angin' dalam kalimat 'Kabar angin tentang kenaikan harga BBM itu meresahkan masyarakat.' adalah...",
  "topic": "Idiom & Peribahasa",
  "passage": null, // atau hilangkan jika tidak ada passage
  "options": [
    { "id": "a", "text": "berita yang belum pasti kebenarannya" },
    { "id": "b", "text": "informasi rahasia dari pemerintah" },
    { "id": "c", "text": "pengumuman resmi melalui media massa" },
    { "id": "d", "text": "perbincangan hangat di media sosial" }
  ],
  "correctAnswerId": "a",
  "explanation": "'Kabar angin' adalah idiom yang berarti berita atau informasi yang belum jelas atau belum dapat dipastikan kebenarannya, biasanya menyebar dari mulut ke mulut."
}
Pastikan ada 30 soal dalam array JSON.
    `;

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: 'Buatkan saya 30 soal Literasi Bahasa Indonesia yang sangat menantang untuk SNBT, sesuai dengan instruksi sistem.',
          },
        ],
        model: 'qwen-qwq-32b',
        temperature: 0.75,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Tidak ada konten yang diterima dari Groq API.');
      }

      let parsedResponse: { questions: IndonesianLiteracyQuestion[] };
      try {
        parsedResponse = JSON.parse(content);
      } catch (e) {
        console.error('Gagal mem-parsing JSON dari Groq API:', e, '\nKonten mentah:', content);
        throw new Error('Gagal mem-parsing soal dari respons Groq API.');
      }

      if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions) || parsedResponse.questions.length !== 30) {
        console.error('Format respons tidak valid. Diharapkan 30 soal dalam array questions.', parsedResponse);
        throw new Error(`Format respons tidak valid: Diharapkan 30 soal, tetapi menerima ${parsedResponse.questions?.length || 0}.`);
      }
      return parsedResponse.questions;
    } catch (err) {
      console.error('Error saat membuat soal Literasi Indonesia:', err);
      const errorMessage = err instanceof Error ? err.message : 'Gagal membuat soal Literasi Indonesia';
      throw new Error(errorMessage);
    }
  }
async function generateEnglishLiteracyQuestions(): Promise<EnglishLiteracyQuestion[]> {

    const systemPrompt = `
You are an expert AI assistant specialized in creating high-difficulty English literacy questions for the SNBT (Seleksi Nasional Berdasarkan Tes) in Indonesia. 
Your task is to generate 20 challenging multiple-choice questions that test advanced English literacy skills.

Each question should test one of these areas:
1. **Vocabulary**: Advanced word meanings, nuances, context-dependent definitions
2. **Reading Comprehension**: Deep understanding of complex texts, main ideas, supporting details
3. **Inference**: Drawing logical conclusions from implicit information
4. **Idioms**: Understanding of English idioms and figurative language
5. **Grammar**: Advanced grammatical structures and usage

Ensure questions are distributed across these categories. Each question must have:
- "id": string (e.g., "el_q1", "el_q2", ... "el_q20")
- "questionText": string (clear, complete question text)
- "topic": string (one of: 'Vocabulary', 'Reading Comprehension', 'Inference', 'Idioms', 'Grammar')
- "passage": string (optional - include for reading comprehension questions, 2-3 paragraphs of complex text)
- "options": array of objects with "id" ("a", "b", "c", "d") and "text" (option text)
- "correctAnswerId": string (id of correct option)
- "explanation": string (detailed explanation in English why the answer is correct)

Make questions challenging but fair. Include:
- Complex vocabulary (GRE/TOEFL level)
- Nuanced reading passages on academic topics
- Subtle inference questions
- Common but tricky idioms
- Advanced grammar concepts

Format as a JSON object with a "questions" array containing exactly 20 questions.

Example structure:
{
  "questions": [
    {
      "id": "el_q1",
      "questionText": "In the context of the passage, the word 'ubiquitous' most nearly means:",
      "topic": "Vocabulary",
      "passage": "The ubiquitous nature of social media has fundamentally altered how we perceive and interact with information...",
      "options": [
        { "id": "a", "text": "rare and valuable" },
        { "id": "b", "text": "present everywhere" },
        { "id": "c", "text": "technologically advanced" },
        { "id": "d", "text": "socially acceptable" }
      ],
      "correctAnswerId": "b",
      "explanation": "Ubiquitous means present, appearing, or found everywhere. The context suggests social media's widespread presence."
    }
  ]
}
`;
    const userPrompt = 'Generate 20 challenging English literacy questions for SNBT according to the system instructions.';

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.6,
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from Groq API for English Literacy questions.');
      }
      const parsedContent = JSON.parse(content);
      // Add validation here if needed for parsedContent.questions structure
      return parsedContent.questions as EnglishLiteracyQuestion[];
    } catch (error) {
      console.error('Error fetching English Literacy questions from Groq:', error);
      throw error;
    }
  }
    async function generateSnbtLiterasiMatematikaQuestions(): Promise<SnbtLiterasiMatematikaQuestion[]> {


    const systemPrompt = `
Anda adalah AI ahli dalam membuat soal Literasi Matematika tingkat kesulitan SANGAT TINGGI untuk SNBT (Seleksi Nasional Berdasarkan Tes) di Indonesia.
Buatlah 20 soal pilihan ganda yang sangat menantang, mencakup berbagai konsep matematika dan memerlukan penalaran multi-langkah.

Setiap soal harus menguji salah satu dari area berikut:
1.  **Aljabar & Fungsi**: Soal cerita kompleks yang melibatkan persamaan/pertidaksamaan linear/kuadrat, fungsi, sistem persamaan, barisan & deret aritmatika/geometri.
2.  **Geometri & Pengukuran**: Penerapan teorema Pythagoras, luas & volume bangun datar/ruang kompleks, geometri koordinat, transformasi geometri.
3.  **Teori Bilangan**: Sifat-sifat bilangan bulat, FPB & KPK dalam konteks, keterbagian, sisa pembagian (modulo), bilangan prima.
4.  **Kombinatorika & Peluang**: Permutasi, kombinasi, peluang kejadian majemuk, peluang bersyarat, kaidah pencacahan tingkat lanjut.
5.  **Analisis Data & Statistika**: Interpretasi data dari tabel/grafik kompleks, rata-rata, median, modus, simpangan baku, kuartil, desil, persentil dalam konteks masalah.

Pastikan soal-soal terdistribusi secara merata di antara kategori-kategori ini.
Setiap soal HARUS memiliki format JSON berikut:
-   \`"id"\`: string (contoh: "lm_q1", "lm_q2", ..., "lm_q20")
-   \`"questionText"\`: string (teks soal yang jelas dan lengkap, BOLEH menggunakan format LaTeX untuk rumus matematika, contoh: "Jika \\(x^2 + y^2 = 25\\) dan \\(xy = 12\\), berapakah nilai dari \\((x+y)^2\\)?")
-   \`"topic"\`: string (salah satu dari: 'Aljabar & Fungsi', 'Geometri & Pengukuran', 'Teori Bilangan', 'Kombinatorika & Peluang', 'Analisis Data & Statistika')
-   \`"options"\`: array objek, masing-masing dengan \`"id"\` ("a", "b", "c", "d") dan \`"text"\` (teks pilihan jawaban, BOLEH menggunakan format LaTeX)
-   \`"correctAnswerId"\`: string (ID pilihan jawaban yang benar, contoh: "c")
-   \`"explanation"\`: string (penjelasan langkah demi langkah yang detail dalam Bahasa Indonesia mengapa jawaban tersebut benar dan bagaimana cara menyelesaikannya, BOLEH menggunakan format LaTeX)

KRITERIA SOAL SANGAT SULIT:
-   Membutuhkan pemahaman konsep yang mendalam, bukan sekadar hafalan rumus.
-   Melibatkan beberapa konsep matematika dalam satu soal.
-   Memerlukan beberapa langkah penyelesaian yang logis dan terstruktur.
-   Pilihan jawaban pengecoh dibuat sedemikian rupa sehingga tampak masuk akal bagi yang kurang teliti atau salah konsep.
-   Konteks soal cerita dibuat kompleks dan membutuhkan kemampuan analisis untuk menerjemahkannya ke model matematika.
-   Hindari soal yang terlalu standar atau mudah ditebak polanya.

Format output HARUS berupa objek JSON dengan sebuah array bernama "questions" yang berisi TEPAT 20 soal.

Contoh struktur:
{
  "questions": [
    {
      "id": "lm_q1",
      "questionText": "Sebuah wadah berbentuk kerucut terbalik dengan jari-jari alas 5 cm dan tinggi 12 cm diisi air dengan laju 3 cm³/detik. Laju perubahan tinggi permukaan air saat tinggi air 4 cm adalah... (Gunakan \\(\pi = 3.14\\))",
      "topic": "Geometri & Pengukuran",
      "options": [
        { "id": "a", "text": "0.27 cm/detik" },
        { "id": "b", "text": "0.34 cm/detik" },
        { "id": "c", "text": "0.41 cm/detik" },
        { "id": "d", "text": "0.55 cm/detik" }
      ],
      "correctAnswerId": "b",
      "explanation": "Misalkan \\(V\\) adalah volume air, \\(r\\) jari-jari permukaan air, dan \\(h\\) tinggi air. Dari kesebangunan segitiga, \\(r/h = 5/12\\) sehingga \\(r = 5h/12\\). Volume air \\(V = (1/3)\\pi r^2 h = (1/3)\\pi (25h^2/144)h = (25\\pi/432)h^3\\). Turunkan terhadap waktu: \\(dV/dt = (25\\pi/144)h^2 (dh/dt)\\). Diketahui \\(dV/dt = 3\\) cm³/detik dan \\(h = 4\\) cm. Maka \\(3 = (25\\pi/144)(4^2)(dh/dt) \\Rightarrow 3 = (25\\pi/144)(16)(dh/dt) \\Rightarrow 3 = (25\\pi/9)(dh/dt)\\). Jadi, \\(dh/dt = 27/(25\\pi) \\approx 27/(25 \\times 3.14) \\approx 0.3439... \\approx 0.34\\) cm/detik."
    }
    // ... 19 soal lainnya
  ]
}
`;
    const userPrompt = 'Buat 20 soal Literasi Matematika SNBT yang sangat sulit sesuai instruksi sistem.';

    try {
      const response = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5, // Slightly lower temperature for more deterministic hard questions
        top_p: 1,
        stream: false,
        response_format: { type: 'json_object' },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content received from Groq API for Literasi Matematika questions.');
      }
      const parsedContent = JSON.parse(content);
      // Add validation here if needed for parsedContent.questions structure
      return parsedContent.questions as SnbtLiterasiMatematikaQuestion[];
    } catch (error) {
      console.error('Error fetching Literasi Matematika questions from Groq:', error);
      throw error;
    }
  }
  async function generateSnbtUltraKuantitatifQuestions(): Promise<SnbtUltraKuantitatifQuestion[]> {
    const systemPrompt = `
    Anda adalah AI yang sangat ahli dalam merancang soal-soal Tes Potensi Skolastik (TPS) subtes Pengetahuan Kuantitatif untuk Seleksi Nasional Berdasarkan Tes (SNBT) di Indonesia dengan tingkat kesulitan TERTINGGI (ultra-hard).
    Tugas Anda adalah membuat 25 soal pilihan ganda yang sangat menantang dalam bahasa Indonesia.
    Setiap soal harus memiliki TEPAT EMPAT pilihan jawaban (A, B, C, D).
    Soal-soal harus mencakup topik-topik berikut dengan tingkat kesulitan maksimal:
    1.  Operasi Numerik & Aljabar Lanjut (misalnya, sistem persamaan non-linear kompleks, perbandingan kuantitatif dengan banyak variabel, manipulasi aljabar tingkat tinggi, teori bilangan lanjutan).
    2.  Interpretasi Data Kompleks (misalnya, analisis grafik multi-dimensi, tabel dengan data tersirat, statistik inferensial dasar, probabilitas majemuk).
    3.  Logika & Pola Abstrak (misalnya, deret aritmatika/geometri bertingkat, pola visual kompleks, matriks logika yang rumit, penalaran deduktif-induktif gabungan).
    4.  Rasio, Laju & Campuran Multivariabel (misalnya, masalah campuran dengan lebih dari dua komponen, sistem laju kerja gabungan yang kompleks, perbandingan rasio bertingkat).
    5.  Matematika Keuangan Lanjut (misalnya, bunga majemuk dengan periode non-standar, anuitas kompleks, analisis titik impas lanjutan, persentase hasil investasi multi-tahap).

    Pastikan setiap soal benar-benar menguji pemahaman mendalam dan kemampuan problem-solving tingkat tinggi, seringkali memerlukan beberapa langkah atau konsep yang digabungkan.

    Setiap soal HARUS memiliki format JSON objek berikut:
    - "id": string (nomor soal unik, e.g., "uq_q1", "uq_q2", ..., "uq_q25")
    - "questionText": string (teks pertanyaan yang jelas, lengkap, dan bisa menyertakan LaTeX untuk formula matematika, e.g., "Jika \\(x^2 + y^2 = 25\\) dan \\(xy = 12\\), berapakah nilai dari \\((x+y)^2\\)?")
    - "topic": string (salah satu dari: 'Operasi Numerik & Aljabar Lanjut', 'Interpretasi Data Kompleks', 'Logika & Pola Abstrak', 'Rasio, Laju & Campuran Multivariabel', 'Matematika Keuangan Lanjut')
    - "options": array objek, masing-masing dengan "id" (string: "a", "b", "c", "d") dan "text" (string: teks pilihan jawaban, bisa mengandung LaTeX).
    - "correctAnswerId": string (id dari pilihan jawaban yang benar, e.g., "c")
    - "explanation": string (penjelasan langkah demi langkah yang detail dan jelas mengapa jawaban tersebut benar, dalam bahasa Indonesia, bisa mengandung LaTeX).

    Contoh SATU objek soal dalam array JSON:
    {
      "id": "uq_q1",
      "questionText": "Sebuah pekerjaan dapat diselesaikan oleh 8 pria dalam 10 hari atau oleh 12 wanita dalam 15 hari. Jika 4 pria dan 6 wanita bekerja bersama, berapa hari waktu yang dibutuhkan untuk menyelesaikan 75% pekerjaan tersebut?",
      "topic": "Rasio, Laju & Campuran Multivariabel",
      "options": [
        {"id": "a", "text": "6 hari"},
        {"id": "b", "text": "7.5 hari"},
        {"id": "c", "text": "9 hari"},
        {"id": "d", "text": "12 hari"}
      ],
      "correctAnswerId": "c",
      "explanation": "Misal P adalah laju kerja 1 pria/hari dan W adalah laju kerja 1 wanita/hari. Total pekerjaan = 8P * 10 = 80P unit. Total pekerjaan = 12W * 15 = 180W unit. Maka 80P = 180W => P = (18/8)W = (9/4)W. Laju kerja gabungan 4 pria dan 6 wanita = 4P + 6W = 4(9/4)W + 6W = 9W + 6W = 15W. Waktu untuk menyelesaikan 100% pekerjaan = (Total Pekerjaan) / (Laju Gabungan) = 180W / 15W = 12 hari. Waktu untuk 75% pekerjaan = 0.75 * 12 hari = 9 hari."
    }

    Pastikan output adalah array JSON yang valid berisi TEPAT 25 soal unik dengan tingkat kesulitan tertinggi. Jangan sertakan teks atau penjelasan lain di luar array JSON itu sendiri.
    `;

    const userPrompt = "Tolong buatkan 25 soal Pengetahuan Kuantitatif ultra-hard sesuai instruksi dalam format array JSON.";

    try {
      const response = await chatCompletion(systemPrompt, userPrompt);
      const responseContent = response.choices[0]?.message?.content;
      
      if (!responseContent) {
        console.error('Respons Groq kosong untuk soal kuantitatif ultra-hard.');
        throw new Error('Respons dari AI kosong. Coba lagi.');
      }

      try {
        // Attempt to parse the content. Groq might return an object with a key like "questions" or "soal"
        // or it might return the array directly.
        let questionsData = JSON.parse(responseContent);
        // Check if the actual array is nested under a key (e.g., "questions" or "soal")
        if (questionsData.questions && Array.isArray(questionsData.questions)) {
          questionsData = questionsData.questions;
        } else if (questionsData.soal && Array.isArray(questionsData.soal)) {
          questionsData = questionsData.soal;
        } else if (!Array.isArray(questionsData)) {
            console.error('Format JSON soal kuantitatif ultra-hard tidak valid (bukan array atau objek yang dikenal) dari Groq:', responseContent);
            throw new Error('Format JSON soal dari AI bukan array atau objek yang dikenal. Coba lagi.');
        }
        
        if (Array.isArray(questionsData) && questionsData.length === 25) {
          const isValidStructure = questionsData.every(q => 
            q.id && q.questionText && q.topic && Array.isArray(q.options) && 
            q.options.length === 4 && // Ensure 4 options
            q.options.every((opt: any) => opt.id && opt.text) && 
            q.correctAnswerId && q.explanation
          );
          if (!isValidStructure) {
            console.error('Struktur data soal kuantitatif ultra-hard dari Groq tidak lengkap atau tidak sesuai:', questionsData);
            throw new Error('Format data soal dari AI tidak lengkap. Coba lagi.');
          }
          return questionsData.map((q, index) => ({ ...q, id: q.id || `uq_q${index + 1}` }));
        } else if (Array.isArray(questionsData)) {
            console.error('Jumlah soal kuantitatif ultra-hard dari Groq tidak sesuai harapan:', questionsData.length, 'soal diterima. Response mentah:', responseContent);
            throw new Error(`Gagal mendapatkan jumlah soal yang benar dari AI. Diterima ${questionsData.length} soal, diharapkan 25. Coba lagi.`);
        }
        // This case should ideally be caught by the initial !Array.isArray(questionsData) check
        console.error('Format JSON soal kuantitatif ultra-hard tidak valid dari Groq:', responseContent);
        throw new Error('Format JSON soal dari AI tidak sesuai. Coba lagi.');
      } catch (jsonError: any) {
        console.error('Gagal mem-parse JSON soal kuantitatif ultra-hard dari Groq:', jsonError.message, 'Response mentah:', responseContent);
        throw new Error('Gagal memproses format soal dari AI. Coba lagi.');
      }
    } catch (e: any) {
      console.error('Groq API Error (generateSnbtUltraKuantitatifQuestions):', e.message);
      throw new Error(`Terjadi kesalahan saat menghubungi AI: ${e.message}. Coba lagi.`);
    }
  }
  async function generateSnbtPenalaranMatematikaQuestions(): Promise<SnbtPenalaranMatematikaQuestion[]> {
    const systemPrompt = `
    Anda adalah AI yang sangat ahli dalam merancang soal-soal Tes Potensi Skolastik (TPS) subtes Penalaran Matematika untuk Seleksi Nasional Berdasarkan Tes (SNBT) di Indonesia dengan tingkat kesulitan TERTINGGI (ultra-hard).
    Tugas Anda adalah membuat 20 soal pilihan ganda yang sangat menantang dalam bahasa Indonesia.
    Setiap soal harus memiliki TEPAT EMPAT pilihan jawaban (A, B, C, D).
    Soal-soal harus mencakup topik-topik inti Penalaran Matematika SNBT berikut dengan tingkat kesulitan maksimal, menuntut penalaran multi-langkah:
    1.  Bilangan (representasi bilangan, sifat urutan, operasi hitung kompleks, FPB/KPK dalam konteks, bilangan prima dan komposit lanjutan).
    2.  Himpunan & Pola Bilangan (operasi himpunan kompleks, diagram Venn multi-set, pola bilangan non-linear, barisan dan deret aritmetika/geometri tingkat lanjut atau gabungan).
    3.  Aljabar & Fungsi (manipulasi bentuk aljabar kompleks, sistem persamaan/pertidaksamaan linear dan kuadrat, fungsi komposisi dan invers dengan kondisi, grafik fungsi non-standar).
    4.  Aritmetika Sosial, Perbandingan & Rasio (masalah jual-beli dengan diskon/pajak bertingkat, perbandingan senilai/berbalik nilai dalam skenario kompleks, skala dan peta lanjutan).
    5.  Persamaan Garis Lurus & Fungsi (gradien dan persamaan garis dalam berbagai bentuk, hubungan antar garis, aplikasi fungsi linear dalam masalah optimasi sederhana).
    6.  Pengukuran & Geometri (sifat-sifat bangun datar dan ruang lanjutan, teorema Pythagoras dalam 3D, luas permukaan dan volume gabungan, kesebangunan dan kekongruenan kompleks, transformasi geometri gabungan).
    7.  Data & Ketidakpastian (statistika deskriptif: mean, median, modus, jangkauan, kuartil, simpangan baku untuk data kelompok/tunggal; teori peluang kejadian majemuk, saling lepas, saling bebas; aturan pencacahan: permutasi, kombinasi dalam masalah non-standar).

    Pastikan setiap soal benar-benar menguji kemampuan penalaran matematis tingkat tinggi, bukan sekadar hafalan rumus. Soal harus orisinal dan mencerminkan kompleksitas SNBT.

    Setiap soal HARUS memiliki format JSON objek berikut:
    - "id": string (nomor soal unik, e.g., "pm_q1", "pm_q2", ..., "pm_q20")
    - "questionText": string (teks pertanyaan yang jelas, lengkap, dan bisa menyertakan LaTeX untuk formula matematika, e.g., "Diberikan fungsi \\(f(x) = ax^2 + bx + c\\). Jika grafik fungsi tersebut melalui titik (1,0), (4,0) dan (0,-4), maka nilai \\(a+b+c\\) adalah...")
    - "topic": string (salah satu dari: 'Bilangan', 'Himpunan & Pola Bilangan', 'Aljabar & Fungsi', 'Aritmetika Sosial, Perbandingan & Rasio', 'Persamaan Garis Lurus & Fungsi', 'Pengukuran & Geometri', 'Data & Ketidakpastian')
    - "options": array objek, masing-masing dengan "id" (string: "a", "b", "c", "d") dan "text" (string: teks pilihan jawaban, bisa mengandung LaTeX).
    - "correctAnswerId": string (id dari pilihan jawaban yang benar, e.g., "b")
    - "explanation": string (penjelasan langkah demi langkah yang detail dan jelas mengapa jawaban tersebut benar, dalam bahasa Indonesia, bisa mengandung LaTeX).

    Contoh SATU objek soal dalam array JSON:
    {
      "id": "pm_q1",
      "questionText": "Sebuah wadah berbentuk tabung dengan jari-jari alas 7 cm dan tinggi 20 cm berisi air setinggi 15 cm. Kemudian, tiga buah bola besi identik dengan jari-jari 3.5 cm dimasukkan ke dalam tabung tersebut hingga seluruhnya tenggelam. Kenaikan tinggi air dalam tabung adalah... (\\(\\pi = \\frac{22}{7}\\))",
      "topic": "Pengukuran & Geometri",
      "options": [
        {"id": "a", "text": "3.5 cm"},
        {"id": "b", "text": "4.0 cm"},
        {"id": "c", "text": "4.5 cm"},
        {"id": "d", "text": "5.0 cm"}
      ],
      "correctAnswerId": "a",
      "explanation": "Volume 1 bola besi = \\(\\frac{4}{3} \\pi r^3 = \\frac{4}{3} \\times \\frac{22}{7} \\times (3.5)^3 = \\frac{539}{3}\\) cm³.\\nVolume 3 bola besi = \\(3 \\times \\frac{539}{3} = 539\)
 cm³.\\nKenaikan volume air dalam tabung sama dengan volume 3 bola besi.\\nMisal kenaikan tinggi air adalah \\(h\\) cm. Maka, \\(\\pi R^2 h = 539\\), dimana \\(R\\) adalah jari-jari tabung.\\n\\(\\frac{22}{7} \\times 7^2 \\times h = 539 \\implies 154h = 539 \\implies h = \\frac{539}{154} = 3.5\)
 cm."
    }

    Pastikan output adalah array JSON yang valid berisi TEPAT 20 soal unik dengan tingkat kesulitan tertinggi. Jangan sertakan teks atau penjelasan lain di luar array JSON itu sendiri.
    `;

    const userPrompt = "Tolong buatkan 20 soal Penalaran Matematika SNBT ultra-hard sesuai instruksi dalam format array JSON.";

    try {
      const response = await chatCompletion(systemPrompt, userPrompt);
      const responseContent = response.choices[0]?.message?.content;
      
      if (!responseContent) {
        console.error('Respons Groq kosong untuk soal Penalaran Matematika.');
        throw new Error('Respons dari AI kosong. Coba lagi.');
      }

      try {
        let questionsData = JSON.parse(responseContent);
        if (questionsData.questions && Array.isArray(questionsData.questions)) {
          questionsData = questionsData.questions;
        } else if (questionsData.soal && Array.isArray(questionsData.soal)) {
          questionsData = questionsData.soal;
        } else if (!Array.isArray(questionsData)) {
            console.error('Format JSON soal Penalaran Matematika tidak valid (bukan array atau objek yang dikenal) dari Groq:', responseContent);
            throw new Error('Format JSON soal dari AI bukan array atau objek yang dikenal. Coba lagi.');
        }
        
        if (Array.isArray(questionsData) && questionsData.length === 20) {
          const isValidStructure = questionsData.every(q => 
            q.id && q.questionText && q.topic && Array.isArray(q.options) && 
            q.options.length === 4 && 
            q.options.every((opt: any) => opt.id && opt.text) && 
            q.correctAnswerId && q.explanation
          );
          if (!isValidStructure) {
            console.error('Struktur data soal Penalaran Matematika dari Groq tidak lengkap atau tidak sesuai:', questionsData);
            throw new Error('Format data soal dari AI tidak lengkap. Coba lagi.');
          }
          return questionsData.map((q, index) => ({ ...q, id: q.id || `pm_q${index + 1}` }));
        } else if (Array.isArray(questionsData)) {
            console.error('Jumlah soal Penalaran Matematika dari Groq tidak sesuai harapan:', questionsData.length, 'soal diterima. Response mentah:', responseContent);
            throw new Error(`Gagal mendapatkan jumlah soal yang benar dari AI. Diterima ${questionsData.length} soal, diharapkan 20. Coba lagi.`);
        }
        console.error('Format JSON soal Penalaran Matematika tidak valid dari Groq:', responseContent);
        throw new Error('Format JSON soal dari AI tidak sesuai. Coba lagi.');
      } catch (jsonError: any) {
        console.error('Gagal mem-parse JSON soal Penalaran Matematika dari Groq:', jsonError.message, 'Response mentah:', responseContent);
        throw new Error('Gagal memproses format soal dari AI. Coba lagi.');
      }
    } catch (e: any) {
      console.error('Groq API Error (generateSnbtPenalaranMatematikaQuestions):', e.message);
      throw new Error(`Terjadi kesalahan saat menghubungi AI: ${e.message}. Coba lagi.`);
    }
  }

// Make sure to export the new function as well
return {
  chatCompletion,
  generateIntegratedWritingContent,
  getIntegratedWritingFeedback,
  generateIndependentWritingPrompts, // Assuming this was from the original file
  getIndependentWritingFeedback,   // Assuming this was from the original file
  getIeltsWritingFeedback, // Export the new function
  predefinedIndependentPrompts,
  generateVocabularyQuestions,
  getIeltsGeneralLetterFeedback, // For IELTS General Letter (General Task 1)
    generateMbtiQuestions, // Add this
    getMbtiTypeDescription, // Add this
    generateSnbtPengetahuanUmumQuestions,
    generateSnbtPenalaranDeduktifQuestions,
    generateSnbtPenalaranInduktifQuestions,
    generateSnbtPenalaranKuantitatifQuestions, 
    generateSnbtLiterasiIndonesiaQuestions,
    generateEnglishLiteracyQuestions,
    generateSnbtLiterasiMatematikaQuestions,
    generateSnbtUltraKuantitatifQuestions,
    generateSnbtPenalaranMatematikaQuestions
};
};

// Specific function to get feedback on IELTS Writing (Task 1 or Task 2)
// This is a new function you'll need to implement based on the structure of getIntegratedWritingFeedback
