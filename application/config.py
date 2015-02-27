from application import app

# Set Default Configurations
app.config.update(dict(
    DEBUG=True,
    SECRET_KEY='development key',
))

app.config[    'GOOGLE_CLIENT_ID'] = ""
app.config['GOOGLE_CLIENT_SECRET'] = ""
app.config[     'FACEBOOK_APP_ID'] = ""
app.config[ 'FACEBOOK_APP_SECRET'] = ""
