import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import nivoLogo from "../assets/logo-nivo.svg";

const wallpaperImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    login();
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo - Wallpaper */}
      <div className="hidden lg:block lg:w-1/2">
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${wallpaperImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="h-full bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-white p-8 text-center">
              <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta</h1>
              <p className="text-xl">Acesse sua conta e continue de onde parou</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className='flex items-center justify-center p-10'>
            <img src={nivoLogo} alt="nivo.video" width={80} />
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Acesse sua conta</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>

            <button 
              type="submit" 
              className="mt-4 p-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-gray-200">
            <p className="text-gray-600">Não tem uma conta?</p>
            <button 
              onClick={() => {
                navigate('/signup');
              }}
              className="text-blue-600 font-medium hover:underline mt-2"
            >
              Crie sua conta grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}