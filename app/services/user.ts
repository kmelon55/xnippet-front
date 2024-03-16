import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  return data;
}

export async function signUpUser(props: RegisterUserInput) {
  const { username, name, email, password } = props;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: username,
        name,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signInUser(props: SigninUserInput) {
  const { email, password } = props;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {},
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

export async function updateUser(props: UpdateUserInput) {
  const { email, username, name } = props;

  const { data, error } = await supabase.auth.updateUser({
    email,
    data: { user_name: username, name },
  });

  if (error) throw error;

  return data;
}

export async function deleteUser(id: string) {
  const { data, error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) throw error;

  return data;
}

export async function changePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  return data;
}

export async function signInWithKakao() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
    },
  });

  if (error) throw error;
}
