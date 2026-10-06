export async function onRequestGet({env}) {
 if(!env.GITHUB_CLIENT_ID||!env.SITE_ORIGIN)return new Response('Editor authentication has not been configured.',{status:503});
 const state=crypto.randomUUID();
 const u=new URL('https://github.com/login/oauth/authorize');
 u.searchParams.set('client_id',env.GITHUB_CLIENT_ID);u.searchParams.set('redirect_uri',`${env.SITE_ORIGIN}/api/callback`);u.searchParams.set('scope','public_repo');u.searchParams.set('state',state);
 return new Response(null,{status:302,headers:{Location:u.toString(),'Set-Cookie':`bi_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`,'Cache-Control':'no-store'}});
}
