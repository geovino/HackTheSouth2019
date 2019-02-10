from setuptools import find_packages, setup

setup(
    name='bluetato',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask==1.0.2',
        'flask-socketio==3.2.1'
    ],
    entry_points={
        'console_scripts': [
            'bluetato_start = bluetato_server.main:main'
        ]
    },
    python_requires='>=3'
)
