<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ChayXanh-IUH</title>
        <link rel="icon" type="image/png" href="/images/logo.png"/>
        {{-- <link href="{{asset('css/index.css')}}" rel="stylesheet" type="text/css"> --}}
        <script type="text/javascript">
            const APP_URL = '{{env("APP_URL")}}';
        </script>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{asset('js/index.js')}}?v=3.0" ></script>
    </body>
</html>