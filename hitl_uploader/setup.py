from setuptools import setup, find_packages

setup(
    name="hitl",
    version="1.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=["requests"],
    license="MIT",
    author="Luke Connolly",
    author_email="luke.connolly2@ucdconnect.ie",
    description="An uploader tool for the HITL platform.",
)
