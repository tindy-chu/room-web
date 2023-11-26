import Frame from '../../components/frame';
import useAuth from '../../hook/useAuth';

export default function Home() {
  useAuth();

  return <Frame />;
}
