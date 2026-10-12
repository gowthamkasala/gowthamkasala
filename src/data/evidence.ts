export type Evidence =
  | {kind:'screenshot'|'photo'|'diagram';src:string;alt:string;caption:string;sanitized?:boolean}
  | {kind:'document';href:string;title:string;caption:string}
  | {kind:'comparison';before:{src:string;alt:string};after:{src:string;alt:string};caption:string};
export const projectEvidence: Record<string,Evidence[]>={};
export function safeEvidenceUrl(value:string){if(value.startsWith('/')&&!value.startsWith('//'))return true;try{return new URL(value).protocol==='https:';}catch{return false;}}
