import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "https://api.upload.io";
  accountId = "FW25az7";

  constructor(private http: HttpClient) { }

  async formDataUpload(params: any) {
    const baseUrl = "https://api.upload.io";
    const path = `/v2/accounts/${params.accountId}/uploads/form_data`;
    const entries = (obj: any) => Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
    const query = entries(params.querystring ?? {})
      .flatMap(([k, v]) => Array.isArray(v) ? v.map(v2 => [k, v2]) : [[k, v]])
      .map(kv => kv.join("=")).join("&");
    const formData = new FormData();
    formData.append("file", params.requestBody, params.originalFileName)
    const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
      method: "POST",
      body: formData,
      headers: Object.fromEntries(entries({
        "Authorization": `Bearer ${params.apiKey}`,
        "X-Upload-Metadata": JSON.stringify(params.metadata)
      })) as any
    });
    const result = await response.json();
    if (Math.floor(response.status / 100) !== 2)
      throw new Error(`Upload API Error: ${JSON.stringify(result)}`);
    return result;
  }

  getImage(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl);
  }
}
