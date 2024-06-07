export class Memory {
    id: string;
    title: string;
    date: Date;
    description: string;
    location: string;
    photo?: string;
    latitude?: string;
    longitude?: string;
    
    constructor(id: string, title: string, date: Date, description: string, location: string, photo?: string, latitude?: string, longitude?: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.location = location;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude
        
    }
}
