'use client';

import React, { useState } from "react";
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea'
import { Upload } from 'lucide-react';
import { FileUpload } from "../../../components/ui/FileUpload";

export default function NotesUploader() {

  const [files, setFiles] = useState([]);
  const handleFileUploads = (files) => {
    setFiles(files);
    console.log(files);
  };
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen text-white">
       <div
      className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUploads} />
    </div>
      <label className=" mt-5 cursor-pointer mb-2 px-6 py-3 bg-gradient-to-r from-green-900 to-green-400 rounded-xl hover:from-green-800 hover:to-green-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-green-500/25 group">
        <Upload size={20} /> Upload photo
        <input type="file" className="hidden" onChange={handleFileUpload} />
      </label>
      <p className="text-gray-400 mt-2">Drop files here (Max file size: 25 MB per file)</p>

      <div className="w-full max-w-lg mt-6 bg-gray-800 p-6 rounded-lg">
        <Input
          placeholder="Report Title"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4"
        />
        <Textarea
          placeholder="Your note must contain at least 20 characters..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" className="bg-gray-700">Delete</Button>
          <Button className="bg-green-800 hover:bg-green-900">Save</Button>
        </div>
      </div>
    </div>
  );
}
