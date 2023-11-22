import useAuth from '../../hook/useAuth';

export default function Home() {
  useAuth();
  return <div>Home</div>;
}
