// Type definitions for custom modules and global types

declare module '*.css' {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const content: any;
  export default content;
}

// EmailJS types
declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export function init(publicKey: string): void;
  export function send(
    serviceID: string,
    templateID: string,
    templateParams?: Record<string, unknown>,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;
  
  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement | string,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;
}

// Typed.js enhanced types
declare module 'typed.js' {
  interface TypedOptions {
    strings?: string[];
    stringsElement?: Element | string;
    typeSpeed?: number;
    startDelay?: number;
    backSpeed?: number;
    smartBackspace?: boolean;
    shuffle?: boolean;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    loop?: boolean;
    loopCount?: number;
    showCursor?: boolean;
    cursorChar?: string;
    autoInsertCss?: boolean;
    attr?: string;
    bindInputFocusEvents?: boolean;
    contentType?: 'html' | 'null';
    onBegin?: (self: Typed) => void;
    onComplete?: (self: Typed) => void;
    preStringTyped?: (arrayPos: number, self: Typed) => void;
    onStringTyped?: (arrayPos: number, self: Typed) => void;
    onLastStringBackspaced?: (self: Typed) => void;
    onTypingPaused?: (arrayPos: number, self: Typed) => void;
    onTypingResumed?: (arrayPos: number, self: Typed) => void;
    onReset?: (self: Typed) => void;
    onStop?: (arrayPos: number, self: Typed) => void;
    onStart?: (arrayPos: number, self: Typed) => void;
    onDestroy?: (self: Typed) => void;
  }

  export default class Typed {
    constructor(element: Element | string, options: TypedOptions);
    
    toggle(): void;
    stop(): void;
    start(): void;
    destroy(): void;
    reset(restart?: boolean): void;
  }
}

// AOS types
declare module 'aos' {
  interface AosOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: boolean | string | (() => boolean);
    startEvent?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    throttleDelay?: number;
    debounceDelay?: number;
  }

  interface AOS {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const aos: AOS;
  export default aos;
}

// Global types
interface Window {
  AOS?: any;
  emailjs?: any;
}

// Portfolio specific types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools';
  proficiency: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  active: boolean;
}
