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

function App() {

  // Search Bar Function

  const [searchQuery, setSearchQuery] = useState('')

  // Filtering Options

  const [properties, setProperties] = useState(propertyListings)
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
  const sortPriceAscending = () => setSortByPrice(true)
  const sortPriceDescending = () => setSortByPrice(false)

  const [sortByBedrooms, setSortByBedrooms] = useState(null)
  const sortBedroomsAscending = () => setSortByBedrooms(true)
  const sortBedroomsDescending = () => setSortByBedrooms(false)
  
  const [sortByBathrooms, setSortByBathrooms] = useState(null)
  const sortBathroomsAscending = () => setSortByBathrooms(true)
  const sortBathroomsDescending = () => setSortByBathrooms(false)

  useEffect(() => {
    setSortByPrice()
    setSortByBedrooms()
    setSortByBathrooms()
  }, [sortByPrice, sortByBedrooms, sortByBathrooms]) 

  const resetSortingOptions = () => {
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
    setHasRun(false);
  }

  const toggleFilterByNew = () => {
    setNewHomes(((prevState) => !prevState))
    filter()
  }

  const toggleRecentlyAdded = () => {
    setRecent(((prevState) => !prevState))
    filter()
  }

  const toggleApartments = () => {
    setApartments(((prevState) => !prevState))
    filter()
  }

  const toggleTwoBed = () => {
    setTwoBed(((prevState) => !prevState))
    filter()
  }

  const toggleThreeBed = () => {
    setThreeBed(((prevState) => !prevState))
    filter()
  }

  const toggleFourBedPlus = () => {
    setFourBedPlus(((prevState) => !prevState))
    filter()
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
      value,]
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

      <div className='main-body'>

        <div className={
          renderDetailedView || bookmarksBar || mobileMenu 
          ? 'dim-background' : 'dim-background hidden'}
          onClick={closeMenusOnClick}
          >
        </div>

        <Sidepanel 
          setSearchQuery={setSearchQuery}
          allProperties={setAllProperties}
          recentlyAdded={toggleRecentlyAdded}
          filterByNew={toggleFilterByNew}
          apartments={toggleApartments}
          twoBed={toggleTwoBed}
          threeBed={toggleThreeBed}
          fourPlusBed={toggleFourBedPlus}
          priceSelector={priceSelector}

          value={value}
          newHome={newHomes}
          recent={recent}
          apartment={apartments}
          twoBeds={twoBed}
          threeBeds={threeBed}
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
            sortPriceAscending={sortPriceAscending}
            sortPriceDescending={sortPriceDescending}
            sortBedroomsAscending={sortBedroomsAscending}
            sortBedroomsDescending={sortBedroomsDescending}
            sortBathroomsAscending={sortBathroomsAscending}
            sortBathroomsDescending={sortBathroomsDescending}
            resetSortingOptions={resetSortingOptions}
            toggleMobileMenu={toggleMobileMenu}
            toggleSortingOptions={toggleSortingOptions}
            setSearchQuery={setSearchQuery}

            cardView={cardView}
            sortByPrice={sortByPrice}
            sortByBedrooms={sortByBedrooms}
            sortByBathrooms={sortByBathrooms}
            mobileMenu={mobileMenu}
            sortingOptions={sortingOptions}
          />

          <div className='content-container'>
            <MainContent 
              searchQuery={searchQuery}
              cardView={cardView}
              properties={properties}
              sortByPrice={sortByPrice}
              sortByBedrooms={sortByBedrooms}
              sortByBathrooms={sortByBathrooms}
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
