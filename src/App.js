import './App.css';
import './darkMode.css'
import { useEffect, useState } from 'react';
import Sidepanel from './components/Sidepanel';
import MainContent from './components/Maincontent';
import Toolbar from './components/Toolbar';
import BookmarksBar from './components/BookmarksBar';
import BookmarkAlert from './components/BookmarkAlert';
import DetailedView from './components/DetailedView';
import { propertyListings } from './data/propertylistings';
import { BiXCircle } from 'react-icons/bi'
import LoadingScreen from './components/LoadingScreen';
import NewListingForm from './components/NewListingForm';

function App() {

  // Search Bar Function

  const [searchQuery, setSearchQuery] = useState('')

  // Filtering Options

  const [properties, setProperties] = useState(propertyListings)

  // useEffect(() => {
  //     const propertiesInLocalStorage = 
  //   JSON.parse(localStorage.getItem('updated-properties'))
  //     if (propertiesInLocalStorage) {
  //       setProperties(propertiesInLocalStorage)
  //     }
  // }, [])

  const [newHomes, setNewHomes] = useState(false)
  const [recent, setRecent] = useState(false)
  const [apartments, setApartments] = useState(false)
  const [twoBed, setTwoBed] = useState(false)
  const [threeBed, setThreeBed] = useState(false)
  const [fourBedPlus, setFourBedPlus] = useState(false)
  const [value, setValue] = useState(500000)

  // Sorting Options

  const [cardView, setCardView] = useState(true)
  const handleCardView = () => setCardView(!cardView)

  const [sortByPrice, setSortByPrice] = useState(null)
  const [sortByBedrooms, setSortByBedrooms] = useState(null)    
  const [sortByBathrooms, setSortByBathrooms] = useState(null)

  const setSortingToNull = () => {
    setSortByPrice(null)
    setSortByBedrooms(null)
    setSortByBathrooms(null)
  }
  
  // Filtering Options Functions

  const setAllProperties = () => {
    setProperties(propertyListings)
    setNewHomes(false)
    setRecent(false)
    setApartments(false)
    setTwoBed(false)
    setThreeBed(false)
    setFourBedPlus(false)
    setHasRun(false)
    setSortingToNull()
  }  
  
  const toggleFilter = (variable, setVariable) => {
    setVariable((prevState) => !prevState)
    setSortingToNull()
  }

  const priceSelector = (event, value) => {
    value = Math.round((value/1000))*1000;
    setValue(value);
    filter();
  };

  const filter = () => {
    let updatedCards = propertyListings;

    if (newHomes) {
      updatedCards = updatedCards.filter(house => house.newHome === 'New Home')
    }

    if (recent) {
      updatedCards = updatedCards.filter(house => house.recentlyAdded === 'Recently Added')
    }

    if (apartments) {
      updatedCards = updatedCards.filter(house => house.type === 'Apartment')
    }

    if (twoBed) {
      updatedCards = updatedCards.filter(house => house.bedrooms === 2)
    }

    if (threeBed) {
      updatedCards = updatedCards.filter(house => house.bedrooms === 3)
    }

    if (fourBedPlus) {
      updatedCards = updatedCards.filter(house => house.bedrooms >= 4)
    }

    if (value) {
      updatedCards = updatedCards.filter(house => parseInt(house.price) <= parseInt(value))
    }

    if (!newHomes && !recent && !apartments && !twoBed
      && !threeBed && !fourBedPlus && !value) {
        setProperties(updatedCards)
      }
    
    setProperties(updatedCards)
    setHasRun(false);
  }

  useEffect(() => {
    filter()
  }, [newHomes, 
      recent,
      apartments, 
      twoBed,
      threeBed, 
      fourBedPlus, 
      value]
  )

  // Bookmarks

    const [bookmarks, setBookmarks] = useState([])
    const [bookmarksBar, setBookmarksBar] = useState(false)
    const [bookmarkAlert, setBookmarkAlert] = useState(false)
    const [bookmarkExistsAlerty, setBookmarkExistsAlert] = useState(false)

    const toggleBookmarksBar = () => {
      setBookmarksBar(!bookmarksBar)
      setMobileMenu(false)
    }

    const handleBookmarkAlert = () => {
      setBookmarkAlert(true);
      setTimeout(() => {
        setBookmarkAlert(false)
      }, 3000)
    }

    const handleBookmarkExistsAlert = () => {
      setBookmarkExistsAlert(true);
      setTimeout(() => {
        setBookmarkExistsAlert(false)
      }, 3000)
    }
    
    const createBookmark = (e) => {
      const currentCard = e.currentTarget;
      const bookmarkId = parseInt(currentCard.parentElement.parentElement.id);
      const bookmarkedCard = propertyListings[bookmarkId]
      const existingCard = bookmarks.find(bookmark => bookmark.index === bookmarkId)

      if (existingCard) {
        handleBookmarkExistsAlert()
      } else {
        setBookmarks([...bookmarks, bookmarkedCard]);
        localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, bookmarkedCard]))
        handleBookmarkAlert()
      }
    }

    const removeBookmark = (id) => {
      const newBookmarks = bookmarks.filter(bookmark => {
        return bookmark.index !== id;
      })
      setBookmarks([...newBookmarks])
      localStorage.setItem('bookmarks', JSON.stringify([...newBookmarks]));
    }

    const retrieveBookmarks = () => {
      const savedBookmarks = localStorage.getItem('bookmarks')
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks)
        setBookmarks(bookmarks)
      }
    }

    useEffect(() => {
      retrieveBookmarks()
    }, [])

    // Below Market Value

    const [hasRun, setHasRun] = useState(false);

    const calculateBelowMarketValue = () => {
      if (hasRun) {
        return;
      }
      setHasRun(true);
  
      const housePriceTotal = properties.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
      }, 0)
  
      const averagePrice = housePriceTotal / properties.length;
      const belowAverage = properties.filter(house => {
        return house.price < averagePrice;
      })
      setProperties(belowAverage);
    };

    // Toggle Theme

    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
      if (theme === 'light') {
        setTheme('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        setTheme('light')
        localStorage.setItem('theme', 'light')
      }
    }

    const setThemeOnRender = () => {
      const theme = localStorage.getItem('theme')
      if (theme === 'light') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }

    useEffect(() => {
      document.body.className = theme;
      setThemeOnRender()
    }, [theme])

    // Detailed Card View

    const [renderDetailedView, setShowDetailedView] = useState(false)
    const detailedViewIsVisible = () => setShowDetailedView(true)
    const detailedViewIsHidden = () => setShowDetailedView(false)

    const [detailedView, setDetailedView] = useState([])

    const showDetailedCardView = (e) => {
      const currentCard = e.currentTarget;
      const cardId = parseInt(currentCard.parentElement.parentElement.parentElement.id);
      const detailedCard = propertyListings[cardId]
      setDetailedView([detailedCard])
      detailedViewIsVisible()
      if (bookmarksBar) {
        setBookmarksBar(false)
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', handleEscKeyPress, true)
    }, []) 

    const handleEscKeyPress = (e) => {
      if (e.key === 'Escape') {
        setShowDetailedView(false)
        setBookmarksBar(false)
      }
    }

    // Tablet/Mobile Functionality

    const [mobileMenu, setMobileMenu] = useState(false)
    const toggleMobileMenu = () => {
      setMobileMenu(!mobileMenu)
      setSortingOptions(false)
      setBookmarksBar(false)
      setShowDetailedView(false)
    }

    const closeMenusOnClick = () => {
      setMobileMenu(false)
      setBookmarksBar(false)
      setShowDetailedView(false)
    }

    const [sortingOptions, setSortingOptions] = useState(false)
    const toggleSortingOptions = () => setSortingOptions(!sortingOptions)

    // New Listing

    const [newListingForm, setNewListingForm] = useState(false)
    const handleNewListingForm = () => setNewListingForm(true)
    const closeNewListingForm = () => setNewListingForm(false)

  return (
    <div className={`App ${theme}`}>

      <BookmarkAlert 
        bookmarkAlert={bookmarkAlert}
        bookmarkExistsAlerty={bookmarkExistsAlerty}
      />

      <DetailedView 
        detailedView={detailedView}
        renderDetailedView={renderDetailedView}
        detailedViewIsVisible={detailedViewIsVisible}
        detailedViewIsHidden={detailedViewIsHidden}
      />

      <NewListingForm
        closeNewListingForm={closeNewListingForm}
        newListingForm={newListingForm}
        propertyListings={propertyListings}
        properties={properties}
        setProperties={setProperties}
      />

      <div className='main-body'>
        <LoadingScreen />

        <div className={
          renderDetailedView || bookmarksBar || mobileMenu || newListingForm
          ? 'dim-background' : 'dim-background hidden'}
          onClick={closeMenusOnClick}
          >
        </div>

        <Sidepanel 
          setSearchQuery={setSearchQuery}
          toggleFilter={toggleFilter}
          setAllProperties={setAllProperties}
          setRecent={setRecent}
          setNewHomes={setNewHomes}
          setApartments={setApartments}
          setTwoBed={setTwoBed}
          setThreeBed={setThreeBed}
          setFourBedPlus={setFourBedPlus}
          priceSelector={priceSelector}

          value={value}
          newHomes={newHomes}
          recent={recent}
          apartments={apartments}
          twoBed={twoBed}
          threeBed={threeBed}
          fourBedsPlus={fourBedPlus}
          mobileMenu={mobileMenu}

          calculateBelowMarketValue={calculateBelowMarketValue}
          toggleBookmarksBar={toggleBookmarksBar}
          bookmarkTotal={bookmarks.length}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <div className='container'>
          <Toolbar 
            handleCardView={handleCardView}
            toggleMobileMenu={toggleMobileMenu}
            toggleSortingOptions={toggleSortingOptions}
            setSearchQuery={setSearchQuery}
            handleNewListingForm={handleNewListingForm}
            setProperties={setProperties}
            setSortByPrice={setSortByPrice}
            setSortByBedrooms={setSortByBedrooms}
            setSortByBathrooms={setSortByBathrooms}

            cardView={cardView}
            properties={properties}
            mobileMenu={mobileMenu}
            sortingOptions={sortingOptions}
            sortByPrice={sortByPrice}
            sortByBedrooms={sortByBedrooms}
            sortByBathrooms={sortByBathrooms}
          />

          <div className='content-container'>
            <MainContent 
              searchQuery={searchQuery}
              cardView={cardView}
              properties={properties}
              createBookmark={createBookmark}
              handleBookmarkAlert={handleBookmarkAlert}
              showDetailedCardView={showDetailedCardView}
              />
          </div>

          <div className={bookmarksBar ? 'bookmarks-bar' : 'bookmarks-bar hidden'}>
            <div>
              <div className='bookmarks-top'>
                <h4>Saved Properties</h4>
                <BiXCircle className='bookmarks-close' onClick={toggleBookmarksBar}/>
              </div>

              <div className='bookmarks-container'>
                {bookmarks.length === 0 ? 'You have no saved listings. Bookmark a listing to view it here.' : ''}

                <BookmarksBar 
                  removeBookmark={removeBookmark}
                  bookmarks={bookmarks}
                  showDetailedCardView={showDetailedCardView}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
