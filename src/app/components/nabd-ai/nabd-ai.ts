import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  specialties?: string[];
  attachmentName?: string;
  attachmentUrl?: string;   // object URL for preview
  attachmentIsImage?: boolean;
}

interface SidebarChat {
  title: string;
}

@Component({
  selector: 'app-nabd-ai',
  imports: [CommonModule, FormsModule],
  templateUrl: './nabd-ai.html',
  styleUrl: './nabd-ai.css'
})
export class NabdAi {
  inputText = signal('');
  messages = signal<ChatMessage[]>([]);
  selectedFile = signal<File | null>(null);
  selectedFilePreviewUrl = signal<string | null>(null);

  suggestedQuestions = [
    'أعاني من صداع مستمر منذ يومين مع زغللة في العين',
    'أشعر بألم حاد في المعدة بعد تناول الطعام',
    'ما التخصص المناسب لألم أسفل الظهر؟',
    'ابحث لي عن أفضل طبيب قلب في الرياض'
  ];

  previousChats: SidebarChat[] = [
    { title: 'اسم المحادثة' },
    { title: 'اسم المحادثة' },
    { title: 'اسم المحادثة' },
    { title: 'اسم المحادثة' }
  ];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);

      if (file.type.startsWith('image/')) {
        this.selectedFilePreviewUrl.set(URL.createObjectURL(file));
      } else {
        this.selectedFilePreviewUrl.set(null);
      }
    }
    input.value = ''; // allows re-selecting the same file later
  }

  removeSelectedFile() {
    this.selectedFile.set(null);
    this.selectedFilePreviewUrl.set(null);
  }

  sendMessage(text?: string) {
    const messageText = (text ?? this.inputText()).trim();
    const file = this.selectedFile();

    if (!messageText && !file) return;

    const newMessage: ChatMessage = {
      role: 'user',
      text: messageText
    };

    if (file) {
      const isImage = file.type.startsWith('image/');
      newMessage.attachmentName = file.name;
      newMessage.attachmentIsImage = isImage;
      newMessage.attachmentUrl = isImage
        ? (this.selectedFilePreviewUrl() ?? URL.createObjectURL(file))
        : undefined;
    }

    this.messages.update(msgs => [...msgs, newMessage]);

    this.inputText.set('');
    this.selectedFile.set(null);
    this.selectedFilePreviewUrl.set(null);

    // TODO: replace with real API call to your ChatService/MedicalImageService endpoint
    this.messages.update(msgs => [...msgs, {
      role: 'ai',
      text: 'بناءً على الأعراض ووصفتها (صداع مستمر، زغللة في العين، ألم في الرقبة)، قد يكون هذا مرتبطاً بعدة أسباب مثل إجهاد العين، ارتفاع ضغط الدم، أو التوتر العضلي.',
      specialties: ['طب الأعصاب', 'طب العيون']
    }]);
  }

  startNewChat() {
    this.messages.set([]);
    this.selectedFile.set(null);
    this.selectedFilePreviewUrl.set(null);
  }
}
