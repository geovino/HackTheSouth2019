from bluetato_server.app import app_instance


def main():
    app_instance.run(host='0.0.0.0', port=5000)


if __name__ == "__main__":
    main()
