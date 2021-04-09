
import http.client, urllib.parse
import json

conn = http.client.HTTPConnection('api.mediastack.com')

params = urllib.parse.urlencode({
    'access_key': 'f8962e7fe5ef3f37341a5500454afeec',
    'keywords': 'finance'
    'categories': 'business',
    'sort': 'published_desc',
    'limit': 5,
    })

conn.request('GET', '/v1/news?{}'.format(params))

res = conn.getresponse()
data = json.loads(res.read().decode('utf-8'))


print((data))

