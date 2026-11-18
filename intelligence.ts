import { createClient } from '@supabase/supabase-js'
export const fields = { policies: 'id,title,summary,description,source,sector,date,source_url', diffs: 'id,title,summary,changes,sector,date', portals:'id,name,description,status,url', memos:'id,title,content,date' } as const
export type Table = keyof typeof fields
export type Entry = {id:string;title?:string;summary?:string;description?:string;source?:string;sector?:string;date?:string;source_url?:string;changes?:unknown;name?:string;status?:string;url?:string;content?:string}
const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const client=url && key ? createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}):null
export async function readFeed(table:Table){
 if(!client) throw new Error('Public Supabase credentials have not been configured.')
 let rows:Entry[]=[];let count=0;
 do {let query=client.from(table).select(fields[table],{count:'exact'});if(table!=='portals')query=query.order('date',{ascending:false}); const result=await query.order('id').range(rows.length,rows.length+999); if(result.error)throw new Error(result.error.code==='PGRST205'?`The ${table} table is not available in the connected database.`:`Supabase could not load ${table}: ${result.error.message}`); const batch=(result.data||[]) as unknown as Entry[];rows=rows.concat(batch);count=result.count??rows.length;if(!batch.length)break;}while(rows.length<count);
 return {rows,time:Date.now()}
}
export const sectors=['All','Solar Energy','Transmission & Grid','Green Hydrogen','BESS']
export const sources=[{code:'MNRE',name:'Ministry of New and Renewable Energy',url:'https://mnre.gov.in/'},{code:'CERC',name:'Central Electricity Regulatory Commission',url:'https://cercind.gov.in/'},{code:'SECI',name:'Solar Energy Corporation of India',url:'https://www.seci.co.in/'}]
