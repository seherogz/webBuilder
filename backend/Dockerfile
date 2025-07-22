# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Install EF Core tools
RUN dotnet tool install --global dotnet-ef --version 7.0.14

# Copy project file and restore dependencies
COPY ["WebBuilder.csproj", "./"]
RUN dotnet restore "WebBuilder.csproj"

# Copy the rest of the code
COPY . .

# Build the application
RUN dotnet build "WebBuilder.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "WebBuilder.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Add EF Core tools to PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Expose port and set entry point
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "WebBuilder.dll"] 