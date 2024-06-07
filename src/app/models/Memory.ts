export class Memory {
    title: string;
    date: Date;
    description: string;
    location: string;
    photo?: string;
    latitude?: string;
    longitude?: string;
    id?: string;
    
    constructor(title: string, date: Date, description: string, location: string, photo?: string, latitude?: string, longitude?: string, id?: string, ) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.location = location;
        this.photo = photo;
        this.latitude = latitude;
        this.longitude = longitude
        this.id = id;
        
    }
}
