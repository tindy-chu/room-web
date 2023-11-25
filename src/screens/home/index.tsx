import Frame from '../../components/Frame';
import useAuth from '../../hook/useAuth';

export default function Home() {
  useAuth();

  return <Frame />;
}
