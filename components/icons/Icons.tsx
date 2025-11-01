// Fix: Provide full content for Icons.tsx
import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 01-3.388-1.62m-1.622-3.385a15.998 15.998 0 013.388 1.62m-5.043-.025a15.998 15.998 0 00-1.622 3.385m-3.388-1.62a15.998 15.998 0 01-3.388 1.62m1.622 3.385a15.998 15.998 0 003.388 1.622m-1.622 3.385a15.998 15.998 0 01-3.388-1.622m5.043.025a15.998 15.998 0 00-1.622-3.385" />
    </Icon>
);

export const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0 0v14.25" />
    </Icon>
);

export const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Icon>
);

export const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </Icon>
);

export const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </Icon>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a3 3 0 00-3-3m3 3a3 3 0 003-3m-3 3V1.5m0 9.75v-9.75M12 9.75L13.5 3m-3 0L12 9.75m-4.5 0L7.5 3m-3 0L6 9.75M3 12h18" />
    </Icon>
);

export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 12" />
    </Icon>
);

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </Icon>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </Icon>
);
