import React, { PureComponent } from "react";
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';
import classnames from 'classnames';
import PubSub, { Events } from 'Utilities/pub-sub';
import AuthorSearch from "Views/AuthorSearch";
import CategoryChipListContainer from 'Views/CategoryChipListContainer';

const styles = theme => ({
  // Root container
  root: {
    backgroundColor: '#0A0A0A',
    color: '#FFFFFF',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
    overflowX: 'hidden',
    position: 'relative',
    
    // Grain overlay
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      opacity: 0.03,
      pointerEvents: 'none',
      zIndex: 1000,
    },
  },

  // Hero Section
  hero: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212, 160, 18, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 20% 80%, rgba(212, 160, 18, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse 50% 60% at 80% 20%, rgba(212, 160, 18, 0.08) 0%, transparent 50%)
    `,
  },

  heroContent: {
    position: 'relative',
    zIndex: 1,
    padding: '0 4rem',
    maxWidth: 1400,
    margin: '0 auto',
    width: '100%',
    
    [theme.breakpoints.down('sm')]: {
      padding: '0 1.5rem',
    },
  },

  headline: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(3rem, 12vw, 10rem)',
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: '-0.03em',
    marginBottom: '3rem',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },

  headlineLine: {
    display: 'block',
    overflow: 'hidden',
  },

  headlineText: {
    display: 'block',
    animation: '$slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    opacity: 0,
    transform: 'translateY(100%)',
  },

  headlineLine1: {
    '& $headlineText': {
      animationDelay: '0.1s',
    },
  },

  headlineLine2: {
    '& $headlineText': {
      animationDelay: '0.2s',
    },
  },

  headlineLine3: {
    '& $headlineText': {
      animationDelay: '0.3s',
    },
  },

  headlineEmphasis: {
    fontStyle: 'italic',
    color: '#D4A012',
  },

  heroBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '4rem',
    
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '3rem',
    },
  },

  heroDescription: {
    maxWidth: 400,
    fontSize: '1.1rem',
    lineHeight: 1.7,
    opacity: 0.7,
    animation: '$fadeIn 1s ease 0.6s forwards',
    opacity: 0,
  },

  heroCta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '1.5rem',
    animation: '$fadeIn 1s ease 0.8s forwards',
    opacity: 0,
    
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-start',
    },
  },

  btnDramatic: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 2.5rem',
    backgroundColor: '#D4A012',
    color: '#0A0A0A',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    
    '&:hover': {
      backgroundColor: '#FFCC00',
      transform: 'translateY(-2px)',
    },
    
    '& svg': {
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    
    '&:hover svg': {
      transform: 'translateX(6px)',
    },
  },

  scrollIndicator: {
    position: 'absolute',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    animation: '$fadeIn 1s ease 1.2s forwards, $float 2s ease-in-out infinite 1.5s',
    opacity: 0,
  },

  scrollText: {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    opacity: 0.5,
  },

  scrollLine: {
    width: 1,
    height: 60,
    background: 'linear-gradient(to bottom, #FFFFFF, transparent)',
  },

  // Marquee Section
  marqueeSection: {
    padding: '2rem 0',
    backgroundColor: '#D4A012',
    overflow: 'hidden',
  },

  marquee: {
    display: 'flex',
    animation: '$marquee 30s linear infinite',
  },

  marqueeContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
    padding: '0 2rem',
    whiteSpace: 'nowrap',
  },

  marqueeText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0A0A0A',
    letterSpacing: '-0.01em',
  },

  marqueeDot: {
    width: 8,
    height: 8,
    backgroundColor: '#0A0A0A',
    borderRadius: '50%',
  },

  // Search Section (shown after clicking CTA or scrolling)
  searchSection: {
    padding: '6rem 4rem',
    backgroundColor: '#0A0A0A',
    position: 'relative',
    
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 1.5rem',
    },
  },

  searchSectionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(212, 160, 18, 0.1) 0%, transparent 60%)',
  },

  searchContainer: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
  },

  searchTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 700,
    marginBottom: '2rem',
    
    '& em': {
      fontStyle: 'italic',
      color: '#D4A012',
    },
  },

  searchBox: {
    position: 'relative',
    marginBottom: '2rem',
  },

  searchInput: {
    width: '100%',
    padding: '1.5rem 2rem',
    paddingRight: '5rem',
    fontSize: '1.1rem',
    fontFamily: "'Inter', sans-serif",
    border: '2px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#FFFFFF',
    transition: 'all 0.3s',
    outline: 'none',
    
    '&::placeholder': {
      color: 'rgba(255,255,255,0.4)',
    },
    
    '&:focus': {
      borderColor: '#D4A012',
      backgroundColor: 'rgba(255,255,255,0.08)',
    },
  },

  searchButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 50,
    height: 50,
    backgroundColor: '#D4A012',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
    
    '&:hover': {
      backgroundColor: '#FFCC00',
    },
    
    '& svg': {
      color: '#0A0A0A',
    },
  },

  // Categories
  categoriesWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
  },

  // Results Section
  resultsSection: {
    padding: '4rem',
    backgroundColor: '#0A0A0A',
    minHeight: 200,
    
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 1.5rem',
    },
  },

  // How It Works Section
  howSection: {
    padding: '8rem 4rem',
    backgroundColor: '#F8F4E8',
    color: '#0A0A0A',
    
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 1.5rem',
    },
  },

  howHeader: {
    textAlign: 'center',
    marginBottom: '5rem',
  },

  howTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900,
    letterSpacing: '-0.03em',
  },

  howSteps: {
    display: 'flex',
    justifyContent: 'center',
    gap: '4rem',
    maxWidth: 1000,
    margin: '0 auto',
    
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
    },
  },

  howStep: {
    flex: 1,
    maxWidth: 280,
    textAlign: 'center',
  },

  stepIconWrapper: {
    width: 100,
    height: 100,
    margin: '0 auto 1.5rem',
    position: 'relative',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      border: '2px solid #0A0A0A',
      borderRadius: '50%',
      animation: '$pulse 3s ease-in-out infinite',
    },
  },

  stepNumber: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.5rem',
    fontWeight: 900,
  },

  stepTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
  },

  stepDescription: {
    opacity: 0.7,
    lineHeight: 1.7,
    fontSize: '0.95rem',
  },

  // Stats Section
  statsSection: {
    padding: '6rem 4rem',
    backgroundColor: '#0A0A0A',
    position: 'relative',
    overflow: 'hidden',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-20%',
      width: '140%',
      height: '200%',
      background: 'radial-gradient(ellipse at center, rgba(212, 160, 18, 0.08) 0%, transparent 70%)',
    },
    
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 1.5rem',
    },
  },

  statsGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6rem',
    position: 'relative',
    
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '3rem',
      alignItems: 'center',
    },
  },

  statItem: {
    textAlign: 'center',
  },

  statNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 900,
    lineHeight: 1,
    background: 'linear-gradient(135deg, #FFCC00 0%, #D4A012 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  statLabel: {
    fontSize: '0.9rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    opacity: 0.5,
    marginTop: '0.5rem',
  },

  // CTA Section
  ctaSection: {
    padding: '8rem 4rem',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#0A0A0A',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(212, 160, 18, 0.2) 0%, transparent 60%)',
    },
    
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 1.5rem',
    },
  },

  ctaContent: {
    position: 'relative',
    zIndex: 1,
  },

  ctaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    
    '& em': {
      fontStyle: 'italic',
      color: '#D4A012',
    },
  },

  ctaDescription: {
    fontSize: '1.15rem',
    opacity: 0.6,
    maxWidth: 450,
    margin: '0 auto 2.5rem',
  },

  // Hidden when searching
  hiddenWhenSearching: {
    display: 'block',
  },

  hidden: {
    display: 'none',
  },

  // Animations
  '@keyframes slideUp': {
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  '@keyframes fadeIn': {
    to: {
      opacity: 1,
    },
  },

  '@keyframes float': {
    '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
    '50%': { transform: 'translateX(-50%) translateY(-10px)' },
  },

  '@keyframes marquee': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },

  '@keyframes pulse': {
    '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
    '50%': { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 0.5 },
  },
});

class HomeView extends PureComponent {
  constructor(props) {
    super();
    this._handleChange = debounce((search) => {
      props.onFilter();
      this.setState({ search, hasFilter: true });
    }, 300);

    this.state = {
      search: "",
      categories: {},
      hasFilter: false,
    };

    this.search = React.createRef();
    props.clearHasFilter();
    PubSub.subscribe(Events.CLEAR_FILTERS, this.clearFilters);
  }

  clearFilters = () => {
    if (this.search.current) {
      this.search.current.value = '';
    }
    this.setState({ search: "", categories: {}, hasFilter: false });
  };

  toggleCategory = (cid) => {
    let categories = Object.assign({}, this.state.categories);

    if (categories[cid]) {
      categories = {};
    } else {
      categories = {};
      categories[cid] = true;
    }
    this.props.onFilter();
    this.setState({ categories, hasFilter: true });
  };

  scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (this.search.current) {
          this.search.current.focus();
        }
      }, 500);
    }
  };

  render() {
    const { search, categories, hasFilter } = this.state;
    const { classes } = this.props;

    const publications = [
      'The New York Times', 'The Atlantic', 'The Washington Post', 'Wired',
      'The New Yorker', 'ESPN', 'The Guardian', 'Vox'
    ];

    return (
      <div className={classes.root}>
        {/* Hero Section */}
        <section className={classes.hero}>
          <div className={classes.heroBg}></div>
          <div className={classes.heroContent}>
            <h1 className={classes.headline}>
              <span className={classnames(classes.headlineLine, classes.headlineLine1)}>
                <span className={classes.headlineText}>Follow the</span>
              </span>
              <span className={classnames(classes.headlineLine, classes.headlineLine2)}>
                <span className={classes.headlineText}>
                  <em className={classes.headlineEmphasis}>writers</em> you
                </span>
              </span>
              <span className={classnames(classes.headlineLine, classes.headlineLine3)}>
                <span className={classes.headlineText}>love.</span>
              </span>
            </h1>
            <div className={classes.heroBottom}>
              <p className={classes.heroDescription}>
                Track your favorite journalists across every publication. One daily email with all their latest stories. Never miss a byline again.
              </p>
              <div className={classes.heroCta}>
                <button onClick={this.scrollToSearch} className={classes.btnDramatic}>
                  <span>Start Reading</span>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={classes.scrollIndicator}>
            <span className={classes.scrollText}>Scroll</span>
            <div className={classes.scrollLine}></div>
          </div>
        </section>

        {/* Marquee */}
        <section className={classes.marqueeSection}>
          <div className={classes.marquee}>
            <div className={classes.marqueeContent}>
              {publications.map((pub, i) => (
                <React.Fragment key={i}>
                  <span className={classes.marqueeText}>{pub}</span>
                  <div className={classes.marqueeDot}></div>
                </React.Fragment>
              ))}
            </div>
            <div className={classes.marqueeContent}>
              {publications.map((pub, i) => (
                <React.Fragment key={`dup-${i}`}>
                  <span className={classes.marqueeText}>{pub}</span>
                  <div className={classes.marqueeDot}></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="search-section" className={classes.searchSection}>
          <div className={classes.searchSectionBg}></div>
          <div className={classes.searchContainer}>
            <h2 className={classes.searchTitle}>
              Find your <em>favorite</em> writers
            </h2>
            <div className={classes.searchBox}>
              <input
                type="text"
                ref={this.search}
                className={classes.searchInput}
                placeholder="Search by name or publication..."
                onChange={(e) => this._handleChange(e.target.value)}
              />
              <button className={classes.searchButton}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>
            <CategoryChipListContainer
              onSelect={this.toggleCategory}
              selected={categories}
            />
          </div>
        </section>

        {/* Search Results */}
        {(search || Object.keys(categories).length > 0) && (
          <section className={classes.resultsSection}>
            <AuthorSearch search={search} categories={categories} />
          </section>
        )}

        {/* How It Works - Hidden when searching */}
        <section className={classnames(classes.howSection, { [classes.hidden]: hasFilter })}>
          <div className={classes.howHeader}>
            <h2 className={classes.howTitle}>How it works</h2>
          </div>
          <div className={classes.howSteps}>
            <div className={classes.howStep}>
              <div className={classes.stepIconWrapper}>
                <span className={classes.stepNumber}>1</span>
              </div>
              <h3 className={classes.stepTitle}>Search</h3>
              <p className={classes.stepDescription}>
                Find your favorite writers by name, publication, or browse by topic.
              </p>
            </div>
            <div className={classes.howStep}>
              <div className={classes.stepIconWrapper}>
                <span className={classes.stepNumber}>2</span>
              </div>
              <h3 className={classes.stepTitle}>Follow</h3>
              <p className={classes.stepDescription}>
                Add writers to your feed with one click. We'll track their bylines automatically.
              </p>
            </div>
            <div className={classes.howStep}>
              <div className={classes.stepIconWrapper}>
                <span className={classes.stepNumber}>3</span>
              </div>
              <h3 className={classes.stepTitle}>Read</h3>
              <p className={classes.stepDescription}>
                Get a beautiful daily digest every evening with all the new articles.
              </p>
            </div>
          </div>
        </section>

        {/* Stats - Hidden when searching */}
        <section className={classnames(classes.statsSection, { [classes.hidden]: hasFilter })}>
          <div className={classes.statsGrid}>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>5K+</span>
              <span className={classes.statLabel}>Writers</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>50K+</span>
              <span className={classes.statLabel}>Articles Daily</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statNumber}>10K+</span>
              <span className={classes.statLabel}>Readers</span>
            </div>
          </div>
        </section>

        {/* Final CTA - Hidden when searching */}
        <section className={classnames(classes.ctaSection, { [classes.hidden]: hasFilter })}>
          <div className={classes.ctaContent}>
            <h2 className={classes.ctaTitle}>
              Never miss<br />a <em>byline</em>
            </h2>
            <p className={classes.ctaDescription}>
              Join thousands of readers who follow the writers, not just the publications.
            </p>
            <button onClick={this.scrollToSearch} className={classes.btnDramatic}>
              <span>Get Started</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default withStyles(styles)(HomeView);
