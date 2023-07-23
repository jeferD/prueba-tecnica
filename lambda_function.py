
import requests
import json
import pymysql

def lambda_handler(event, context):
    # Configura las credenciales y la información de la base de datos
    db_host = 'prueba-tecnica.coqmo36gmpvw.us-east-2.rds.amazonaws.com'
    db_user = 'admin'
    db_password = '12345678'
    db_name = 'cripto-monedas'
    
    # Llave de la API de CoinMarketCap
    api_key = '343f7b1e-b778-4fc5-8b73-de43f4591dec'
    
    # URL de la API de CoinMarketCap para obtener el precio de BTC y ETH
    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
    parameters = {
        'symbol': 'BTC,ETH',
        'convert': 'USD'
    }
    headers = {
        'X-CMC_PRO_API_KEY': '343f7b1e-b778-4fc5-8b73-de43f4591dec'
    }
    
    response = requests.get(url, params=parameters, headers=headers)
    data = response.json()
    
    # Extrae los precios de BTC y ETH del JSON recibido
    btc_price = data['data']['BTC']['quote']['USD']['price']
    eth_price = data['data']['ETH']['quote']['USD']['price']
    
    # Conexión a la base de datos
    connection = pymysql.connect(host=db_host, user=db_user, password=db_password, db=db_name)
    
    try:
        with connection.cursor() as cursor:
            # Inserta los precios en la tabla
            sql = 'INSERT INTO criptomoneda (nombre_criptomoneda, precio) VALUES (%s, %s)'
            cursor.execute(sql, ('Bitcoin', btc_price))
            cursor.execute(sql, ('Ethereum', eth_price))
        
        # Guarda los cambios en la base de datos
        connection.commit()
    
    except Exception as e:
        # Si ocurre un error, deshace los cambios
        connection.rollback()
        raise e
    
    finally:
        # Cierra la conexión
        connection.close()
    
    # Devuelve los datos en formato JSON
    return {
        'statusCode': 200,
        'body': json.dumps({
            'Bitcoin': btc_price,
            'Ethereum': eth_price
        })
    }
