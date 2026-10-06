export async function onRequestGet({request,env}){
 const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Referrer-Policy':'no-referrer','Set-Cookie':'bi_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0'};
 const fail=(message,status=400)=>new Response(message,{status,headers});
 if(!env.GITHUB_CLIENT_SECRET||!env.SITE_ORIGIN||!env.GITHUB_CLIENT_ID)return fail('Editor authentication has not been configured.',503);
 const url=new URL(request.url),state=url.searchParams.get('state'),code=url.searchParams.get('code');
 const cookie=(request.headers.get('Cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('bi_oauth_state='))?.split('=')[1];
 if(!state||!cookie||state!==cookie||!code)return fail('Sign-in could not be verified. Close this window and try again.');
 try{
 const response=await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code,redirect_uri:`${env.SITE_ORIGIN}/api/callback`})});
 const result=await response.json();if(!response.ok||!result.access_token)return fail('GitHub sign-in failed. Please try again.');
 const safe=v=>JSON.stringify(v).replaceAll('<','\\u003c');
 const origin=safe(new URL(env.SITE_ORIGIN).origin);
 const message=safe('authorization:github:success:'+JSON.stringify({token:result.access_token,provider:'github'}));
 const nonce=crypto.randomUUID();headers['Content-Security-Policy']=`default-src 'none'; script-src 'nonce-${nonce}'; frame-ancestors 'none'`;
 return new Response(`<!doctype html><title>Completing sign-in</title><p>Completing editor sign-in. You can close this window once the editor opens.</p><script nonce="${nonce}">const origin=${origin};const openerWindow=window.opener;if(openerWindow){window.addEventListener('message',function receive(event){if(event.origin!==origin||event.source!==openerWindow)return;openerWindow.postMessage(${message},origin);window.removeEventListener('message',receive);window.close();});openerWindow.postMessage('authorizing:github',origin);}</script>`,{headers});
 }catch{return fail('Sign-in is temporarily unavailable. Please try again.',502)}
}
