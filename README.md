# Pick One

A very simple hipchat bot that picks a word at random out of a list.

For Development:
To get up and running on your local machine you'll need to install Node, NPM, and the Heroku toolbelt. When all that is in order, from the command line in the same folder as source type "heroku local web" wait a second and it will launch the application localy. To test use postman or another tool to post to http://localhost:5000/test	with a valid json message like this:

{
    "item": {
        "message": {
            "message": "/slashcommand one, two, or three."
        }
    }
}

If all this sounds too foreboding but you'd still like to try out an idea, make blind changes and we can test them on my machine before deploying. 