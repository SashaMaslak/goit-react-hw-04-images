import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './services/fetchImages';

export function App() {
  // state = {
  //   images: [],
  //   query: '',
  //   page: 1,
  //   isLoading: false,
  //   isModalOpen: false,
  //   modalImage: '',
  // };

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // componentDidUpdate(_, prevState) {
  //   const { query, page } = this.state;
  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.setState({ isLoading: true });
  //     fetchImages(query, page)
  //       .then(images => {
  //         this.setState(prev => ({
  //           images: page === 1 ? images : [...prev.images, ...images],
  //         }));
  //       })
  //       .catch(error => console.log(error))
  //       .finally(() => this.setState({ isLoading: false }));
  //   }
  // }

  useEffect(() => {
    if (query === '') {
      return;
    }
    const getImages = () => {
      setIsLoading(true);
      fetchImages(query, page)
        .then(result => {
          setImages(prev => (page === 1 ? result : [...prev, ...result]));
        })
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    };
    getImages();
  }, [query, page]);

  const onSubmit = e => {
    e.preventDefault();
    const queryValue = e.currentTarget.elements.query.value
      .toLowerCase()
      .trim();
    if (queryValue) {
      setQuery(queryValue);
      setPage(1);
      return;
    }
    return alert(
      'Your search Name is empty, Please enter correct search Name!'
    );
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = image => {
    if (image) {
      setIsModalOpen(true);
      setModalImage(image);
      return;
    }
    setIsModalOpen(false);
    setModalImage('');
  };
  console.log(images);
  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} toggleModal={toggleModal} />

      {!!images.length && !isLoading && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {images.length === 0 && query && !isLoading && (
        <h1>По запиту {query} нічого не знайдено</h1>
      )}
      {isModalOpen && (
        <Modal toggleModal={toggleModal} modalImage={modalImage} />
      )}
    </>
  );
}
