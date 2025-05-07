import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './context';
import axios from 'axios';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;
const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const { isPending, isError, data } = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(`${url}&query=${searchTerm}`);
      console.log(data);
      return data;
    },
  });

  console.log(data);

  if (isPending) {
    return (
      <section className=' loading-container'>
        <div className='loading'></div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4>there was an error...</h4>
      </section>
    );
  }
  const results = data.results;
  if (results.length < 1) {
    return (
      <section className='image-container'>
        <h4>no result found...</h4>
      </section>
    );
  }

  return (
    <section className='image-container'>
      {results.map((item) => {
        const { id, alt_description } = item;
        const url = item?.urls?.regular;
        return <img src={url} alt={alt_description} key={id} className='img' />;
      })}
    </section>
  );
};
export default Gallery;
