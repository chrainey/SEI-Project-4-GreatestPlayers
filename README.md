# Football Legends Database API - GA Project 4 - Solo Project

This is my fourth project for the Software Engineering Immersive course with GA. I love my football and I wanted to build an app revolving around, in my opinion, some of the greatest players to have played the beautiful game. It's a full-stack app with a Python Django API that serves data from a Postgres database. The frontend that consumes the API is built with React. I had a week to complete this project.

The app is deployed with Heroku and is available [here](https://footballs-greatest.herokuapp.com)

![Home screenshot](/images/homescreenshot.png)

## Technologies Used:
* Python
* Django
* Django REST Framework
* PyJWT
* Psycopg 2
* React
* Axios
* SCSS
* Nodemon
* React Router DOM

## Code Installation:
* Clone or download the repo
* Install back-end dependencies: pipenv install
* Enter shell for the project: pipenv shell
* Make migrations: (ENTER HOW TO SEED DATA HERE)
* Start backend server:
* Move into frontend directory:
* Install frontend dependencies:
* Start frontend server:

## Brief:
* Build a full-stack application by making your backend and your frontend.
* Use a Python Django API using Django REST Framework to serve your data from a Postgres database.
* Consume your API with a separate frontend built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
* Be deployed online so it's publicly accessible.

## Planning:

To start with, I wanted to create a landing page with a striking football stadium background. There would be a register and login button. Registered users could add reviews to any player on the database and also edit and delete the reviews.
Clicking the main central button brought you to all of the players from the database in a bootstrap styled grid formation. At the top of this page, I would have two drop down menus to categorise players by their position or nationality. I would also have a text search box to search a player by name.
Clicking on a player would bring you to the player page that would show a picture and all of the player information.
The nav bar at the top would have a button to move to the clubs screen. All clubs would be displayed in a grid formation like the players. Clicking on each club will bring you to the club info page displaying the info from the club model.
Below is an Excalidraw diagram showing the layout of the pages and the models needed for the backend.

![Excalidraw wireframe](/images/Screenshot%202022-10-17%20at%2020.58.46.png)

![Wireframe Pic 2](/images/Screenshot%202022-10-17%20at%2021.01.23.png)

I also used LucidChart as a tool to display the relationships needed in this project. Below shows how I would link the relationships between the players, their clubs, reviews, position and nationality:

![Lucidchart diagram](/images/lucidchart.png)

## Process:

Back-End:

This was my first experience of creating a backend using Python. I used Django and Django REST Framework to create a PostgreSQL database with RESTful features. In total I had 4 models: Players, Clubs, Reviews and Users. Even though I was new to this framework, I found it pretty easy to use, provided you stuck to the same steps for each model. I found it straightforward to get my PostgreSQL database.
One thing my tutor had mentioned was to make sure all of your models were set early on in the build as if you make changes to them at a later date, it can cause problems in your code. So I made sure I was happy with all of the data that was in the player and club models especially. I used TablePlus to visualise my PostgreSQL database and Insomnia REST Client to test all of my backend requests. I needed to make sure that all of the relationships between my models were correct and that I was receiving the expected JSON responses.
Player Model:
```
from django.db import models


class Player(models.Model):
  name = models.CharField(max_length=100, default=None)
  position = models.CharField(max_length=50, default=None)
  nationality = models.CharField(max_length=50, default=None)
  info = models.TextField(max_length=500, default=None, blank=True)
  goals = models.PositiveIntegerField(default=None)
  international_caps = models.PositiveIntegerField(default=None)
  shirt_number = models.PositiveIntegerField(default=None)
  image_1 = models.CharField(max_length=300, default=None, blank=True)
  image_2 = models.CharField(max_length=300, default=None, blank=True)
  image_3 = models.CharField(max_length=300, default=None, blank=True)
  clubs = models.ManyToManyField(
    "clubs.Club",
    related_name="players"
  )

  def __str__(self):
    return f"{self.name} - {self.position} - {self.nationality}"
```
The above player model is the main model of the project. I decided to put 3 image fields into the model just in case. In the end, I actually only used 1 picture per player as it was time consuming to find pictures that would work and look good with the same width and height for each player's picture. Moving forward, I will take the time to find better looking pictures and add these to the database.

Front-End:

For the front-end, I used React Hooks throughout. It was here that I could put all of my experience from the course together. I used Axios for the data requests from the backend API and Bootstrap to make the actual website. I would then use JSX, a combination of Vanilla JavaScript, conditional JavaScript and semantic HTML elements, to display the API data on the page.
I used bootstrap very quickly to make basic versions of my main components: Landing, Login, Register, Navbar, Footer, Allclubs, Allplayers, Playersingle and Clubsingle.
Next I needed to figure out how to get the user to login and logout of the frontend. I needed to store the user's JWT token inside local storage so that the frontend would know that the user is authenticated. I could do this by setting the JWT token and returning the decoded token by using a package called Buffer with a secret key that was determined in the backend.
Registering the user:
```
const Register = () => {
  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })
  const [ loginData, setLoginData ] = useState({
    userName: '',
    password: '',
  })
  const [ errors, setErrors ] = useState('')
  
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    if (event.target.name === 'username' || event.target.name === 'password') {
      setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      console.log(data)
      autoLogin()
    } catch (error) {
      console.log(error)
    }
  }
```
Logging in the user:
```
const Login = () => {

  const navigate = useNavigate() 
  const [ errors, setErrors ] = useState(false)
  const [ loginData, setLoginData ] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value  })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', loginData)
      setToken(data.token)
      setId(data.userId)
      navigate('/players/')

    } catch (error) {
      setErrors(error.response.data.messages)
      console.log(error.response.data.messages)
    }
  }
```
In the snippet below we can see the package Buffer (in green) being used to confirm the user and their valid token:
```
export const getPayLoad = () => {
  const token = getToken()
  if (!token) return 
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return 
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}
export const userIsAuthenticated = () => {
  const payload = getPayLoad()
  if (!payload) return 
  const currentTime = Math.round(Date.now() / 1000) 
  return currentTime < payload.exp
}
export const userIsOwner = (item) => {
  const payload = getPayLoad()
  if (!payload) return
  return payload.sub === item.owner.id
}
```
Filtering the players:
At this point, I could now display all of the players that had now been put in my seeding data. Getting the players up on screen was easy enough because I just needed to map through all of the players in the database and use bootstrap cards to produce them on screen. However, I needed to filter the players further so that I could display, for example, all players that were midfielder or all players that were French and defenders.
To do this, I needed to create a Customcard component:
```
const Customcard = ({ name, image_1, nationality, position, id }) => {
  
  return (
    <div className="col-6 col-md-4 mb-4">
      <div className="card text-center">
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/players/${id}/`}>
          <div className="card-header">
            <h3>{name}</h3>
          </div>
          <div className="card-image-container">
            <img className="player-image" src={image_1} alt={name} />
          </div>
          <div className="card-text">
            <h4>{nationality} - {position}</h4>
          </div>
        </Link>
      </div>
    </div>
  )
}
```
I also needed to create a Filters component with two player maps. One for nationality and the second for position:
```
const Filters = ({ filters, setFilters, players, setFilteredPlayers }) => {

  const handleChange = (event) => {
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value,
    }
    setFilters(newObj)
  }
  useEffect(() => {

    const regexSearch = new RegExp(filters.search, 'i')
    const filteredArray = players.filter(player => {
      console.log(regexSearch.test(player.name))
      console.log((player.nationality === filters.nationality || filters.nationality === 'All'))
      console.log((player.position === filters.position || filters.position === 'All'))
      return regexSearch.test(player.name) && ( (player.nationality === filters.nationality || filters.nationality === 'All')
      &&  (player.position === filters.position || filters.position === 'All'))
    })
    console.log(filteredArray)
    setFilteredPlayers(filteredArray)

  }, [filters, players])

  const nations = [ ...new Set(players.map(player => player.nationality))]
  const positions = [ ...new Set(players.map(player => player.position))]
```
These could both be imported and added to Allplayers to now display filtered players:
```
{ playerData[0] ?
        <div className='all-player-page'>
          <Container as="main" className='player-index'>
            <h1 className='text-center mb-4'>Football Legends</h1>
            <div className="filters-container">
              {/* Filters */}
              <Filters filters={filters} setFilters={setFilters} players={players} setFilteredPlayers={setFilteredPlayers} />
              {/* PLayer list */}
            </div>
            <div className="row">
              {
                (filteredPlayers.length > 0 ? filteredPlayers : players).map(player => {
                  return <Customcard key={player.name} {...player} />
                })
              }
            </div>
          </Container>
```
Adding the Images to the API:
To store the images, like my previous project, I decided to use Cloudinary. This service allows users to upload, store, manage, manipulate and deliver images and videos for websites and apps. I made the following function so that I could easily take images from the internet and upload them to cloudinary using a page on my front end called Add Image. This could then be deleted out of my code once the App was deployed.
Using an axios post request on the front end I could quickly add images to cloudinary which gave them a URL link which I could then add to each player using my backend Django Admin interface built into Django:
Below is a code snippet of the function:
```
const Images = () => {

  const [imageSelected, setImageSelected] = useState('')

  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 's7vr8dqz')

    axios.post(
      'https://api.cloudinary.com/v1_1/chrainey22/image/upload',
      formData
    ).then((response) => {
      console.log(response)
    })
    
  }
```

## Challenges:
Image Sizes:

Quite a bit of time was taken trying to find images that would fit nicely in the bootstrap cards especially on the ‘All players’ page. With time constraints I realised that it was better to get the functionality working and I can go back to revisit the images and update them to ones that fit better.

Player Filters:

I couldn't get the filters to work properly. For example, once you selected players from France and went back to all nationalities, it would still only show French players. Eventually I realised I just needed to use a combination of && and || within the regexSearch to set the filtered players properly.

## Wins:

I was quite surprised how quickly I managed to get the backend up and running, especially as we hadn’t done much learning of Python or had used MongoDB before. I understand from research that many people don’t like MongoDB as it is a bit too rigid and inflexible. However for a Junior I felt it was worthwhile using as it made you take tasks step by step which I found easier to learn.

## Key Learnings:

Going solo on such a big project did have its positives and negatives. On the plus side I didn’t have to compromise on any ideas like I did with previous projects. I also feel it gave me the confidence going into the industry that I could create a proper ‘full-stack’ app on my own. On the downside I missed out on the perks of collaborative work and getting help from colleagues to overcome hurdles. Because of this there were many features that I wanted to add at the start that I just didn’t have the time to put in place. This however does give me the opportunity to spend more time working on this to get it to the place I would like it to be in my portfolio.
A big learning experience for me was managing my own workload. I was over-confident on how much time goes into creating a full-stack app from scratch. I realised early on that I would need to scale my ambitions down to get the project completed in time and have an MVP.

## Bugs or Errors:

* Currently users can add and delete reviews but no edit them.
* The images of the players don’t translate well to very big monitor screens and seem stretched. This can be fixed with time spent getting better images with the exact same resolution.

## Future Improvements:

* Making sure all images look good at any screen size and adding extra images for each player along with an image carousel that I learnt in Project 3.
* Fixing the user edit review function.
* Adding further images and info on each football club.
* Getting a club filter for all of the players so you can see which players have played for a certain club below the club info.


